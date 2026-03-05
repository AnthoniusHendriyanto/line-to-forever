import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart } from "lucide-react";

const ClosingSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div ref={ref} className={`text-center max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <Heart className="w-8 h-8 text-primary mx-auto mb-8" style={{ animation: "pulse-soft 2s ease-in-out infinite" }} />

        <p className="text-muted-foreground text-sm font-sans-body italic mb-6 leading-relaxed">
          From a LINE group chat…
        </p>
        <h2 className="text-3xl font-serif text-foreground mb-6 leading-snug">
          To the Beginning
          <br />
          of Forever
        </h2>

        <div className="w-16 h-px bg-primary mx-auto mb-6" />

        <p className="text-muted-foreground text-sm font-sans-body leading-relaxed mb-2">
          With love and gratitude,
        </p>
        <p className="font-serif text-xl text-foreground">
          Amanda & Jonathan
        </p>

        <p className="text-muted-foreground/60 text-xs font-sans-body mt-12">
          Made with ❤️ for our special day
        </p>
      </div>
    </section>
  );
};

export default ClosingSection;
