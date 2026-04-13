import { useEffect, useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Html5QrcodeScanner } from "html5-qrcode";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Check, X, Printer, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AdminScan = () => {
  const [scanResult, setScanResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scanner.render(onScanSuccess, onScanFailure);
      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isScanning]);

  async function onScanSuccess(decodedText: string) {
    if (loading) return;
    
    setIsScanning(false);
    setLoading(true);
    
    try {
      // Atomic Update: Only mark as checked in if they aren't already
      // This handles concurrency (multiple scanners) correctly
      const { data, error, count } = await supabase
        .from("guests")
        .update({ 
          is_checked_in: true, 
          scanned_at: new Date().toISOString() 
        })
        .eq("qr_code_id", decodedText)
        .eq("is_checked_in", false)
        .select();

      if (error) throw error;

      // If data is returned, it means the update succeeded (atomic win)
      if (data && data.length > 0) {
        const guest = data[0];
        setScanResult({
          status: "success",
          guest: guest
        });
        toast.success(`Registered ${guest.name} successfully!`);
      } else {
        // Fallback: Check if they were already checked in or invalid
        const { data: existingGuest, error: fetchError } = await supabase
          .from("guests")
          .select("*")
          .eq("qr_code_id", decodedText)
          .single();

        if (fetchError || !existingGuest) {
          throw new Error("Guest not found or invalid QR code.");
        }

        if (existingGuest.is_checked_in) {
          setScanResult({
            status: "already_checked_in",
            guest: existingGuest
          });
          toast.info(`${existingGuest.name} is already checked in.`);
        } else {
          // This case should ideally not happen due to the logic above, 
          // but added for robustness.
          throw new Error("Registration failed. Please try again.");
        }
      }
    } catch (err: any) {
      console.error("Scan error:", err);
      setScanResult({
        status: "error",
        message: err.message
      });
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  function onScanFailure(error: any) {
    // Silently ignore failures to avoid noise
  }

  const resetScanner = () => {
    setScanResult(null);
    setIsScanning(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold">QR Scanner</h2>
          <p className="text-muted-foreground text-sm">Scan guest ticket to register arrival</p>
        </div>

        {isScanning ? (
          <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-xl">
            <div id="reader" className="w-full"></div>
            <div className="p-4 bg-muted/50 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Place QR code inside the frame
            </div>
          </div>
        ) : (
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <CardContent className="p-8 text-center">
              {scanResult?.status === "success" || scanResult?.status === "already_checked_in" ? (
                <div className="space-y-6">
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce",
                    scanResult.status === "success" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                  )}>
                    <Check className="w-10 h-10" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-foreground capitalize">{scanResult.guest.name}</h3>
                    <p className="text-muted-foreground">{scanResult.guest.email}</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                        {scanResult.guest.guests_count} Guests
                      </span>
                      {scanResult.status === "already_checked_in" && (
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                          Already Registered
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button variant="outline" onClick={resetScanner} className="rounded-xl py-6">
                      Scan Next
                    </Button>
                    <Button onClick={handlePrint} className="rounded-xl py-6 gap-2">
                      <Printer className="w-4 h-4" />
                      Print Sticker
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                    <X className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold">Scan Failed</h3>
                  <p className="text-muted-foreground">{scanResult?.message || "Something went wrong."}</p>
                  <Button onClick={resetScanner} className="w-full rounded-xl py-6">
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Hidden Print Section */}
        <div className="hidden print:block print:fixed print:inset-0 print:bg-white print:z-[9999]">
          <div className="w-fit p-4 border-2 border-dashed border-gray-400 rounded-lg text-center mx-auto mt-20">
            <h1 className="text-2xl font-bold uppercase">{scanResult?.guest?.name}</h1>
            <p className="text-sm border-t border-gray-200 mt-2 pt-2">GUEST COUNT: {scanResult?.guest?.guests_count}</p>
            <p className="text-[10px] mt-1 text-gray-500">LINE TO FOREVER - WEDDING RECEPTION</p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-xl p-4 flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ensure you have granted camera permissions. If scanning is slow, try cleaning your lens or increasing lighting.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

// Internal imports for formatting
import { cn } from "@/lib/utils";

export default AdminScan;
