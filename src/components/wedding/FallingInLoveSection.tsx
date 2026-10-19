import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useInvitationLanguage } from "./InvitationLanguage";
import PhotoAlbum from "./PhotoAlbum";

const FallingInLoveSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useInvitationLanguage();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-secondary/30">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          {t.journeyEyebrow}
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">{t.journeyTitle}</h2>

        <PhotoAlbum photos={t.journeyCaptions.map(caption => ({ src: "/placeholder.svg", caption }))} />

        <p className="text-muted-foreground text-sm text-center mt-8 font-sans-body italic leading-relaxed">
          “{t.journeyQuote}”
        </p>
      </div>
    </section>
  );
};

export default FallingInLoveSection;
