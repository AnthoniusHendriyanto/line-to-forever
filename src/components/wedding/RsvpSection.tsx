import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check, Download, Mail } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const RsvpSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({ name: "", email: "", attending: true, guests: 1, message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCodeId, setQrCodeId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Generate a unique QR ID if attending
    const uniqueId = crypto.randomUUID();
    
    try {
      const { error } = await supabase.from("guests").insert([
        {
          name: form.name,
          email: form.email,
          guests_count: form.attending ? form.guests : 0,
          message: form.message,
          qr_code_id: uniqueId,
          is_checked_in: false,
        },
      ]);

      if (error) throw error;

      setQrCodeId(uniqueId);
      setSubmitted(true);
      toast.success("RSVP Sent Successfully!");
    } catch (error: any) {
      console.error("Error submitting RSVP:", error);
      toast.error(error.message || "Failed to submit RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `QR-Wedding-${form.name}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-secondary/30">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          We Hope You Can Make It
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">{submitted ? "Your QR Ticket" : "RSVP"}</h2>

        {submitted ? (
          <div className="bg-card rounded-2xl p-8 border border-border text-center shadow-xl animate-in fade-in zoom-in duration-500">
            <div className="w-12 h-12 rounded-full bg-line-green/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-line-green" />
            </div>
            <h3 className="font-serif text-xl text-foreground mb-2">Thank You, {form.name}!</h3>
            <p className="text-muted-foreground text-sm font-sans-body mb-8">
              We've registered your RSVP. Please save this QR code for check-in at the venue.
            </p>
            
            <div className="bg-white p-6 rounded-2xl inline-block mb-8 shadow-sm border border-border/50">
              <QRCodeSVG 
                id="qr-code-svg"
                value={qrCodeId} 
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={downloadQR}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl text-sm font-sans-body font-semibold hover:opacity-90 transition-opacity shadow-md"
              >
                <Download className="w-4 h-4" />
                Download Ticket
              </button>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-4">
                ID: {qrCodeId.slice(0, 8)}...
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border border-border space-y-5 shadow-lg">
            <div>
              <label className="text-sm font-sans-body text-muted-foreground block mb-1.5">Your Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-sm font-sans-body text-muted-foreground block mb-1.5 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="text-sm font-sans-body text-muted-foreground block mb-2">Will you attend?</label>
              <div className="flex gap-3">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => setForm({ ...form, attending: val })}
                    className={`flex-1 py-3 rounded-xl text-sm font-sans-body font-medium transition-all ${
                      form.attending === val
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {val ? "Joyfully Accept" : "Regretfully Decline"}
                  </button>
                ))}
              </div>
            </div>

            {form.attending && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <label className="text-sm font-sans-body text-muted-foreground block mb-1.5">
                  Number of Guests
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="text-sm font-sans-body text-muted-foreground block mb-1.5">
                Message for the Couple
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition-all"
                placeholder="Write your wishes..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-sm font-sans-body font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? "Sending RSVP..." : "Send RSVP"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RsvpSection;

