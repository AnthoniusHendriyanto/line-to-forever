import { useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll } from "framer-motion";
import { InvitationLanguageProvider, InvitationLanguageSwitch, useInvitationLanguage } from "@/components/wedding/InvitationLanguage";
import OpeningSection from "@/components/wedding/OpeningSection";
import HeroSection from "@/components/wedding/HeroSection";
import PandemicSection from "@/components/wedding/PandemicSection";
import LineGroupSection from "@/components/wedding/LineGroupSection";
import FirstConversationSection from "@/components/wedding/FirstConversationSection";
import OnlineToRealSection from "@/components/wedding/OnlineToRealSection";
import FallingInLoveSection from "@/components/wedding/FallingInLoveSection";
import ProposalSection from "@/components/wedding/ProposalSection";
import EventDetailsSection from "@/components/wedding/EventDetailsSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import GallerySection from "@/components/wedding/GallerySection";
import RsvpSection from "@/components/wedding/RsvpSection";
import GiftSection from "@/components/wedding/GiftSection";
import ClosingSection from "@/components/wedding/ClosingSection";
import FloatingParticles from "@/components/wedding/FloatingParticles";
import "@/components/wedding/invitation.css";

const Index = () => {
  return <InvitationLanguageProvider><MotionConfig reducedMotion="user"><Invitation /></MotionConfig></InvitationLanguageProvider>;
};

const InvitationProgress = () => {
  // ponytail: measure only after the invitation mounts, not the empty opening screen.
  const { scrollYProgress } = useScroll();
  return <motion.div className="invitation-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
};

const Invitation = () => {
  const [opened, setOpened] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const { t } = useInvitationLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <div className="wedding-invitation bg-background min-h-screen max-w-lg mx-auto relative overflow-hidden">
      <div className="invitation-controls"><InvitationLanguageSwitch /></div>
      <AnimatePresence onExitComplete={() => mainRef.current?.focus({ preventScroll: true })}>
        {!opened && <OpeningSection key="opening" onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && (
        <main ref={mainRef} tabIndex={-1} aria-label={t.weddingOf}>
          {!reduceMotion && <InvitationProgress />}
          <FloatingParticles />
          <HeroSection />
          <PandemicSection />
          <LineGroupSection />
          <FirstConversationSection />
          <OnlineToRealSection />
          <FallingInLoveSection />
          <ProposalSection />
          <EventDetailsSection />
          <CountdownSection />
          <GallerySection />
          <RsvpSection />
          <GiftSection />
          <ClosingSection />
          <div className="invitation-shortcuts"><a href="#event-details">{t.details}</a><span aria-hidden="true">·</span><a href="#rsvp">{t.rsvp}</a></div>
        </main>
      )}
    </div>
  );
};

export default Index;
