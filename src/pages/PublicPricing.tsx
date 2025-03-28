
import { Navigation } from "@/components/Navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CurrencySelector } from "@/components/emma/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Search } from "lucide-react";

type Product = {
  id: string;
  category: string;
  reference: string;
  description: string;
  beauty_institute_price: number;
  final_consumer_price: number | null;
};

const PublicPricing = () => {
  const { convertPrice, formatPrice } = useCurrency();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("category")
          .order("reference");
        
        if (error) {
          console.error("Error fetching products:", error);
          return;
        }
        
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Get unique categories for tabs
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group products by category for display
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="min-h-screen bg-brutal-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-brutal-black mb-4 font-mono uppercase tracking-tight">
              Emuage Product Pricing
            </h1>
            <p className="text-lg text-brutal-charcoal font-mono uppercase tracking-wide mb-6 max-w-3xl mx-auto">
              Advanced facial and body treatment solutions for beauty professionals
            </p>
            <div className="flex justify-center mt-4">
              <CurrencySelector />
            </div>
          </div>
          
          {/* Search and filter */}
          <div className="mb-8">
            <div className="relative w-full max-w-md mx-auto mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brutal-charcoal" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="brutal-input pl-10 w-full"
              />
            </div>
            
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="flex flex-wrap justify-center gap-2 mb-6 bg-transparent">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="border-2 border-brutal-black data-[state=active]:bg-brutal-black data-[state=active]:text-brutal-white"
                  >
                    {category === 'all' ? 'All Products' : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <Card className="brutal-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-brutal-black font-mono uppercase">
                Public Pricing Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-mono uppercase text-brutal-black">Category</TableHead>
                      <TableHead className="font-mono uppercase text-brutal-black">Reference</TableHead>
                      <TableHead className="font-mono uppercase text-brutal-black">Description</TableHead>
                      <TableHead className="font-mono uppercase text-brutal-black text-right">
                        Beauty Institute Price
                      </TableHead>
                      <TableHead className="font-mono uppercase text-brutal-black text-right">
                        Suggested Retail Price
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">Loading product data...</TableCell>
                      </TableRow>
                    ) : filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">No products found</TableCell>
                      </TableRow>
                    ) : (
                      Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                        <>
                          <TableRow key={category} className="bg-brutal-white/60">
                            <TableCell colSpan={5} className="font-mono font-bold uppercase text-brutal-black">
                              {category}
                            </TableCell>
                          </TableRow>
                          {categoryProducts.map((product, index) => (
                            <TableRow key={product.id} className="border-t border-brutal-black/20 hover:bg-brutal-white/80">
                              <TableCell className="font-mono font-medium">{product.category}</TableCell>
                              <TableCell className="font-mono">{product.reference}</TableCell>
                              <TableCell className="font-mono">{product.description}</TableCell>
                              <TableCell className="font-mono text-right">
                                {formatPrice(convertPrice(product.beauty_institute_price))}
                              </TableCell>
                              <TableCell className="font-mono text-right">
                                {product.final_consumer_price 
                                  ? formatPrice(convertPrice(product.final_consumer_price))
                                  : "N/A"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="brutal-card">
              <CardHeader>
                <CardTitle className="text-xl font-black text-brutal-black font-mono uppercase">
                  About Emuage Devices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-brutal-charcoal mb-4">
                  The Emuage device is a professional beauty technology that provides customized skincare 
                  treatments for both face and body applications.
                </p>
                <p className="font-mono text-brutal-charcoal">
                  Each machine is designed for professional use in beauty institutes and spas,
                  offering versatile treatment options through interchangeable capsules.
                </p>
              </CardContent>
            </Card>
            
            <Card className="brutal-card">
              <CardHeader>
                <CardTitle className="text-xl font-black text-brutal-black font-mono uppercase">
                  About Capsules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-brutal-charcoal mb-4">
                  Our capsules are categorized by application (Face or Body) and feature type (Texture, Active ingredients, or Perfume).
                </p>
                <p className="font-mono text-brutal-charcoal">
                  Each capsule is designed to provide specific benefits, from moisturizing and anti-aging treatments
                  to specialized solutions for skin concerns.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 flex items-start gap-4 text-sm border-t-2 border-brutal-black/20 pt-8">
            <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-brutal-charcoal" />
            <p className="font-mono text-brutal-charcoal">
              Pricing information is provided for reference only. Beauty institute prices are available for registered professionals.
              Suggested retail prices indicate recommended pricing for end consumers. For detailed information, bulk pricing,
              or to place an order, please contact our sales team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPricing;
