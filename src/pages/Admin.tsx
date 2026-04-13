import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { Users, UserCheck, UserMinus, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Database, Plus } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const [stats, setStats] = useState({
    totalGuests: 0,
    attendingGuests: 0,
    checkedIn: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("guests").select("*");
      if (error) throw error;

      const total = data.length;
      const attending = data.reduce((acc, guest) => acc + (guest.guests_count || 0), 0);
      const checkedIn = data.filter(guest => guest.is_checked_in).length;
      const pending = total - checkedIn;

      setStats({
        totalGuests: total,
        attendingGuests: attending,
        checkedIn: checkedIn,
        pending: pending
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const seedMockData = async () => {
    try {
      setLoading(true);
      
      const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
      const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
      
      const mockGuests = Array.from({ length: 100 }, (_, i) => {
        const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return {
          name: `${fName} ${lName} ${i + 1}`,
          email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i + 1}@example.com`,
          guests_count: Math.floor(Math.random() * 3) + 1,
          is_checked_in: true,
          qr_code_id: `seed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };
      });

      const { error } = await supabase.from("guests").insert(mockGuests);
      if (error) throw error;
      
      toast.success("Successfully seeded 100 mock guests!");
      fetchStats();
    } catch (error: any) {
      toast.error("Failed to seed data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const seedWishlistData = async () => {
    try {
      setLoading(true);
      const mockItems = [
        {
          title: "Honeymoon in Paris",
          category: "Featured Fund",
          price: "Custom",
          image_url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800",
          marketplace_url: "https://www.tripadvisor.com/Tourism-g187147-Paris_Ile_de_France-Vacations.html",
          is_claimed: false
        },
        {
          title: "De'Longhi Espresso",
          category: "Kitchen",
          price: "IDR 24.5M",
          image_url: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800",
          marketplace_url: "https://www.delonghi.com/",
          is_claimed: false
        },
        {
          title: "Marshall Woburn III",
          category: "Audio",
          price: "IDR 8.5M",
          image_url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800",
          marketplace_url: "https://www.marshallheadphones.com/",
          is_claimed: false
        },
        {
          title: "Dyson Airwrap",
          category: "Beauty",
          price: "IDR 9.5M",
          image_url: "https://images.unsplash.com/photo-1620331311520-246422ff83cb?auto=format&fit=crop&q=80&w=800",
          marketplace_url: "https://www.dyson.com/",
          is_claimed: false
        },
        {
          title: "Roborock S8 Pro",
          category: "Home",
          price: "IDR 16.5M",
          image_url: "https://images.unsplash.com/photo-1589923188900-85dae023342b?auto=format&fit=crop&q=80&w=800",
          marketplace_url: "https://us.roborock.com/",
          is_claimed: false
        },
        {
          title: "Le Creuset Oven",
          category: "Kitchen",
          price: "IDR 7.2M",
          image_url: "https://images.unsplash.com/photo-1584284414454-84603463a5aa?auto=format&fit=crop&q=80&w=800",
          marketplace_url: "https://www.lecreuset.com/",
          is_claimed: false
        }
      ];

      const { error } = await supabase.from("wishlist").insert(mockItems);
      if (error) throw error;
      
      toast.success("Successfully seeded wedding wishlist!");
    } catch (error: any) {
      toast.error("Failed to seed items: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: "RSVP Received", value: stats.totalGuests, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Total Guest Count", value: stats.attendingGuests, icon: UserCheck, color: "text-green-500", bg: "bg-green-50" },
    { title: "Checked In", value: stats.checkedIn, icon: QrCode, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Remaining", value: stats.pending, icon: UserMinus, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground">Dashboard Overview</h2>
          <p className="text-muted-foreground text-sm">Real-time attendance tracking for your special day.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loading ? (
            Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)
          ) : (
            statCards.map((stat, i) => (
              <Card key={i} className="border-none shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-2 pt-6">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bg)}>
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Card className="border-none shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="font-serif">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              to="/admin/scan"
              className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-primary/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-bold">Scan Guest QR</div>
                <div className="text-xs text-muted-foreground">Quick check-in for arriving guests</div>
              </div>
            </Link>
            <Link 
              to="/admin/door-prize"
              className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-primary/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="font-bold">Door Prize Wheel</div>
                <div className="text-xs text-muted-foreground">Pick a lucky winner from arrivals</div>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Developer Seeding Section */}
        <div className="flex justify-center pt-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={seedMockData}
            className="text-muted-foreground hover:text-primary gap-2 text-[10px] uppercase tracking-widest font-bold"
          >
            <Database className="w-3 h-3" />
            Seed Mock Guests
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={seedWishlistData}
            className="text-muted-foreground hover:text-primary gap-2 text-[10px] uppercase tracking-widest font-bold"
          >
            <ShoppingBag className="w-3 h-3" />
            Seed Wishlist Items
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

// Internal imports for types/cn
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Trophy, ShoppingBag } from "lucide-react";

export default Admin;
