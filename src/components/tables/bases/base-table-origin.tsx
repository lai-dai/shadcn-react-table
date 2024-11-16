"use client"

import { type ComponentProps, Fragment } from "react"

import {
  type RowData,
  type ColumnDef,
  type TableOptions,
} from "@tanstack/react-table"

import {
  ReactTable,
  Table,
  TableBody,
  TableCell,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableRow,
  TableRowsTrack,
} from "~/components/ui/react-table"

import { cn } from "~/lib/utils"

interface BaseOriginTableProps<T extends RowData> {
  className?: string
  columns: ColumnDef<T>[]
  data: T[]
  ExpandedComponent?: ComponentProps<typeof TableExpandedRow>["children"]
  options?: Omit<TableOptions<T>, "data" | "columns" | "getCoreRowModel">
}

export function BaseTableOrigin<T>({
  className,
  columns,
  data,
  ExpandedComponent,
  options,
}: BaseOriginTableProps<T>) {
  return (
    <div className={cn("w-full overflow-auto rounded-md border", className)}>
      <ReactTable data={data} columns={columns} options={options}>
        <Table className="bg-background">
          <TableHeader className="sticky top-0 z-10 border-b bg-background shadow-[0px_-3px_3px_-3px_hsl(var(--table-border))_inset]">
            {headerGroup => (
              <TableHeaderRow headerGroup={headerGroup}>
                {header => (
                  <TableHead
                    header={header}
                    className={cn(
                      "border-r",
                      header.column.getIsPinned() &&
                        "bg-background text-foreground",
                    )}
                  />
                )}
              </TableHeaderRow>
            )}
          </TableHeader>

          <TableBody className="border-b">
            <TableRowsTrack>
              {row => (
                <Fragment>
                  <TableRow row={row}>
                    {cell => (
                      <TableCell
                        cell={cell}
                        className={cn(
                          "border-r",
                          cell.column.getIsPinned() && "bg-background",
                        )}
                      />
                    )}
                  </TableRow>

                  <TableExpandedRow row={row}>
                    {ExpandedComponent}
                  </TableExpandedRow>
                </Fragment>
              )}
            </TableRowsTrack>
          </TableBody>
        </Table>
      </ReactTable>
    </div>
  )
}
