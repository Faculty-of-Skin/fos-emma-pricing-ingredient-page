
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EmmaIngredientsSplit } from "@/components/emma/ingredients/EmmaIngredientsSplit";
import { Button } from "@/components/ui/button";
import { HelpCircle, List, FileText, Leaf, Sparkles, Droplets, Beaker, FlaskConical } from "lucide-react";
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
      <div className="bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl py-12">
          <div className="flex flex-col gap-6 mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
                  Emma Ingredients
                </h1>
                <p className="text-lg text-slate-600 mt-2 max-w-3xl">
                  Explore our premium ingredients designed for personalized skincare formulations.
                </p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 h-10 px-4 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
                    <HelpCircle className="h-4 w-4" />
                    Help
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-md rounded-xl shadow-lg border-slate-200">
                  <DialogHeader>
                    <DialogTitle className="text-xl">About Emma Ingredients</DialogTitle>
                    <DialogDescription className="text-slate-600">
                      {isAdmin 
                        ? "This page displays all ingredients from the emma_ingredients table in your Supabase database."
                        : "This page displays all ingredients available in the Emma collection."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-4">
                    {isAdmin ? (
                      <>
                        <h3 className="font-semibold text-slate-800">Troubleshooting Tips:</h3>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
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
                        <h3 className="font-semibold text-slate-800">Need help?</h3>
                        <p className="text-slate-600">
                          For more information about Emma ingredients or if you have any questions, please contact our support team:
                        </p>
                        <p className="pt-2">
                          <strong>Email:</strong> <a href="mailto:info@facultyofskin.com" className="text-blue-600 hover:underline">info@facultyofskin.com</a>
                        </p>
                        <p className="pt-4 text-sm text-slate-500">
                          Our team will respond to your inquiry as soon as possible.
                        </p>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-lg hover:translate-y-[-2px]">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mb-4 shadow-sm">
                <Leaf className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800">Texture Capsules</h3>
              <p className="text-slate-600 text-sm">
                The base formulation that determines the feel and consistency of the final product.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-lg hover:translate-y-[-2px]">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-4 shadow-sm">
                <Sparkles className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800">Active Capsules</h3>
              <p className="text-slate-600 text-sm">
                Concentrated active ingredients targeting specific skin concerns and conditions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-lg hover:translate-y-[-2px]">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center mb-4 shadow-sm">
                <Droplets className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800">Fragrance Capsules</h3>
              <p className="text-slate-600 text-sm">
                Optional scent additions to enhance the sensory experience of the product.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100 mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <List className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-slate-800">INCI Lists</span>
                <span className="text-sm text-slate-500">Full ingredient declarations</span>
              </div>
              
              <Separator orientation="vertical" className="h-6" />
              
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-slate-800">Ingredient Breakdowns</span>
                <span className="text-sm text-slate-500">Detailed composition information</span>
              </div>
            </div>
            
            <EmmaIngredientsSplit />
          </div>
          
          {!isLoading && !error && filteredIngredientsWithoutEquipment.length > 0 && (
            <div className="mb-12 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-1 rounded-xl shadow-md">
                <div className="relative rounded-xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"></div>
                  <div className="p-8 bg-white rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                        <FlaskConical className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">Formula Creator</h2>
                        <p className="text-slate-600">Mix and match capsules to visualize your custom product</p>
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
