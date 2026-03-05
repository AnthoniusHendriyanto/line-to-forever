import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ChatBubble from "./ChatBubble";

const messages = [
  { name: "Amanda", message: "Hey! Nice talking with you in the group 😊", isRight: false },
  { name: "Jonathan", message: "Same here! You seem really cool", isRight: true },
  { name: "Amanda", message: "Haha thanks! So what do you do?", isRight: false },
  { name: "Jonathan", message: "I'm in tech. You?", isRight: true },
  { name: "Amanda", message: "Design! We should chat more 🎨", isRight: false },
  { name: "Jonathan", message: "I'd love that 😊", isRight: true },
];

const FirstConversationSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          Private Messages
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">The First Conversation</h2>

        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="text-center mb-4">
            <div className="bg-primary/10 text-primary text-[10px] px-3 py-1 rounded-full inline-block font-sans-body">
              Private Chat
            </div>
          </div>
          {messages.map((msg, i) => (
            <ChatBubble
              key={i}
              {...msg}
              delay={i * 250}
              visible={isVisible}
            />
          ))}
        </div>

        <p className="text-muted-foreground text-sm text-center mt-8 font-sans-body italic">
          "We started talking more and more…"
        </p>
      </div>
    </section>
  );
};

export default FirstConversationSection;
