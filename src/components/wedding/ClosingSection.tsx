import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart } from "lucide-react";
import BlurText from "@/components/ReactBits/BlurText";
import ShinyText from "@/components/ReactBits/ShinyText";

const ClosingSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-background">
      <div ref={ref} className={`text-center max-w-sm scroll-fade-in ${isVisible ? "visible" : ""} relative z-10`}>
        <Heart className="w-8 h-8 text-primary mx-auto mb-8" style={{ animation: "pulse-soft 2s ease-in-out infinite" }} />

        <p className="text-muted-foreground text-sm font-sans-body italic mb-6 leading-relaxed">
          <ShinyText text="From a LINE group chat…" speed={3} />
        </p>
        
        <div className="flex flex-col items-center justify-center mb-6">
          <BlurText 
            text="To the Beginning"
            delay={100} 
            animateBy="words" 
            direction="bottom" 
            className="text-3xl font-serif text-foreground leading-snug justify-center"
          />
          <BlurText 
            text="of Forever"
            delay={200} 
            animateBy="words" 
            direction="bottom" 
            className="text-3xl font-serif text-foreground leading-snug justify-center"
          />
        </div>

        <div className="w-16 h-px bg-primary mx-auto mb-6" />

        <p className="text-muted-foreground text-sm font-sans-body leading-relaxed mb-2">
          With love and gratitude,
        </p>
        <div className="flex flex-col items-center justify-center">
          <BlurText 
            text="Anthon & Melisa"
            delay={50} 
            animateBy="letters" 
            direction="top" 
            className="font-serif text-xl text-foreground justify-center"
          />
        </div>

        <p className="text-muted-foreground/60 text-xs font-sans-body mt-12">
          Made with ❤️ for our special day
        </p>
      </div>
    </section>
  );
};

export default ClosingSection;
