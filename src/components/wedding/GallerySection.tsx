import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const photos = Array.from({ length: 6 }, (_, i) => ({ id: i, alt: `Gallery photo ${i + 1}` }));

const GallerySection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div ref={ref} className={`w-full scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          Moments
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">Our Gallery</h2>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 px-4 -mx-4 max-w-lg mx-auto">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="flex-shrink-0 w-52 aspect-[3/4] rounded-xl overflow-hidden bg-muted relative"
            >
              <img src="/placeholder.svg" alt={photo.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
