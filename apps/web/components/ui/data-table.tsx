"use client";

import { useState, useCallback, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedUniqueValues,
  getFacetedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "./button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { statusOptions, typeOptions } from "@/data/data";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableFacetedFilter } from "@/app/(app)/dashboard/@user/ordenes/components/data-table-faceted-filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  visibility?: boolean;
  order?: boolean;
  pageCount?: number;
  onPaginationChange?: (page: number, pageSize: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  visibility = false,
  order = false,
  pageCount,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: Math.max(0, (parseInt(searchParams.get('page') ?? '1') - 1)),
    pageSize: parseInt(searchParams.get('pageSize') ?? '10'),
  });

  useEffect(() => {
    const newPage = parseInt(searchParams.get('page') ?? '1');
    const newPageSize = parseInt(searchParams.get('pageSize') ?? '10');

    setPagination({
      pageIndex: Math.max(0, newPage - 1),
      pageSize: newPageSize,
    });
  }, [searchParams]);

  const pagination = useCallback(
    (newPageIndex: number, newPageSize: number) => {
      setPagination({ pageIndex: newPageIndex, pageSize: newPageSize });
      onPaginationChange?.(newPageIndex + 1, newPageSize);
    },
    [onPaginationChange]
  );

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex, pageSize });
        pagination(newState.pageIndex, newState.pageSize);
      } else {
        pagination(updater.pageIndex, updater.pageSize);
      }
    },
    state: {
      columnFilters,
      sorting,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true,
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Buscar..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm mr-2 sm:mr-0"
          />
          {visibility && (
            <div className="hidden sm:flex space-x-2">
              {order && (
                <>
                  <DataTableFacetedFilter
                    column={table.getColumn("type")}
                    title="Tipo"
                    options={typeOptions}
                  />
                  <DataTableFacetedFilter
                    column={table.getColumn("status")}
                    title="Estado"
                    options={statusOptions}
                  />
                </>
              )}
              {isFiltered && (
                <Button
                  variant="ghost"
                  onClick={() => table.resetColumnFilters()}
                >
                  Limpiar filtros
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
        {visibility && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Columnas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ver columnas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="rounded-md border bg-white max-w-[calc(100vw-2em)] md:max-w-[calc(100vw-2em-220px)]
      lg:max-w-[calc(100vw-2em-280px)] overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
