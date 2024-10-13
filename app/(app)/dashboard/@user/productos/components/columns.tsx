"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { formatter } from "@/lib/utils";
import { Subcategory } from "@prisma/client";
import CellAction from "./cell-action";
import ExtrasTable from "./extras-table";
import { FullProduct } from "@/types/types";

type ProductColumn = FullProduct & {
  subcategory: Subcategory;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "Imagen",
    header: "Imagen",
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        alt={row.original.name}
        width={150}
        height={150}
        className="rounded-md"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Nombre",
    enableHiding: false,
  },
  {
    accessorKey: "Descripción",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="max-w-[200px]">
        <p className="truncate">{row.original.description}</p>
      </div>
    ),
  },
  {
    accessorKey: "Subcategoría",
    header: () => <div>Subcategoría</div>,
    cell: ({ row }) => <p>{row.original.subcategory.name}</p>,
  },
  {
    accessorKey: "Extras",
    header: () => <div className=" text-center">Extras</div>,
    cell: ({ row }) => {
      if (!row.original.extras || row.original.extras.length <= 0)
        return <p className="text-center">-</p>;
      return <ExtrasTable data={row.original.extras} />;
    },
  },
  {
    accessorKey: "Tamaños",
    header: () => <div className=" text-center">Tamaños</div>,
    cell: ({ row }) => {
      if (!row.original.sizes || row.original.sizes.length <= 0)
        return <p className="text-center">-</p>;
      return <ExtrasTable data={row.original.sizes} />;
    },
  },
  {
    accessorKey: "Promo",
    header: () => <div className=" text-center">Promo</div>,
    cell: ({ row }) => (
      <p className=" text-center">{row.original.isPromo ? "Si" : "No"}</p>
    ),
  },
  {
    accessorKey: "Archivado",
    header: () => <div className=" text-center">Archivado</div>,
    cell: ({ row }) => (
      <p className=" text-center">{row.original.isArchived ? "Si" : "No"}</p>
    ),
  },
  {
    accessorKey: "Precio",
    header: "Precio",
    cell: ({ row }) => <p>{formatter.format(row.original.price)}</p>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
