import { useEffect, useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { motion, useAnimation } from "framer-motion";
import { Trophy, RefreshCcw, PartyPopper, History, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import confetti from "canvas-confetti";

// Web Audio API for ticking sound
const playTick = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  } catch (e) {
    // Sound blocked by browser policy usually
  }
};

const WheelSegment = ({ 
  index, 
  total, 
  name, 
  color 
}: { 
  index: number; 
  total: number; 
  name: string; 
  color: string;
}) => {
  const angle = 360 / total;
  const startAngle = index * angle;
  const endAngle = (index + 1) * angle;
  
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const start = polarToCartesian(150, 150, 140, startAngle);
  const end = polarToCartesian(150, 150, 140, endAngle);
  const largeArcFlag = angle <= 180 ? "0" : "1";

  const d = [
    "M", 150, 150,
    "L", start.x, start.y,
    "A", 140, 140, 0, largeArcFlag, 1, end.x, end.y,
    "Z"
  ].join(" ");

  return (
    <g>
      <path d={d} fill={color} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <g transform={`rotate(${startAngle + angle / 2}, 150, 150)`}>
        <text
          x="265"
          y="150"
          fill="white"
          stroke="black"
          strokeWidth="0.5"
          fontSize={total > 80 ? "5" : total > 50 ? "7" : total > 20 ? "9" : total > 10 ? "11" : "14"}
          fontWeight="950"
          textAnchor="end"
          alignmentBaseline="middle"
          className="select-none font-sans tracking-tighter"
          style={{ 
            paintOrder: 'stroke fill',
            textShadow: total > 50 ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)',
            filter: total > 50 ? 'none' : 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))'
          }}
        >
          {name.split(' ')[0].toUpperCase()}
        </text>
      </g>
    </g>
  );
};

