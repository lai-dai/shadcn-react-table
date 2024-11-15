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
    <div className={cn("w-full overflow-auto border rounded-md", className)}>
      <ReactTable data={data} columns={columns} options={options}>
        <Table className="bg-background">
          <TableHeader className="border-b">
            {headerGroup => (
              <TableHeaderRow headerGroup={headerGroup}>
                {header => (
                  <TableHead
                    header={header}
                    className={cn(
                      "[&:not(:last-child)]:border-r",
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
                          "[&:not(:last-child)]:border-r",
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
