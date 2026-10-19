import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useInvitationLanguage } from "./InvitationLanguage";
import PhotoAlbum from "./PhotoAlbum";

const OnlineToRealSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useInvitationLanguage();

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-16">
      <div ref={ref} className={`w-full max-w-sm text-center scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body">
          {t.meetingEyebrow}
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8">{t.meetingTitle}</h2>

        <div className="mb-8"><PhotoAlbum photos={[{ src: "/placeholder.svg", caption: t.meetingPhoto }]} /></div>
        <p className="text-primary text-sm mb-4 font-sans-body">{t.meetingCaption}</p>

        <p className="text-muted-foreground text-sm font-sans-body italic leading-relaxed">
          “{t.meetingQuote}”
        </p>
      </div>
    </section>
  );
};

export default OnlineToRealSection;
