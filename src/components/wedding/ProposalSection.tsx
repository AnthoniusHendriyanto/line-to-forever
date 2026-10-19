import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useInvitationLanguage } from "./InvitationLanguage";
import PhotoAlbum from "./PhotoAlbum";

const ProposalSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useInvitationLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 relative">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <PhotoAlbum photos={[{ src: "/placeholder.svg", caption: t.proposal }]} overlay={<>
          <span className="block text-xs tracking-[0.3em] uppercase mb-3 font-sans-body">{t.proposal}</span>
          <span className="block text-3xl font-serif leading-snug">{t.proposalOne}</span>
          <span className="block text-3xl font-serif italic">{t.proposalTwo}</span>
        </>} />
      </div>
    </section>
  );
};

export default ProposalSection;
