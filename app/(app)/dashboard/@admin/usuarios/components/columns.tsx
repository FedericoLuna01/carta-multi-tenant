"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { UserNoPass } from "@/types/types";

export const columns: ColumnDef<UserNoPass>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => {
      return row.getValue("role") === "ADMIN" ? "Administrador" : "Usuario";
    },
  },
  {
    accessorKey: "slug",
    header: "Link",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
