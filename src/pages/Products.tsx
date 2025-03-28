
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
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
import { Loader2, Plus, Filter, Search, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/context/CurrencyContext";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Product = {
  id: string;
  reference: string;
  description: string;
  category: string;
  importer_price: number;
  distributor_price: number;
  beauty_institute_price: number;
  final_consumer_price: number | null;
  importer_moq: number;
  distributor_moq: number;
  beauty_institute_moq: number;
  created_at: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const { formatPrice, convertPrice } = useCurrency();

  // Get unique categories for filter
  const categories = ["all", ...new Set(products.map(product => product.category))].sort();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("category", { ascending: true })
          .order("reference", { ascending: true });

        if (error) throw error;
        setProducts(data || []);
        setFilteredProducts(data || []);
      } catch (error: any) {
        console.error("Error fetching products:", error);
        
        // Handle recursive policy error specifically
        if (error.message?.includes("infinite recursion detected")) {
          setError("There's an issue with access permissions. Please try refreshing the page or contact support if the issue persists.");
        } else {
          setError(error.message || "Failed to load products");
          toast({
            title: "Error fetching products",
            description: error.message || "Failed to load products",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  // Filter products based on category and search query
  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.reference.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [categoryFilter, searchQuery, products]);

  if (error) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          
          <div className="brutal-card p-8 text-center">
            <p className="text-brutal-gray mb-4">
              We're having trouble retrieving product data. This may be due to a temporary issue with access permissions.
            </p>
            <Button 
              className="brutal-button" 
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          {isAdmin && (
            <Button className="brutal-button" asChild>
              <a href="/admin/products/new">
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </a>
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference or description..."
                className="pl-8 brutal-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full sm:w-64">
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="brutal-select">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="brutal-card p-8 text-center">
            <p className="text-brutal-gray mb-4">
              {products.length === 0 
                ? "No products have been added yet." 
                : "No products match your filter criteria."}
            </p>
            {isAdmin && products.length === 0 && (
              <Button className="brutal-button" asChild>
                <a href="/admin/products/new">Add First Product</a>
              </Button>
            )}
          </div>
        ) : (
          <div className="brutal-card p-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-mono uppercase">Reference</TableHead>
                  <TableHead className="font-mono uppercase">Description</TableHead>
                  <TableHead className="font-mono uppercase">Category</TableHead>
                  <TableHead className="font-mono uppercase text-right">Importer</TableHead>
                  <TableHead className="font-mono uppercase text-right">Distributor</TableHead>
                  <TableHead className="font-mono uppercase text-right">Beauty Institute</TableHead>
                  {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => {
                  // Add visual separators between different categories
                  const prevProduct = index > 0 ? filteredProducts[index - 1] : null;
                  const isNewCategory = prevProduct && prevProduct.category !== product.category;

                  return (
                    <TableRow 
                      key={product.id}
                      className={`${isNewCategory ? 'border-t-4 border-brutal-black' : ''} hover:bg-brutal-white/50`}
                    >
                      <TableCell className="font-medium font-mono">{product.reference}</TableCell>
                      <TableCell className="font-mono">{product.description}</TableCell>
                      <TableCell className="font-mono">{product.category}</TableCell>
                      <TableCell className="font-mono text-right">
                        {formatPrice(convertPrice(product.importer_price))}
                        <div className="text-xs text-brutal-gray">MOQ: {product.importer_moq}</div>
                      </TableCell>
                      <TableCell className="font-mono text-right">
                        {formatPrice(convertPrice(product.distributor_price))}
                        <div className="text-xs text-brutal-gray">MOQ: {product.distributor_moq}</div>
                      </TableCell>
                      <TableCell className="font-mono text-right">
                        {formatPrice(convertPrice(product.beauty_institute_price))}
                        <div className="text-xs text-brutal-gray">MOQ: {product.beauty_institute_moq}</div>
                      </TableCell>
                      {isAdmin && (
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/admin/products/${product.id}`}>Edit</a>
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-6 text-center text-brutal-gray">
          <p>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} 
            {categoryFilter !== "all" ? ` in ${categoryFilter}` : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Products;
