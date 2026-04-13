import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Keyboard } from "lucide-react";

const ADMIN_PIN = "1234"; // Hardcoded PIN for now as requested

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  };

  if (isAuthenticated === null) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-sm w-full space-y-8 p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/30">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">Admin Access</h1>
            <p className="text-slate-400 text-sm">Please enter your 4-digit PIN</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="relative group">
                <Keyboard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                <Input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  maxLength={4}
                  className="bg-slate-800 border-slate-700 text-white pl-10 h-14 text-center text-2xl tracking-[1em] focus:ring-primary focus:border-primary rounded-xl"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-red-400 text-xs text-center font-medium animate-shake">Incorrect PIN. Please try again.</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Unlock Dashboard
            </Button>
          </form>

          <div className="pt-4 text-center">
            <a href="/" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
              Return to Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
