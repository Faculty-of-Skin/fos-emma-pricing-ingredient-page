
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info } from "lucide-react";

export const EmmaEquipmentPricing = () => {
  const equipmentData = [
    {
      reference: "AE101",
      description: "Emma machine pack",
      importer: 590.00,
      distributor: 825.00,
      beautyInstitute: 1150.00,
      finalConsumer: "NA",
    }
  ];
  
  const volumeData = {
    importer: 400,
    distributor: 20,
    beautyInstitute: 1
  };

  return (
    <div className="brutal-card">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Equipment</h2>
        <p className="text-brutal-charcoal font-mono uppercase text-sm mt-2">Emma Machine Pricing (EUR)</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono uppercase text-brutal-black">Reference</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black">Description</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Importer
                <div className="font-mono text-xs text-brutal-gray mt-1">MOQ: {volumeData.importer}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Distributor
                <div className="font-mono text-xs text-brutal-gray mt-1">MOQ: {volumeData.distributor}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Beauty Institute
                <div className="font-mono text-xs text-brutal-gray mt-1">MOQ: {volumeData.beautyInstitute}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">Final Consumer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipmentData.map((item, index) => (
              <TableRow key={index} className="border-t-2 border-brutal-black hover:bg-brutal-white/80">
                <TableCell className="font-mono font-medium">{item.reference}</TableCell>
                <TableCell className="font-mono">{item.description}</TableCell>
                <TableCell className="font-mono text-right">€{item.importer.toFixed(2)}</TableCell>
                <TableCell className="font-mono text-right">€{item.distributor.toFixed(2)}</TableCell>
                <TableCell className="font-mono text-right">€{item.beautyInstitute.toFixed(2)}</TableCell>
                <TableCell className="font-mono text-right">{item.finalConsumer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-6 flex items-start gap-2 text-sm text-brutal-charcoal">
        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <p className="font-mono">
          Pricing is provided in EUR. The Emma machine pack includes the main device and standard accessories.
          Contact us for detailed specifications and bulk order inquiries.
        </p>
      </div>
    </div>
  );
};
