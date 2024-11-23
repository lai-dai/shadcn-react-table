"use client"

import { type RowData } from "@tanstack/react-table"

import {
  ReactTable,
  type ReactTableProps,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeadGroup,
  TableRow,
} from "~/components/ui/react-table"

import { cn } from "~/lib/utils"

interface BaseOriginTableProps<T extends RowData> extends ReactTableProps<T> {
  className?: string
}

export function BaseReactTable<T>({
  className,
  ...props
}: BaseOriginTableProps<T>) {
  return (
    <div
      className={cn(
        "w-full overflow-auto rounded-md border border-table-border",
        className,
      )}>
      <ReactTable {...props}>
        <Table>
          <TableHeader>
            <TableHeadGroup>
              <TableHead />
            </TableHeadGroup>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </ReactTable>
    </div>
  )
}
