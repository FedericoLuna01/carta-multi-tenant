"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Subcategory } from "@prisma/client";

export const columns: ColumnDef<Subcategory>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "category.name",
    header: "Categoría",
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
