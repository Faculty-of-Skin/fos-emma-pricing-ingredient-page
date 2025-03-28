
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type WaitlistEmail = {
  id: string;
  email: string;
  created_at: string;
};

const AdminPanel = () => {
  const [waitlistEmails, setWaitlistEmails] = useState<WaitlistEmail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWaitlistEmails = async () => {
      try {
        const { data, error } = await supabase
          .from("waitlist_emails")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setWaitlistEmails(data || []);
      } catch (error: any) {
        toast({
          title: "Error fetching waitlist emails",
          description: error.message || "Failed to load waitlist data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWaitlistEmails();
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="brutal-card">
            <CardHeader>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>Add, edit, and manage product inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="brutal-button" asChild>
                <a href="/admin/products">Manage Products</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="brutal-card">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="brutal-button" asChild>
                <a href="/admin/users">Manage Users</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="brutal-card">
          <CardHeader>
            <CardTitle>Waitlist Subscribers</CardTitle>
            <CardDescription>People who have signed up for the waitlist</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : waitlistEmails.length === 0 ? (
              <p className="text-brutal-gray text-center p-4">No waitlist subscribers yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waitlistEmails.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.email}</TableCell>
                      <TableCell>
                        {new Date(entry.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
