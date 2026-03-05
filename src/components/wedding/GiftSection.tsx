import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Copy, Check, CreditCard, Wallet } from "lucide-react";

const gifts = [
  {
    icon: CreditCard,
    title: "Bank Transfer",
    bank: "Bank Central Asia (BCA)",
    account: "1234567890",
    name: "Amanda & Jonathan",
  },
  {
    icon: Wallet,
    title: "Digital Wallet",
    bank: "GoPay",
    account: "081234567890",
    name: "Amanda",
  },
];

const GiftSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          Wedding Gift
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-3 text-center">Send Your Love</h2>
        <p className="text-muted-foreground text-sm text-center mb-8 font-sans-body italic">
          "Your presence is the greatest gift to us."
        </p>

        <div className="space-y-4">
          {gifts.map((gift, i) => (
            <div key={i} className="bg-card rounded-2xl p-5 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <gift.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground font-sans-body">{gift.title}</p>
                  <p className="text-xs text-muted-foreground font-sans-body">{gift.bank}</p>
                </div>
              </div>
              <div className="bg-muted rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono text-foreground">{gift.account}</p>
                  <p className="text-xs text-muted-foreground font-sans-body">a.n. {gift.name}</p>
                </div>
                <button
                  onClick={() => handleCopy(gift.account, i)}
                  className="p-2 rounded-lg hover:bg-background transition-colors"
                >
                  {copied === i ? (
                    <Check className="w-4 h-4 text-line-green" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
