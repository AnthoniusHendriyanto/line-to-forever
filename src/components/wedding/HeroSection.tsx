import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Particles from "@/components/ReactBits/Particles";
import BlurText from "@/components/ReactBits/BlurText";
import ShinyText from "@/components/ReactBits/ShinyText";

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div ref={ref} className={`relative z-10 scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-8 font-sans-body">
          <ShinyText text="When the world slowed down in 2020…" />
        </p>
        <p className="text-muted-foreground text-sm mb-12 font-sans-body italic">
          a simple message changed everything.
        </p>

        <div className="w-16 h-px bg-primary mx-auto mb-12" />

        <p className="text-muted-foreground text-xs tracking-[0.4em] uppercase mb-4 font-sans-body">
          The Wedding of
        </p>
        <div className="flex flex-col items-center justify-center mb-8">
          <BlurText 
            text="Anthon" 
            delay={100} 
            animateBy="letters" 
            direction="bottom" 
            className="text-4xl sm:text-5xl font-serif text-foreground leading-tight justify-center" 
          />
          <p className="text-primary text-2xl font-serif italic my-2">&</p>
          <BlurText 
            text="Melisa" 
            delay={100} 
            animateBy="letters" 
            direction="bottom" 
            className="text-4xl sm:text-5xl font-serif text-foreground leading-tight justify-center" 
          />
        </div>
        <p className="text-muted-foreground font-sans-body tracking-[0.2em] text-sm">
          December 28, 2025
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
