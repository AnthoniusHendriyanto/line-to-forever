import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowDown, MessageCircle } from "lucide-react";
import { useInvitationLanguage } from "./InvitationLanguage";
import { formatWeddingDate } from "./weddingConfig";

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const { t, locale } = useInvitationLanguage();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden bg-background">
      <div className="invitation-hero-halo" aria-hidden="true" />

      <div ref={ref} className={`invitation-hero-content relative z-10 ${isVisible ? "visible" : ""}`}>
        <p className="invitation-hero-intro text-muted-foreground text-sm tracking-[0.3em] uppercase mb-8 font-sans-body">
          {t.heroIntro}
        </p>
        <p className="invitation-hero-message text-muted-foreground text-sm mb-12 font-sans-body italic">
          {t.heroMessage}
        </p>

        <div className="invitation-hero-rule w-16 h-px bg-primary mx-auto mb-12" />

        <p className="invitation-hero-label text-muted-foreground text-xs tracking-[0.4em] uppercase mb-4 font-sans-body">
          {t.weddingOf}
        </p>
        <div className="invitation-name-frame flex flex-col items-center justify-center mb-8">
          <h1 className="sr-only">Anthon &amp; Melisa</h1>
          <p aria-hidden="true" className="invitation-hero-name invitation-hero-name-first text-4xl sm:text-5xl font-serif text-foreground leading-tight">Anthon</p>
          <p aria-hidden="true" className="invitation-hero-ampersand text-primary text-2xl font-serif italic my-2">&</p>
          <p aria-hidden="true" className="invitation-hero-name invitation-hero-name-second text-4xl sm:text-5xl font-serif text-foreground leading-tight">Melisa</p>
        </div>
        <p className="invitation-hero-date text-muted-foreground font-sans-body tracking-[0.2em] text-sm">
          {formatWeddingDate(locale)}
        </p>
        <p className="invitation-hero-note">{t.heroNote}</p>
        <a href="#our-story" className="invitation-story-link"><MessageCircle size={15} aria-hidden="true" />{t.scroll}<ArrowDown size={14} aria-hidden="true" /></a>
      </div>
    </section>
  );
};

export default HeroSection;
