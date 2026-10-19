import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useInvitationLanguage } from "./InvitationLanguage";

const PandemicSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useInvitationLanguage();

  return (
    <section id="our-story" className="min-h-[70vh] flex items-center justify-center px-6 py-20 relative bg-foreground/5">
      <div ref={ref} className={`text-center max-w-md scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6 font-sans-body">2020</p>
        <h2 className="text-2xl font-serif text-foreground mb-6">{t.pandemicTitle}</h2>
        <div className="w-12 h-px bg-primary mx-auto mb-6" />
        <p className="text-muted-foreground leading-relaxed font-sans-body">
          {t.pandemicOne}
          <br />
          {t.pandemicTwo}
        </p>
      </div>
    </section>
  );
};

export default PandemicSection;
