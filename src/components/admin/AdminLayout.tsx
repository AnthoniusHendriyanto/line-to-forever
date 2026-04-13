import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, QrCode, Trophy, Users, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/admin" },
    { icon: Users, label: "Guest List", href: "/admin/guests" },
    { icon: QrCode, label: "Scan QR", href: "/admin/scan" },
    { icon: Trophy, label: "Door Prize", href: "/admin/door-prize" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 pb-20 md:pb-0">
      <div className="bg-white border-b border-border sticky top-0 z-10 px-4 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link 
            to={location.pathname === "/admin" ? "/" : "/admin"} 
            onClick={() => {
              if (location.pathname === "/admin") {
                sessionStorage.removeItem("admin_auth");
              }
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-lg font-bold">Admin Panel</h1>
        </div>
        <div className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          Organizer
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {children}
      </div>

      {/* Bottom Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border flex items-center justify-around py-3 px-2 z-20 md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminLayout;
