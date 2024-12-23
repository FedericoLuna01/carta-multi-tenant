"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { es } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";

import CellAction from "./cell-action";
// import { StatusSelect } from "./status-select";
import { Button } from "@/components/ui/button";
import PopoverProducts from "./popover-products";
import BadgeOrderType from "./badge-order-type";
import BadgePaymentType from "./badge-payment-type";
// import PaymentStatusSelect from "./payment-status-select";
import { FullOrder } from "@/types/types";
import BadgePaymentStatus from "./badge-payment-status";
import BadgeOrderStatus from "./badge-order-status";

export const columns: ColumnDef<FullOrder>[] = [
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
      return (
        <BadgeOrderStatus orderStatus={row.original.status} />
        // <StatusSelect
        //   key={`${row.original.id}-${row.original.status}`}
        //   order={row.original}
        // />
      );
    },
  },
  {
    accessorKey: "payment",
    header: "Método de pago",
    cell: ({ row }) => {
      return (
        <BadgePaymentType order={row.original} />
      )
    }
  },
  {
    accessorKey: "paymentStatus",
    header: "Estado de pago",
    cell: ({ row }) => {
      return (
        <BadgePaymentStatus orderPaymentStatus={row.original.paymentStatus} />
        // <PaymentStatusSelect
        //   key={`${row.original.id}-${row.original.paymentStatus}`}
        //   order={row.original}
        // />
      );
    }
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
      const orderedAgo = formatDistanceToNowStrict(new Date(date), {
        locale: es,
        addSuffix: true,
      });
      return <p className="text-center">{orderedAgo}</p>;
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
