import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProposalSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 relative">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted mb-8">
          <img src="/placeholder.svg" alt="The proposal" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
            <p className="text-white/70 text-xs tracking-[0.3em] uppercase mb-3 font-sans-body">
              The Proposal
            </p>
            <p className="text-white text-3xl font-serif leading-snug">
              He asked.
            </p>
            <p className="text-white text-3xl font-serif italic">
              She said yes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProposalSection;
