"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { es } from "date-fns/locale";
import { formatRelative } from "date-fns";

import CellAction from "./cell-action";
import {
  OrderItem,
  Order,
  OrderItemSize,
  OrderItemExtra,
  Product,
} from "@prisma/client";
import { StatusSelect } from "./status-select";
import { Button } from "@/components/ui/button";
import PopoverProducts from "./popover-products";
import BadgeOrderType from "./badge-order-type";

export type SafeOrderItem = OrderItem & {
  size: OrderItemSize | null;
  extras: OrderItemExtra[] | null;
  product: Product;
};

export type OrderColumn = Order & {
  products: SafeOrderItem[];
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    enableHiding: false,
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "type",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: "Tipo",
    cell: ({ row }) => {
      return <BadgeOrderType type={row.original.type} />;
    },
  },
  {
    accessorKey: "place",
    header: "Ubicación",
    cell: ({ row }) => {
      const place = row.original.place;
      if (row.original.type === "TAKEAWAY") {
        return (
          <div className="truncate max-w-[150px] hover:visible hover:whitespace-normal hover:overflow-auto">
            Retiro en local
          </div>
        );
      }
      return (
        <div className="truncate max-w-[150px] hover:visible hover:whitespace-normal hover:overflow-auto">
          {place ? place : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "Comentario",
    cell: ({ row }) => {
      const comment = row.original.comment;
      return (
        <div className="truncate max-w-[150px] hover:visible hover:whitespace-normal hover:overflow-auto">
          {comment ? comment : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Productos",
    cell: ({ row }) => {
      return <PopoverProducts data={row.original.products} />;
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      return <StatusSelect order={row.original} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Horario
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const created = formatRelative(new Date(date), new Date(), {
        locale: es,
      });
      return <p className="text-center">{created}</p>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
