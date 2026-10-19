import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useInvitationLanguage } from "./InvitationLanguage";
import { WEDDING_DATE } from "./weddingConfig";

const CountdownSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t, locale } = useInvitationLanguage();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = WEDDING_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    if (WEDDING_DATE.getTime() <= Date.now()) return;
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: t.days, value: timeLeft.days },
    { label: t.hours, value: timeLeft.hours },
    { label: t.minutes, value: timeLeft.minutes },
    { label: t.seconds, value: timeLeft.seconds },
  ];

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-secondary/30">
      <div ref={ref} className={`text-center scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body">
          {t.countdownEyebrow}
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8">{WEDDING_DATE.getTime() <= Date.now() ? t.countdownArrived : t.countdownTitle}</h2>

        <div className="grid grid-cols-4 gap-2 justify-center">
          {units.map((u) => (
            <div key={u.label} className="bg-card rounded-xl px-2 py-4 min-w-0 border border-border">
              <div className="text-2xl font-serif text-primary">
                {new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false }).format(u.value)}
              </div>
              <div className="text-[10px] text-muted-foreground mt-1 font-sans-body uppercase tracking-wider">
                {u.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
