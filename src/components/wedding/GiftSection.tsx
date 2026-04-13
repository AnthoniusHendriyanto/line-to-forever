import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Copy, Check, CreditCard, Wallet, ShoppingBag, Heart, ArrowUpRight, Gift, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  title: string;
  category: string;
  price: string;
  image_url: string;
  marketplace_url: string;
  is_claimed: boolean;
  claimed_by_name?: string;
  claimed_by_email?: string;
}

const accounts = [
  {
    icon: CreditCard,
    title: "BCA Bank",
    account: "1234567890",
    name: "Anthon & Melisa",
  },
  {
    icon: Wallet,
    title: "GoPay",
    account: "081234567890",
    name: "Anthon",
  },
];

const GiftSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<number | null>(null);
  const [claimingItem, setClaimingItem] = useState<WishlistItem | null>(null);
  const [claimName, setClaimName] = useState("");
  const [claimEmail, setClaimEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchWishlist();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('wishlist-updates')
      .on(
        'postgres_changes' as any,
        { event: '*', table: 'wishlist', schema: 'public' },
        () => {
          fetchWishlist();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchWishlist = async () => {
    const { data, error } = await supabase
      .from('wishlist')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Error fetching wishlist:", error);
    } else if (data && data.length > 0) {
      setItems(data);
    } else {
      // Fallback/Initial items if DB is empty
      setItems([
        {
          id: "1",
          title: "Honeymoon in Paris",
          category: "Featured Fund",
          price: "Custom",
          image_url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800",
          marketplace_url: "#",
          is_claimed: false
        },
        {
          id: "2",
          title: "De'Longhi Espresso",
          category: "Kitchen",
          price: "IDR 24.5M",
          image_url: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800",
          marketplace_url: "#",
          is_claimed: false
        },
        {
          id: "3",
          title: "Marshall Woburn III",
          category: "Audio",
          price: "IDR 8.5M",
          image_url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800",
          marketplace_url: "#",
          is_claimed: true
        },
        {
          id: "4",
          title: "Dyson Airwrap",
          category: "Beauty",
          price: "IDR 9.5M",
          image_url: "https://images.unsplash.com/photo-1620331311520-246422ff83cb?auto=format&fit=crop&q=80&w=800",
          marketplace_url: "#",
          is_claimed: false
        },
        {
          id: "5",
          title: "Roborock S8 Pro",
          category: "Home",
          price: "IDR 16.5M",
          image_url: "https://images.unsplash.com/photo-1589923188900-85dae023342b?auto=format&fit=crop&q=80&w=800",
          marketplace_url: "#",
          is_claimed: false
        }
      ]);
    }
    setLoading(false);
  };

  const handleClaim = async () => {
    if (!claimingItem || !claimName || !claimEmail) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase
      .from('wishlist')
      .update({
        is_claimed: true,
        claimed_by_name: claimName,
        claimed_by_email: claimEmail
      })
      .eq('id', claimingItem.id);

    setIsSubmitting(false);
    
    if (error) {
      toast.error("Failed to claim gift. Please try again.");
    } else {
      toast.success("Thank you for your wonderful gift!");
      setClaimingItem(null);
      setClaimName("");
      setClaimEmail("");
      fetchWishlist();
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="min-h-screen py-24 px-6 overflow-hidden bg-gradient-to-b from-transparent to-primary/5">
      <div 
        ref={ref} 
        className={`max-w-md mx-auto scroll-fade-in ${isVisible ? "visible" : ""}`}
      >
        <div className="text-center mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="text-primary border-primary/20 mb-4 px-4 py-1 tracking-[0.3em] font-sans-body text-[10px] uppercase bg-white/50 backdrop-blur-sm">
              Wedding Registry
            </Badge>
            <h2 className="text-4xl font-serif text-foreground mb-4 font-light italic">The Gift of Love</h2>
            <div className="h-px w-12 bg-primary/30 mx-auto mb-6" />
            <p className="text-muted-foreground text-sm font-sans-body px-8 leading-relaxed italic">
              "Your presence at our wedding is already a gift. But if you wish to surprise us, here are some things we'd love."
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-2 gap-4 mb-20 auto-rows-[160px]">
          {items.map((item, idx) => {
            const isHoneymoon = item.id === "1";
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-500 
                  ${isHoneymoon ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}`}
              >
                <img 
                  src={item.image_url} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-white/60 font-sans-body uppercase tracking-[0.2em] mb-1">{item.category}</p>
                      <h3 className="text-white font-serif text-lg leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-white/80 font-mono text-xs mt-1">{item.price}</p>
                    </div>
                    
                    {!item.is_claimed ? (
                      <Dialog open={claimingItem?.id === item.id} onOpenChange={(open) => !open && setClaimingItem(null)}>
                        <DialogTrigger asChild>
                          <Button 
                            onClick={() => setClaimingItem(item)}
                            size="icon" 
                            className="bg-white/20 hover:bg-primary backdrop-blur-md border-none text-white rounded-full w-10 h-10 p-0 shadow-lg"
                          >
                            <Gift className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[calc(100vw-32px)] sm:max-w-md bg-card border-primary/20 p-8 rounded-[2rem]">
                          <DialogHeader>
                            <DialogTitle className="font-serif text-2xl text-center italic">Send Your Love</DialogTitle>
                            <DialogDescription className="text-center font-sans-body pt-2">
                              You are claiming: <span className="font-semibold text-primary">{item.title}</span>
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6 py-8">
                            <div className="space-y-2">
                              <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <User className="w-3 h-3" /> Your Name
                              </Label>
                              <Input 
                                id="name" 
                                value={claimName}
                                onChange={(e) => setClaimName(e.target.value)}
                                placeholder="E.g. Mr. & Mrs. Smith" 
                                className="bg-muted/50 border-none h-12 rounded-xl focus:ring-primary/20"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Mail className="w-3 h-3" /> Your Email
                              </Label>
                              <Input 
                                id="email" 
                                type="email"
                                value={claimEmail}
                                onChange={(e) => setClaimEmail(e.target.value)}
                                placeholder="To send our digital thank you" 
                                className="bg-muted/50 border-none h-12 rounded-xl focus:ring-primary/20"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              onClick={handleClaim}
                              disabled={isSubmitting}
                              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-sans-body font-bold text-sm tracking-widest uppercase shadow-lg shadow-primary/20"
                            >
                              {isSubmitting ? "Processing..." : "Claim & Send Gift"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Badge className="bg-line-green/90 text-white text-[10px] px-3 py-1 rounded-full border-none shadow-md backdrop-blur-sm">
                        RESERVED
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Marketplace Link (Secondary Hint) */}
                {!item.is_claimed && (
                  <a 
                    href={item.marketplace_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-md p-2 rounded-full text-white"
                  >
                    <ShoppingBag className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Traditional Gift Section */}
        <div className="bg-card/50 backdrop-blur-sm rounded-[2.5rem] p-10 border border-border/30 text-center">
          <Badge variant="outline" className="text-primary border-primary/10 mb-6 px-4 py-0.5 tracking-[0.2em] font-sans-body text-[9px] uppercase">
            Digital Angpao
          </Badge>
          <h3 className="text-2xl font-serif text-foreground mb-4">Envelope Fund</h3>
          <p className="text-muted-foreground text-xs font-sans-body mb-10 px-4 leading-relaxed italic">
            "Your blessings mean the world to us. If you prefer to send a gesture digitally, please use the details below."
          </p>

          <div className="space-y-4 max-w-xs mx-auto">
            {accounts.map((acc, i) => (
              <div key={i} className="group bg-muted/30 rounded-2xl p-4 hover:bg-muted/50 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-primary/5">
                    <acc.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-sans-body mb-0.5">{acc.title}</p>
                    <p className="text-sm font-mono text-foreground font-bold">{acc.account}</p>
                    <p className="text-[10px] text-muted-foreground font-sans-body">a.n. {acc.name}</p>
                  </div>
                  <button 
                    onClick={() => handleCopy(acc.account, i)}
                    className="p-2 rounded-lg hover:bg-primary hover:text-white transition-all text-muted-foreground"
                  >
                    {copied === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
