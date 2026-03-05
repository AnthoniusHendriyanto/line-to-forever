interface ChatBubbleProps {
  name: string;
  message: string;
  isRight?: boolean;
  avatar?: string;
  delay?: number;
  visible?: boolean;
}

const ChatBubble = ({ name, message, isRight = false, avatar, delay = 0, visible = false }: ChatBubbleProps) => {
  return (
    <div
      className={`chat-bubble flex gap-2 mb-3 ${isRight ? "flex-row-reverse" : ""} ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-xs font-semibold text-muted-foreground">
        {avatar || name[0]}
      </div>
      <div className={`max-w-[70%] ${isRight ? "items-end" : "items-start"} flex flex-col`}>
        <span className="text-[10px] text-muted-foreground mb-1 px-1 font-sans-body">{name}</span>
        <div
          className={`px-3 py-2 rounded-2xl text-sm font-sans-body ${
            isRight
              ? "bg-line-green text-accent-foreground rounded-tr-sm"
              : "bg-white border border-border rounded-tl-sm text-foreground"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
