import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart } from "lucide-react";
import { useInvitationLanguage } from "./InvitationLanguage";

const ClosingSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useInvitationLanguage();

  return (
    <section className="invitation-closing min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-background">
      <div ref={ref} className={`invitation-closing-content text-center max-w-sm ${isVisible ? "visible" : ""} relative z-10`}>
        <Heart className="closing-heart w-8 h-8 text-primary mx-auto mb-8" aria-hidden="true" />

        <p className="closing-intro text-muted-foreground text-sm font-sans-body italic mb-6 leading-relaxed">
          {t.closingIntro}
        </p>
        
        <p className="closing-title text-3xl font-serif text-foreground leading-snug mb-6">{t.closingOne}<br />{t.closingTwo}</p>

        <div className="closing-rule w-16 h-px bg-primary mx-auto mb-6" />

        <p className="closing-thanks text-muted-foreground text-sm font-sans-body leading-relaxed mb-2">
          {t.closingThanks}
        </p>
        <p className="closing-signoff font-serif text-xl text-foreground">Anthon &amp; Melisa</p>

        <p className="closing-footer text-muted-foreground text-xs font-sans-body mt-12">
          {t.closingFooter}
        </p>
      </div>
    </section>
  );
};

export default ClosingSection;
