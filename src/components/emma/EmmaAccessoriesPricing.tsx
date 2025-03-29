
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAccessoriesData } from "./accessories/useAccessoriesData";
import { AccessoriesTable } from "./accessories/AccessoriesTable";
import { AccessoriesError } from "./accessories/AccessoriesError";
import { AccessoriesInfo } from "./accessories/AccessoriesInfo";

export const EmmaAccessoriesPricing = () => {
  const { accessoriesData, isLoading, error, fetchAccessories, beautyInstituteData } = useAccessoriesData();

  const handleRefresh = () => {
    fetchAccessories();
  };

  return (
    <div className="brutal-card">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Consumables & Accessories</h2>
        <p className="text-brutal-charcoal font-mono uppercase text-sm mt-2">Pricing Without Tax</p>
      </div>
      
      <AccessoriesError error={error} onRefresh={handleRefresh} />
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono uppercase text-brutal-black">Category</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black">Reference</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black">Description</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Beauty Institute
                <div className="font-mono text-xs text-brutal-gray mt-1">(Without tax) MOQ: {beautyInstituteData.moq}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Final Consumer
                <div className="font-mono text-xs text-brutal-gray mt-1">(Without tax)</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AccessoriesTable 
              accessories={accessoriesData}
              isLoading={isLoading}
              onRefresh={handleRefresh}
            />
          </TableBody>
        </Table>
      </div>
      
      <AccessoriesInfo moq={beautyInstituteData.moq} />
    </div>
  );
};
