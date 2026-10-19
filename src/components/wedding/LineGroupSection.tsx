import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ChatBubble from "./ChatBubble";
import { Users } from "lucide-react";
import { useInvitationLanguage } from "./InvitationLanguage";

const messages = [
  { name: "Anthon", message: "Hi everyone 👋", isRight: false },
  { name: "Melisa", message: "Hello!", isRight: true },
  { name: "Sarah", message: "Welcome to the group! 🎉", isRight: false },
  { name: "Michael", message: "Nice to meet you all!", isRight: false },
  { name: "Anthon", message: "Looking forward to getting to know everyone 😊", isRight: false },
  { name: "Melisa", message: "Same here! This is great", isRight: true },
];

const LineGroupSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const { t } = useInvitationLanguage();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          {t.groupEyebrow}
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">{t.groupTitle}</h2>

        {/* Chat container */}
        <div className="invitation-chat rounded-2xl p-4 border border-line-green/20">
          <div className="invitation-chat-heading">
            <Users size={17} aria-hidden="true" /><span>{t.groupChat}</span><span aria-hidden="true">···</span>
          </div>
          {messages.map((msg, i) => (
            <ChatBubble
              key={i}
              {...msg}
              message={t.groupMessages[i]}
              delay={i * 260}
              visible={isVisible}
            />
          ))}
        </div>

        <p className="text-muted-foreground text-sm text-center mt-8 font-sans-body italic leading-relaxed">
          “{t.groupQuote}”
        </p>
      </div>
    </section>
  );
};

export default LineGroupSection;
