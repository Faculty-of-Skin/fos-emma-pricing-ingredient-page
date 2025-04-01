
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EmmaIngredients } from "@/components/emma/ingredients/EmmaIngredients";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";

const EmmaIngredientsPage = () => {
  const { isAdmin } = useAuth();

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 max-w-7xl py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Emma Ingredients Database</h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                Help
              </Button>
            </DialogTrigger>
            
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About Emma Ingredients</DialogTitle>
                <DialogDescription>
                  {isAdmin 
                    ? "This page displays all ingredients from the emma_ingredients table in your Supabase database."
                    : "This page displays all ingredients available in the Emma collection."}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                {isAdmin ? (
                  <>
                    <h3 className="font-semibold">Troubleshooting Tips:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>No data showing?</strong> Make sure your Supabase database has an 'emma_ingredients' table with data.
                      </li>
                      <li>
                        <strong>Connection issues?</strong> Verify your Supabase connection details in the src/integrations/supabase/client.ts file.
                      </li>
                      <li>
                        <strong>Wrong column names?</strong> Ensure column names in the database match the expected format in the EmmaIngredient type.
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold">Need help?</h3>
                    <p>
                      For more information about Emma ingredients or if you have any questions, please contact our support team:
                    </p>
                    <p className="pt-2">
                      <strong>Email:</strong> <a href="mailto:info@facultyofskin.com" className="text-primary hover:underline">info@facultyofskin.com</a>
                    </p>
                    <p className="pt-4 text-sm text-muted-foreground">
                      Our team will respond to your inquiry as soon as possible.
                    </p>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Browse the complete database of Emma ingredients, including formulations, pricing, and details for different distribution channels.
        </p>
        
        <EmmaIngredients />
      </div>
    </DashboardLayout>
  );
};

export default EmmaIngredientsPage;
