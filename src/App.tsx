import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminScan from "./pages/AdminScan";
import AdminGuests from "./pages/AdminGuests";
import AdminDoorPrize from "./pages/AdminDoorPrize";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/admin/*" 
            element={
              <AdminProtectedRoute>
                <Routes>
                  <Route index element={<Admin />} />
                  <Route path="scan" element={<AdminScan />} />
                  <Route path="guests" element={<AdminGuests />} />
                  <Route path="door-prize" element={<AdminDoorPrize />} />
                </Routes>
              </AdminProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

