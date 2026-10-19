import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useInvitationLanguage } from "./InvitationLanguage";

interface Props {
  onOpen: () => void;
}

const OpeningSection = ({ onOpen }: Props) => {
  const { t, locale } = useInvitationLanguage();
  const reduceMotion = useReducedMotion();
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="invitation-opening fixed inset-0 z-50 mx-auto max-w-lg flex flex-col items-center justify-center lock-screen-bg"
      exit={{ opacity: 0, y: reduceMotion ? 0 : -28 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Time display */}
      <div className="text-white/80 text-6xl font-light mb-1 font-sans-body">
        {time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })}
      </div>
      <div className="text-white/75 text-sm mb-16 font-sans-body">
        {time.toLocaleDateString(locale, { weekday: "long", month: "long", day: "numeric" })}
      </div>

      {/* LINE notification */}
      <motion.button
        onClick={onOpen}
        aria-label={t.open}
        className="invitation-notification mx-6 w-[calc(100%-3rem)] max-w-sm bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/20 text-left"
        initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 20, delay: reduceMotion ? 0 : 0.25 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-line-green flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold text-sm">LINE</span>
              <span className="text-white/75 text-xs">{t.now}</span>
            </div>
            <p className="text-white text-sm">{t.notification}</p>
            <p className="text-white/75 text-xs mt-0.5">{t.from}</p>
          </div>
        </div>
      </motion.button>

      <p className="text-white/75 text-xs mt-8 font-sans-body">{t.tap}</p>
    </motion.div>
  );
};

export default OpeningSection;
