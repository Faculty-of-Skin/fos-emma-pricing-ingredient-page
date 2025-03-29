
import {
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";

export const ProductsTableHeader = () => {
  const { isAdmin } = useAuth();

  return (
    <TableHeader>
      <TableRow className="border-b-2 border-brutal-black/30">
        <TableHead className="font-mono uppercase text-brutal-black w-1/6">Reference</TableHead>
        <TableHead className="font-mono uppercase text-brutal-black w-2/5">Description</TableHead>
        <TableHead className="font-mono uppercase text-brutal-black text-right w-1/6">
          Beauty Institute Price
        </TableHead>
        <TableHead className="font-mono uppercase text-brutal-black text-right w-1/6">
          MOQ
        </TableHead>
        {isAdmin && <TableHead className="text-right w-1/6">Actions</TableHead>}
      </TableRow>
    </TableHeader>
  );
};
