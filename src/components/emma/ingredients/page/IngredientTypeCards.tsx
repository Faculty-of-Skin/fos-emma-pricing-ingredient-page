
import React from "react";
import { Button } from "@/components/ui/button";
import { Leaf, Sparkles, Droplets, ChevronRight } from "lucide-react";

export const IngredientTypeCards: React.FC = () => {
  return (
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
  );
};
