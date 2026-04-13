import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Search, Filter, Mail, User, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const AdminGuests = () => {
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setGuests(data || []);
    } catch (error) {
      console.error("Error fetching guests:", error);
      toast.error("Failed to load guests.");
    } finally {
      setLoading(false);
    }
  };

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(search.toLowerCase()) ||
    guest.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground">Guest List</h2>
            <p className="text-muted-foreground text-sm">Managing {guests.length} total RSVPs</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search name or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11 rounded-xl bg-white border-border shadow-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="font-bold">Guest Info</TableHead>
                <TableHead className="text-center font-bold">Qty</TableHead>
                <TableHead className="text-center font-bold">Status</TableHead>
                <TableHead className="text-right font-bold whitespace-nowrap">RSVP Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={4} className="h-16 animate-pulse bg-muted/10"></TableCell>
                  </TableRow>
                ))
              ) : filteredGuests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    No guests found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredGuests.map((guest) => (
                  <TableRow key={guest.id} className="hover:bg-muted/5 transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground flex items-center gap-2">
                          {guest.name}
                          {guest.is_checked_in && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {guest.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="rounded-md font-bold px-2 py-0">
                        {guest.guests_count}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {guest.is_checked_in ? (
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase tracking-tighter">Checked In</span>
                          {guest.scanned_at && (
                            <span className="text-[8px] text-muted-foreground mt-1 flex items-center gap-0.5">
                              <Clock className="w-2 h-2" />
                              {format(new Date(guest.scanned_at), 'HH:mm')}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded uppercase tracking-tighter">Registered</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(guest.created_at), 'MMM d, yyyy')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminGuests;
