
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Forecast = {
  id: string;
  name: string;
  type: string;
  total_cost: number;
  total_revenue: number;
  total_profit: number;
  created_at: string;
};

const Forecasts = () => {
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchForecasts = async () => {
      try {
        const { data, error } = await supabase
          .from("forecasts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setForecasts(data || []);
      } catch (error: any) {
        toast({
          title: "Error fetching forecasts",
          description: error.message || "Failed to load forecasts",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchForecasts();
  }, [toast]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Forecasts</h1>
          <Button className="brutal-button" asChild>
            <a href="/forecasts/new">
              <Plus className="mr-2 h-4 w-4" /> New Forecast
            </a>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : forecasts.length === 0 ? (
          <div className="brutal-card p-8 text-center">
            <p className="text-brutal-gray mb-4">No forecasts have been created yet.</p>
            <Button className="brutal-button" asChild>
              <a href="/forecasts/new">Create First Forecast</a>
            </Button>
          </div>
        ) : (
          <div className="brutal-card p-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Total Revenue</TableHead>
                  <TableHead>Total Profit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forecasts.map((forecast) => (
                  <TableRow key={forecast.id}>
                    <TableCell className="font-medium">{forecast.name}</TableCell>
                    <TableCell>{forecast.type}</TableCell>
                    <TableCell>{formatCurrency(forecast.total_cost)}</TableCell>
                    <TableCell>{formatCurrency(forecast.total_revenue)}</TableCell>
                    <TableCell>{formatCurrency(forecast.total_profit)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/forecasts/${forecast.id}`}>View</a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Forecasts;
