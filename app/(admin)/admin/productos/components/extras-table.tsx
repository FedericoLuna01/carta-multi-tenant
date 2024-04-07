import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatter } from "@/lib/utils";

interface ExtrasTableProps {
  data: {
    id: string;
    name: string;
    price: number;
  }[];
}

const ExtrasTable: React.FC<ExtrasTableProps> = ({ data }) => {
  return (
    <div className="flex justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline">
            Ver todos
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] sm:w-fit">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Precio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{formatter.format(item.price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ExtrasTable;
