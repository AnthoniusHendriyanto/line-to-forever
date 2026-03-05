import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WEDDING_DATE = new Date("2025-12-28T10:00:00");

const CountdownSection = () => {
  const { ref, isVisible } = useScrollAnimation();
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
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-secondary/30">
      <div ref={ref} className={`text-center scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body">
          Counting Down
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8">Until Forever Begins</h2>

        <div className="flex gap-3 justify-center">
          {units.map((u) => (
            <div key={u.label} className="bg-card rounded-xl p-4 w-[72px] border border-border">
              <div className="text-2xl font-serif text-primary">
                {u.value.toString().padStart(2, "0")}
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
