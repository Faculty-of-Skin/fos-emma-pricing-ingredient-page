
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const EmmaAccessoriesPricing = () => {
  const accessoriesData = [
    {
      category: "Accessories",
      reference: "AA020",
      description: "Reusable bottle",
      importer: 3.78,
      distributor: 4.00,
      beautyInstitute: 5.00,
      finalConsumer: "NA"
    },
    {
      category: "Face capsule",
      reference: "C1FA2",
      description: "Texture - Light emulsion",
      importer: 2.75,
      distributor: 3.88,
      beautyInstitute: 6.46,
      finalConsumer: 13.97
    },
    {
      category: "Face capsule",
      reference: "C1FA3",
      description: "Texture - Gentle cream",
      importer: 2.75,
      distributor: 3.88,
      beautyInstitute: 6.46,
      finalConsumer: 13.97
    },
    {
      category: "Face capsule",
      reference: "C1FA4",
      description: "Texture - Rich cream",
      importer: 2.75,
      distributor: 3.88,
      beautyInstitute: 6.46,
      finalConsumer: 13.97
    },
    {
      category: "Face capsule",
      reference: "C1FA6",
      description: "Texture - Serum (gel)",
      importer: 2.75,
      distributor: 3.88,
      beautyInstitute: 6.46,
      finalConsumer: 13.97
    },
    {
      category: "Face capsule",
      reference: "C1FA7",
      description: "Texture - Gel-cream",
      importer: 2.75,
      distributor: 3.88,
      beautyInstitute: 6.46,
      finalConsumer: 13.97
    }
  ];
  
  const volumeData = {
    importer: 500,
    distributor: 50,
    beautyInstitute: 5
  };

  return (
    <div className="brutal-card">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Consumables & Accessories</h2>
        <p className="text-brutal-charcoal font-mono uppercase text-sm mt-2">Pricing Without Tax (EUR)</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono uppercase text-brutal-black">Category</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black">Reference</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black">Description</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Importer
                <div className="font-mono text-xs text-brutal-gray mt-1">(Without tax) MOQ: {volumeData.importer}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Distributor
                <div className="font-mono text-xs text-brutal-gray mt-1">(Without tax) MOQ: {volumeData.distributor}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Beauty Institute
                <div className="font-mono text-xs text-brutal-gray mt-1">(Without tax) MOQ: {volumeData.beautyInstitute}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Final Consumer
                <div className="font-mono text-xs text-brutal-gray mt-1">(Without tax)</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accessoriesData.map((item, index) => (
              <TableRow key={index} className={`border-t-2 border-brutal-black/30 hover:bg-brutal-white/80 ${
                index > 0 && item.category !== accessoriesData[index - 1].category ? 'border-t-4 border-brutal-black pt-4' : ''
              }`}>
                <TableCell className="font-mono font-medium">{item.category}</TableCell>
                <TableCell className="font-mono">{item.reference}</TableCell>
                <TableCell className="font-mono">{item.description}</TableCell>
                <TableCell className="font-mono text-right">€{item.importer.toFixed(2)}</TableCell>
                <TableCell className="font-mono text-right">€{item.distributor.toFixed(2)}</TableCell>
                <TableCell className="font-mono text-right">€{item.beautyInstitute.toFixed(2)}</TableCell>
                <TableCell className="font-mono text-right">
                  {item.finalConsumer === "NA" ? "NA" : `€${Number(item.finalConsumer).toFixed(2)}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        <div className="brutal-card border-2 bg-brutal-white/70">
          <h3 className="font-mono uppercase text-brutal-black font-bold mb-3">MOQ Information</h3>
          <p className="font-mono text-sm text-brutal-charcoal">
            MOQ (Minimum Order Quantity) varies by buyer type:
          </p>
          <ul className="mt-2 space-y-1">
            <li className="font-mono text-sm">Importer: {volumeData.importer} units</li>
            <li className="font-mono text-sm">Distributor: {volumeData.distributor} units</li>
            <li className="font-mono text-sm">Beauty Institute: {volumeData.beautyInstitute} units</li>
          </ul>
        </div>
        
        <div className="brutal-card border-2 bg-brutal-white/70">
          <h3 className="font-mono uppercase text-brutal-black font-bold mb-3">Ordering Information</h3>
          <p className="font-mono text-sm text-brutal-charcoal">
            For bulk orders and distributor pricing, please contact our sales team directly.
            Custom packaging and branding options are available for distributors and importers.
          </p>
        </div>
      </div>
    </div>
  );
};
