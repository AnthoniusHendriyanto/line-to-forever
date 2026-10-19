import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useInvitationLanguage } from "./InvitationLanguage";
import PhotoAlbum from "./PhotoAlbum";

const GallerySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useInvitationLanguage();

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div ref={ref} className={`w-full scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          {t.galleryEyebrow}
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">{t.galleryTitle}</h2>

        <PhotoAlbum photos={Array.from({ length: 6 }, (_, index) => ({ src: "/placeholder.svg", caption: `${index < 3 ? t.galleryPhoto : t.prewed} · ${index % 3 + 1}` }))} />
      </div>
    </section>
  );
};

export default GallerySection;
