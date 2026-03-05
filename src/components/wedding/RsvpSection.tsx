import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check } from "lucide-react";

const RsvpSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({ name: "", attending: true, guests: 1, message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-secondary/30">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          We Hope You Can Make It
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">RSVP</h2>

        {submitted ? (
          <div className="bg-card rounded-2xl p-8 border border-border text-center">
            <div className="w-12 h-12 rounded-full bg-line-green/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-line-green" />
            </div>
            <h3 className="font-serif text-lg text-foreground mb-2">Thank You!</h3>
            <p className="text-muted-foreground text-sm font-sans-body">
              We can't wait to celebrate with you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border border-border space-y-5">
            <div>
              <label className="text-sm font-sans-body text-muted-foreground block mb-1.5">Your Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Enter your name"
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
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {val ? "Joyfully Accept" : "Regretfully Decline"}
                  </button>
                ))}
              </div>
            </div>

            {form.attending && (
              <div>
                <label className="text-sm font-sans-body text-muted-foreground block mb-1.5">
                  Number of Guests
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n}</option>
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
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                placeholder="Write your wishes..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-sm font-sans-body font-semibold hover:opacity-90 transition-opacity"
            >
              Send RSVP
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RsvpSection;
