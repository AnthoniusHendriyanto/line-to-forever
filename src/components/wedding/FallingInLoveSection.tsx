import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const photos = [
  { caption: "Our first date" },
  { caption: "Adventures together" },
  { caption: "Building memories" },
  { caption: "Growing closer" },
];

const FallingInLoveSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-secondary/30">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          Our Journey
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">Falling in Love</h2>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-48 aspect-[3/4] rounded-xl overflow-hidden relative bg-muted"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <img src="/placeholder.svg" alt={photo.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-sans-body">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground text-sm text-center mt-8 font-sans-body italic leading-relaxed">
          "What started from a group chat
          <br />
          slowly became a beautiful love story."
        </p>
      </div>
    </section>
  );
};

export default FallingInLoveSection;
