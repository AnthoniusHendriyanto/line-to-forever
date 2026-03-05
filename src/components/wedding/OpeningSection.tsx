import { useState } from "react";
import { MessageCircle } from "lucide-react";

interface Props {
  onOpen: () => void;
}

const OpeningSection = ({ onOpen }: Props) => {
  const [tapped, setTapped] = useState(false);

  const handleOpen = () => {
    setTapped(true);
    setTimeout(onOpen, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center lock-screen-bg transition-all duration-700 ${
        tapped ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Time display */}
      <div className="text-white/80 text-6xl font-light mb-1 font-sans-body">
        {new Date().getHours().toString().padStart(2, "0")}:
        {new Date().getMinutes().toString().padStart(2, "0")}
      </div>
      <div className="text-white/50 text-sm mb-16 font-sans-body">
        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
      </div>

      {/* LINE notification */}
      <button
        onClick={handleOpen}
        className="mx-6 w-[calc(100%-3rem)] max-w-sm bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/20 text-left"
        style={{ animation: "notification-bounce 2s ease-in-out infinite" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-line-green flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold text-sm">LINE</span>
              <span className="text-white/50 text-xs">now</span>
            </div>
            <p className="text-white/80 text-sm">You have a new message 💌</p>
            <p className="text-white/50 text-xs mt-0.5">Tap to open invitation</p>
          </div>
        </div>
      </button>

      <p className="text-white/30 text-xs mt-8 font-sans-body">Tap the notification to open</p>
    </div>
  );
};

export default OpeningSection;
