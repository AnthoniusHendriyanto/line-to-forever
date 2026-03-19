import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ChatBubble from "./ChatBubble";

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

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          Where It Started
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">A Random LINE Group</h2>

        {/* Chat container */}
        <div className="bg-[hsl(148_30%_95%)] rounded-2xl p-4 border border-line-green/20">
          <div className="text-center mb-4">
            <div className="bg-line-green/10 text-line-green text-[10px] px-3 py-1 rounded-full inline-block font-sans-body">
              LINE Group Chat
            </div>
          </div>
          {messages.map((msg, i) => (
            <ChatBubble
              key={i}
              {...msg}
              delay={i * 200}
              visible={isVisible}
            />
          ))}
        </div>

        <p className="text-muted-foreground text-sm text-center mt-8 font-sans-body italic leading-relaxed">
          "What started as a simple introduction
          <br />
          turned into something special."
        </p>
      </div>
    </section>
  );
};

export default LineGroupSection;
