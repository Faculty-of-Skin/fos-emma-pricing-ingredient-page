
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EmmaIngredientsSplit } from "@/components/emma/ingredients/EmmaIngredientsSplit";
import { Button } from "@/components/ui/button";
import { HelpCircle, List, FileText, Leaf, Sparkles, Droplets, Beaker, FlaskConical, ChevronRight } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <FlaskConical className="h-4 w-4 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Emma Ingredients
                </h1>
              </div>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Explore our premium ingredients designed for personalized skincare formulations.
                Each ingredient is carefully selected to provide optimal results for various skin concerns.
              </p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    About Emma Ingredients
                  </DialogTitle>
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
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
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
                      <p className="text-muted-foreground">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/20 rounded-xl border border-emerald-100 shadow-sm p-6 transition-all hover:shadow-md flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Texture Capsules</h3>
              <p className="text-muted-foreground text-sm">
                The base formulation that determines the feel and consistency of the final product.
              </p>
              <Button variant="link" className="mt-2 text-xs text-emerald-600 gap-1 group">
                Learn more <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/20 rounded-xl border border-blue-100 shadow-sm p-6 transition-all hover:shadow-md flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Active Capsules</h3>
              <p className="text-muted-foreground text-sm">
                Concentrated active ingredients targeting specific skin concerns and conditions.
              </p>
              <Button variant="link" className="mt-2 text-xs text-blue-600 gap-1 group">
                Learn more <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-violet-50 to-violet-100/20 rounded-xl border border-violet-100 shadow-sm p-6 transition-all hover:shadow-md flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                <Droplets className="h-6 w-6 text-violet-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fragrance Capsules</h3>
              <p className="text-muted-foreground text-sm">
                Optional scent additions to enhance the sensory experience of the product.
              </p>
              <Button variant="link" className="mt-2 text-xs text-violet-600 gap-1 group">
                Learn more <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-slate-100 to-slate-50 border-b">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <List className="h-5 w-5 text-primary" />
                    <span className="font-semibold">INCI Lists</span>
                  </div>
                  
                  <Separator orientation="vertical" className="h-6 hidden md:block" />
                  
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Ingredient Breakdowns</span>
                  </div>
                </div>
                
                <span className="text-xs text-muted-foreground bg-white px-3 py-1 rounded-full border">
                  Explore our premium ingredient collection
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <EmmaIngredientsSplit />
            </div>
          </div>
          
          {!isLoading && !error && filteredIngredientsWithoutEquipment.length > 0 && (
            <div className="overflow-hidden">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border shadow-sm">
                <div className="relative rounded-xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-violet-500"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <FlaskConical className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">Formula Creator</h2>
                        <p className="text-muted-foreground text-sm">Mix and match capsules to visualize your custom product</p>
                      </div>
                    </div>
                    <EmmaProductSimulator ingredients={filteredIngredientsWithoutEquipment} />
                  </div>
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
