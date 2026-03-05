import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative">
      <div ref={ref} className={`scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-8 font-sans-body">
          When the world slowed down in 2020…
        </p>
        <p className="text-muted-foreground text-sm mb-12 font-sans-body italic">
          a simple message changed everything.
        </p>

        <div className="w-16 h-px bg-primary mx-auto mb-12" />

        <p className="text-muted-foreground text-xs tracking-[0.4em] uppercase mb-4 font-sans-body">
          The Wedding of
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif text-foreground mb-2 leading-tight">
          Amanda
        </h1>
        <p className="text-primary text-2xl font-serif italic mb-2">&</p>
        <h1 className="text-4xl sm:text-5xl font-serif text-foreground mb-8 leading-tight">
          Jonathan
        </h1>
        <p className="text-muted-foreground font-sans-body tracking-[0.2em] text-sm">
          December 28, 2025
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
