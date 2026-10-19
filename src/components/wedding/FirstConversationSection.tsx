import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ChatBubble from "./ChatBubble";
import { Heart } from "lucide-react";
import { useInvitationLanguage } from "./InvitationLanguage";

const messages = [
  { name: "Anthon", message: "Hey! Nice talking with you in the group 😊", isRight: false },
  { name: "Melisa", message: "Same here! You seem really cool", isRight: true },
  { name: "Anthon", message: "Haha thanks! So what do you do?", isRight: false },
  { name: "Melisa", message: "I'm in tech. You?", isRight: true },
  { name: "Anthon", message: "Design! We should chat more 🎨", isRight: false },
  { name: "Melisa", message: "I'd love that 😊", isRight: true },
];

const FirstConversationSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const { t } = useInvitationLanguage();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          {t.privateEyebrow}
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">{t.privateTitle}</h2>

        <div className="invitation-chat rounded-2xl p-4 border border-border">
          <div className="invitation-chat-heading">
            <Heart size={17} aria-hidden="true" /><span>Anthon &amp; Melisa</span><span className="sr-only">{t.privateChat}</span><span aria-hidden="true">···</span>
          </div>
          {messages.map((msg, i) => (
            <ChatBubble
              key={i}
              {...msg}
              message={t.privateMessages[i]}
              delay={i * 260}
              visible={isVisible}
            />
          ))}
        </div>

        <p className="text-muted-foreground text-sm text-center mt-8 font-sans-body italic">
          “{t.privateQuote}”
        </p>
      </div>
    </section>
  );
};

export default FirstConversationSection;
