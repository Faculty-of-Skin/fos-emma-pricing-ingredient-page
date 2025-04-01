
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EmmaIngredientsSplit } from "@/components/emma/ingredients/EmmaIngredientsSplit";
import { Button } from "@/components/ui/button";
import { HelpCircle, Beaker } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { useEmmaIngredients } from "@/hooks/useEmmaIngredients";
import { EmmaProductSimulator } from "@/components/emma/ingredients/product-simulator/EmmaProductSimulator";

const EmmaIngredientsPage = () => {
  const { isAdmin } = useAuth();
  const { ingredients, isLoading, error } = useEmmaIngredients();
  
  // Filter out equipment and accessories
  const filteredIngredientsWithoutEquipment = !isLoading && !error ? ingredients.filter(
    (ingredient) => {
      const category = ingredient.Category?.toLowerCase() || "";
      return !category.includes("equipment") && !category.includes("accessories") && !category.includes("accessory");
    }
  ) : [];

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl py-8">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Emma Ingredients
                </h1>
                <p className="text-muted-foreground mt-1">
                  Explore ingredients for personalized skincare formulations
                </p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 h-9 px-4">
                    <HelpCircle className="h-4 w-4" />
                    Help
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-md">
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
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
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
                        <p className="text-sm text-muted-foreground">
                          For more information about Emma ingredients or if you have any questions, please contact our support team:
                        </p>
                        <p className="pt-2">
                          <strong>Email:</strong> <a href="mailto:info@facultyofskin.com" className="text-primary hover:underline">info@facultyofskin.com</a>
                        </p>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="bg-card p-6 border rounded-lg mb-8">
            <EmmaIngredientsSplit />
          </div>
          
          {!isLoading && !error && filteredIngredientsWithoutEquipment.length > 0 && (
            <div className="bg-card p-6 border rounded-lg overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <Beaker className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-medium">Formula Creator</h2>
                  <p className="text-sm text-muted-foreground">Mix and match capsules to visualize your custom product</p>
                </div>
              </div>
              <EmmaProductSimulator ingredients={filteredIngredientsWithoutEquipment} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmmaIngredientsPage;