const AdminDoorPrize = () => {
  const [allGuests, setAllGuests] = useState<any[]>([]);
  const [previousWinners, setPreviousWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState<any>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeName, setPrizeName] = useState("Grand Prize");
  const controls = useAnimation();
  const tickIntervalRef = useRef<any>(null);

  // Filter pool to exclude previous winners
  const guests = allGuests.filter(g => !previousWinners.some(pw => pw.id === g.id));

  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", 
    "#F7DC6F", "#BB8FCE", "#82E0AA", "#F1948A", "#85C1E9"
  ];

  useEffect(() => {
    fetchCheckedInGuests();
  }, []);

  const fetchCheckedInGuests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("is_checked_in", true);
      
      if (error) throw error;
      setAllGuests(data || []);
    } catch (error) {
      console.error("Error fetching guests:", error);
      toast.error("Failed to load guests.");
    } finally {
      setLoading(false);
    }
  };

  const spinWheel = async () => {
    if (guests.length === 0) {
      toast.error("No eligible guests remaining in the pool!");
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    const winningIndex = Math.floor(Math.random() * guests.length);
    const segmentAngle = 360 / guests.length;
    
    // Target rotation to land winningIndex at the top
    const targetRotation = 360 - (winningIndex * segmentAngle + segmentAngle / 2);
    const totalSpins = (10 + Math.random() * 5) * 360; 
    const finalRotation = totalSpins + targetRotation;

    // Start ticking sound
    let lastTickAngle = 0;
    const tickDuration = 6000;
    const start = Date.now();
    
    const tickHandler = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / tickDuration, 1);
      
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentRotation = easedProgress * finalRotation;
      
      if (currentRotation - lastTickAngle > segmentAngle) {
        playTick();
        lastTickAngle = currentRotation;
      }
      
      if (progress < 1) {
        requestAnimationFrame(tickHandler);
      }
    };
    requestAnimationFrame(tickHandler);

    await controls.start({
      rotate: finalRotation,
      transition: { duration: 6, ease: [0.15, 0, 0.15, 1] }
    });

    const selectedWinner = guests[winningIndex];
    setWinner(selectedWinner);
    setIsSpinning(false);
    
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: colors
    });
  };

  const claimPrize = () => {
    if (winner) {
      setPreviousWinners(prev => [...prev, { ...winner, prize: prizeName, wonAt: new Date() }]);
      setWinner(null);
      controls.set({ rotate: 0 });
      toast.success(`${winner.name} officially claimed the ${prizeName}!`);
    }
  };

  const resetWheel = () => {
    setWinner(null);
    controls.set({ rotate: 0 });
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="text-center animate-in fade-in slide-in-from-top duration-700">
          <h2 className="text-4xl font-serif font-bold text-foreground tracking-tight">Fortune Wheel</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-muted-foreground">Pulling from</span>
            <span className="bg-primary/10 text-primary px-3 py-0.5 rounded-full text-sm font-bold">{guests.length} Checked-in Guests</span>
            <span className="text-muted-foreground">remaining</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
          {/* Wheel Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-110" />
              
              <div className="relative z-10 w-full h-full p-4">
                <motion.div
                  animate={controls}
                  initial={{ rotate: 0 }}
                  className="w-full h-full relative"
                >
                  <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                    <defs>
                      {colors.map((color, i) => (
                        <linearGradient key={`grad-${i}`} id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={color} />
                          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
                        </linearGradient>
                      ))}
                    </defs>

                    <circle cx="150" cy="150" r="148" fill="#D4AF37" />
                    <circle cx="150" cy="150" r="142" fill="#1a1a1a" />
                    
                    {[...Array(24)].map((_, i) => (
                      <circle 
                        key={`led-${i}`}
                        cx={150 + 145 * Math.cos((i * 15 * Math.PI) / 180)}
                        cy={150 + 145 * Math.sin((i * 15 * Math.PI) / 180)}
                        r="2.5"
                        fill={isSpinning ? (i % 2 === Math.floor(Date.now() / 150) % 2 ? "#fff" : "#D4AF37") : "#fff"}
                        className={isSpinning ? "animate-pulse" : ""}
                      />
                    ))}

                    {guests.map((guest, i) => (
                      <WheelSegment 
                        key={guest.id || i}
                        index={i} 
                        total={guests.length} 
                        name={guest.name} 
                        color={`url(#grad-${i % colors.length})`} 
                      />
                    ))}

                    <circle cx="150" cy="150" r="28" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="2" />
                    <circle cx="150" cy="150" r="18" fill="white" />
                  </svg>
                </motion.div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 z-20">
                  <div className="w-12 h-12 relative drop-shadow-2xl">
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-red-600 clip-path-triangle" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-3 w-full max-w-sm">
                <label className="text-xs uppercase tracking-[0.3em] font-black text-muted-foreground/50">Next Prize</label>
                <input 
                  type="text" 
                  value={prizeName}
                  onChange={(e) => setPrizeName(e.target.value)}
                  className="w-full bg-background border-2 border-border rounded-2xl px-6 py-4 text-center text-xl font-bold focus:border-primary outline-none transition-all shadow-sm"
                  placeholder="Enter prize name..."
                />
              </div>

              <Button 
                onClick={spinWheel} 
                disabled={isSpinning || loading || guests.length === 0}
                className="w-full max-w-sm h-20 rounded-[28px] text-2xl font-black shadow-[0_20px_40px_rgba(0,0,0,0.15)] bg-primary hover:bg-primary/90 text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isSpinning ? "DIVINING WINNER..." : loading ? "SYNCHRONIZING..." : "SPIN FOR LUCK"}
              </Button>
              
              {guests.length === 0 && !loading && (
                <p className="text-sm text-red-500 font-bold bg-red-50 py-3 px-8 rounded-full">
                  All checked-in guests have won a prize!
                </p>
              )}
            </div>
          </div>

          {/* History Column */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-[32px] overflow-hidden bg-white">
              <CardHeader className="border-b border-muted/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <History className="w-5 h-5 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-xl">Winner History</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto p-4 space-y-3">
                  {previousWinners.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">
                      <Trophy className="w-12 h-12 mx-auto mb-3 opacity-10" />
                      <p className="text-sm">No winners yet.</p>
                      <p className="text-xs">The excitement is yet to come!</p>
                    </div>
                  ) : (
                    previousWinners.slice().reverse().map((win, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-muted"
                      >
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold truncate text-foreground">{win.name}</div>
                          <div className="text-xs font-black text-primary/60 uppercase tracking-widest">{win.prize}</div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Button 
              variant="outline" 
              onClick={() => {
                if (window.confirm("Are you sure you want to clear the winner history and reset the pool?")) {
                  setPreviousWinners([]);
                }
              }}
              className="w-full rounded-2xl h-12 text-muted-foreground border-dashed"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Reset Prize Pool
            </Button>
          </div>
        </div>

        {/* Winner Dialog Popup */}
        <Dialog open={!!winner} onOpenChange={(open) => !open && resetWheel()}>
          <DialogContent className="sm:max-w-md border-none shadow-[0_30px_80px_rgba(0,0,0,0.4)] rounded-[40px] overflow-hidden bg-white/95 backdrop-blur-2xl p-0">
            <div className="p-12 text-center space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-48 h-48 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
              </div>

              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1.1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, stiffness: 120 }}
                className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F7DC6F] to-[#D4AF37] flex items-center justify-center mx-auto shadow-2xl relative z-10"
              >
                <PartyPopper className="w-14 h-14 text-white" />
              </motion.div>
              
              <div className="space-y-4 relative z-10">
                <div className="space-y-1">
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs uppercase tracking-[0.5em] font-black text-primary/60"
                  >
                    Lucky Winner
                  </motion.p>
                  <motion.h3 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl font-serif font-black text-foreground tracking-tight leading-tight"
                  >
                    {winner?.name}
                  </motion.h3>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-accent/5 py-4 px-6 rounded-3xl border border-accent/10"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-accent/50 mb-1">Winning A</p>
                  <p className="text-2xl font-black text-accent tracking-tight">{prizeName}</p>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-4 relative z-10 space-y-4"
              >
                <Button 
                  onClick={claimPrize} 
                  className="rounded-full px-12 h-20 bg-primary hover:bg-primary/90 text-white text-xl font-black shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 w-full gap-3"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  CLAIM & LOG WINNER
                </Button>
                <button 
                  onClick={resetWheel}
                  className="text-sm font-bold text-muted-foreground/60 hover:text-muted-foreground underline-offset-4 hover:underline transition-colors"
                >
                  Close & Re-roll
                </button>
              </motion.div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminDoorPrize;
