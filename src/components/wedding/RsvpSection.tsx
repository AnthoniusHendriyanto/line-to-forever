import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check, Mail } from "lucide-react";
import { useInvitationLanguage } from "./InvitationLanguage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isValidEmail } from "@/lib/validation";

const RsvpSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useInvitationLanguage();
  const [errorMessage, setErrorMessage] = useState<"rsvpInvalid" | null>(null);
  const [form, setForm] = useState({ name: "", email: "", attending: true, guests: 1, message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!form.name.trim() || !isValidEmail(form.email) || !Number.isInteger(form.guests) || form.guests < 1 || form.guests > 5) {
      setErrorMessage("rsvpInvalid");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-secondary/30">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          {t.rsvpEyebrow}
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">{submitted ? t.replyTitle : t.rsvp}</h2>

        {submitted ? (
          <div role="status" className="bg-card rounded-2xl p-8 border border-border text-center shadow-xl animate-in fade-in zoom-in duration-500">
            <div className="w-12 h-12 rounded-full bg-line-green/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-line-green" />
            </div>
            <h3 className="font-serif text-xl text-foreground mb-2">{t.thanks.replace("{name}", form.name.trim())}</h3>
            <p className="text-muted-foreground text-sm font-sans-body">
              {t.rsvpSoon}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border border-border shadow-lg">
            <div className="space-y-5 min-w-0">
            <div>
              <label htmlFor="rsvp-name" className="text-sm font-sans-body text-muted-foreground block mb-1.5">{t.name}</label>
              <input
                type="text"
                id="rsvp-name"
                autoComplete="name"
                maxLength={120}
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder={t.nameHint}
              />
            </div>

            <div>
              <label htmlFor="rsvp-email" className="text-sm font-sans-body text-muted-foreground block mb-1.5 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                {t.email}
              </label>
              <input
                type="email"
                id="rsvp-email"
                autoComplete="email"
                maxLength={254}
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <p id="attendance-label" className="text-sm font-sans-body text-muted-foreground block mb-2">{t.attendance}</p>
              <div className="flex gap-3" role="group" aria-labelledby="attendance-label">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    aria-pressed={form.attending === val}
                    onClick={() => setForm({ ...form, attending: val })}
                    className={`flex-1 py-3 rounded-xl text-sm font-sans-body font-medium transition-all ${
                      form.attending === val
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {val ? t.accept : t.decline}
                  </button>
                ))}
              </div>
            </div>

            {form.attending && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <p id="rsvp-guests-label" className="text-sm font-sans-body text-muted-foreground block mb-1.5">
                  {t.guests}
                </p>
                <Select
                  value={String(form.guests)}
                  onValueChange={(guests) => setForm({ ...form, guests: Number(guests) })}
                >
                  <SelectTrigger
                    id="rsvp-guests"
                    aria-labelledby="rsvp-guests-label"
                    className="h-auto w-full rounded-xl border-border px-4 py-3 font-sans-body text-sm text-foreground focus:ring-primary/30 focus:ring-offset-0"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n} {n === 1 ? t.person : t.people}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label htmlFor="rsvp-message" className="text-sm font-sans-body text-muted-foreground block mb-1.5">
                {t.message}
              </label>
              <textarea
                id="rsvp-message"
                maxLength={2000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition-all"
                placeholder={t.messageHint}
              />
            </div>

            {errorMessage && <p role="alert" className="text-sm text-destructive">{t[errorMessage]}</p>}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-sm font-sans-body font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              {t.send}
            </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default RsvpSection;
