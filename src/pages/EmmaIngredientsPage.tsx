
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EmmaIngredientsSplit } from "@/components/emma/ingredients/EmmaIngredientsSplit";
import { Button } from "@/components/ui/button";
import { HelpCircle, List, FileText, Leaf, Sparkles, Droplets, Beaker, Flask } from "lucide-react";
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
import { EmmaProductSimulator } from "@/components/emma/ingredients/EmmaProductSimulator";
import { Separator } from "@/components/ui/separator";

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
      <div className="bg-gradient-to-br from-white to-slate-50">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Emma Ingredients Collection
              </h1>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
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
            
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explore our complete collection of premium ingredients designed for personalized skincare formulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Texture Capsules</h3>
              <p className="text-muted-foreground text-sm">
                The base formulation that determines the feel and consistency of the final product.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Active Capsules</h3>
              <p className="text-muted-foreground text-sm">
                Concentrated active ingredients targeting specific skin concerns and conditions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center mb-4">
                <Droplets className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Fragrance Capsules</h3>
              <p className="text-muted-foreground text-sm">
                Optional scent additions to enhance the sensory experience of the product.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <List className="h-5 w-5 text-primary" />
                <span className="font-medium">INCI Lists</span>
                <span className="text-sm text-muted-foreground">Full ingredient declarations</span>
              </div>
              
              <Separator orientation="vertical" className="h-6" />
              
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium">Ingredient Breakdowns</span>
                <span className="text-sm text-muted-foreground">Detailed composition information</span>
              </div>
            </div>
            
            <EmmaIngredientsSplit />
          </div>
          
          {!isLoading && !error && filteredIngredientsWithoutEquipment.length > 0 && (
            <div className="relative overflow-hidden mb-8 bg-gradient-to-br from-slate-100 to-slate-50 p-1 rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-green-100/20 pointer-events-none"></div>
              <div className="relative rounded-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"></div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
                      <Flask className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Formula Creator</h2>
                      <p className="text-slate-500">Mix and match capsules to visualize your custom product</p>
                    </div>
                  </div>
                  <EmmaProductSimulator ingredients={filteredIngredientsWithoutEquipment} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmmaIngredientsPage;
