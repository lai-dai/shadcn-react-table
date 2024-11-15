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

interface BaseTableProps<T extends RowData> {
  className?: string
  columns: ColumnDef<T>[]
  data: T[]
  ExpandedComponent?: ComponentProps<typeof TableExpandedRow>["children"]
  options?: Omit<TableOptions<T>, "data" | "columns" | "getCoreRowModel">
}

export function BaseTableStyle01<T>({
  className,
  columns,
  data,
  ExpandedComponent,
  options,
}: BaseTableProps<T>) {
  return (
    <div
      className={cn(
        "border-table-border w-full overflow-auto border",
        className,
      )}>
      <ReactTable data={data} columns={columns} options={options}>
        <Table className="bg-table text-table-foreground text-sm">
          <TableHeader className="bg-table border-table-border border-b">
            {headerGroup => (
              <TableHeaderRow headerGroup={headerGroup}>
                {header => (
                  <TableHead
                    header={header}
                    className={cn(
                      "border-table-border hover:bg-table-accent hover:text-table-accent-foreground h-8 px-2 py-1 text-left [&:not(:last-child)]:border-r",
                      header.column.getIsPinned() &&
                        "bg-table text-table-foreground",
                    )}
                  />
                )}
              </TableHeaderRow>
            )}
          </TableHeader>

          <TableBody className="border-table-border border-b">
            <TableRowsTrack>
              {row => (
                <Fragment>
                  <TableRow
                    row={row}
                    className="group/tableRow data-[selected=true]:bg-table-primary data-[selected=true]:text-table-primary-foreground even:bg-table-secondary hover:bg-table-accent hover:text-table-accent-foreground">
                    {cell => (
                      <TableCell
                        cell={cell}
                        className={cn(
                          "border-table-border h-8 px-2 py-1 align-middle [&:not(:last-child)]:border-r",
                          cell.column.getIsPinned() &&
                            "bg-table group-hover/tableRow:!bg-table-accent group-data-[selected=true]/tableRow:!bg-table-primary group-data-[even=true]/tableRow:bg-table-secondary",
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
