import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const OnlineToRealSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-16">
      <div ref={ref} className={`w-full max-w-sm text-center scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body">
          The Moment Everything Changed
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8">Finally Meeting in Real Life</h2>

        {/* Photo placeholder with transition effect */}
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted mb-8">
          <img
            src="/placeholder.svg"
            alt="First meeting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
          <p className="absolute bottom-6 left-0 right-0 text-white text-sm font-sans-body px-4">
            From pixels to presence ✨
          </p>
        </div>

        <p className="text-muted-foreground text-sm font-sans-body italic leading-relaxed">
          "After months of late-night messages,
          <br />
          we finally met face to face."
        </p>
      </div>
    </section>
  );
};

export default OnlineToRealSection;
