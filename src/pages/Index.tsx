import { useState } from "react";
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

const Index = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="bg-background min-h-screen max-w-lg mx-auto relative overflow-hidden">
      <OpeningSection onOpen={() => setOpened(true)} />

      {opened && (
        <div className="animate-[fade-in_1s_ease-out]">
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
        </div>
      )}
    </div>
  );
};

export default Index;
