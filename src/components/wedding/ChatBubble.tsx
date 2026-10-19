import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { useInvitationLanguage } from "./InvitationLanguage";

interface ChatBubbleProps {
  name: string;
  message: string;
  isRight?: boolean;
  avatar?: string;
  delay?: number;
  visible?: boolean;
}

const ChatBubble = ({ name, message, isRight = false, avatar, delay = 0, visible = false }: ChatBubbleProps) => {
  const { t } = useInvitationLanguage();
  const reduceMotion = useReducedMotion();
  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    if (!visible || reduceMotion) return;
    const timer = setTimeout(() => setArrived(true), delay + 350);
    return () => clearTimeout(timer);
  }, [visible, delay, reduceMotion]);
  const ready = reduceMotion || arrived;
  return (
    <div
      className={`chat-bubble flex gap-2 mb-3 ${isRight ? "flex-row-reverse" : ""} ${visible ? "visible" : ""}`}
      style={{ transitionDelay: reduceMotion ? "0ms" : `${delay}ms` }}
    >
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-xs font-semibold text-muted-foreground">
        {avatar || name[0]}
      </div>
      <div className={`max-w-[70%] ${isRight ? "items-end" : "items-start"} flex flex-col`}>
        <span className="text-[10px] text-muted-foreground mb-1 px-1 font-sans-body">{name}</span>
        <div
          className={`relative px-3 py-2 rounded-2xl text-sm font-sans-body ${
            isRight
               ? "invitation-chat-outgoing rounded-tr-sm"
              : "bg-white border border-border rounded-tl-sm text-foreground"
          }`}
        >
          <span className={ready ? "opacity-100" : "opacity-0"}>{message}</span>
          {!ready && <span className="invitation-typing" aria-hidden="true"><i /><i /><i /></span>}
        </div>
        {isRight && <small className={`invitation-read ${ready ? "opacity-100" : "opacity-0"}`}>{t.read}<CheckCheck size={11} aria-hidden="true" /></small>}
      </div>
    </div>
  );
};

export default ChatBubble;
