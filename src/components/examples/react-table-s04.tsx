"use client"

import {
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table"
import { useState } from "react"
import { columns } from "~/components/tables/columns"
import {
  ReactTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeadGroup,
  TableRow,
} from "~/components/ui/react-table"
import { Persons100 } from "~/data/person-100"
import { type IPerson } from "~/lib/make-data"

export function ReactTableS04Demo() {
  const [data] = useState<IPerson[]>(Persons100)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: {
        right: ["actions"],
      },
    },
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    columns: columns,
    data: data,
  })

  return (
    <div className={"max-h-[72vh] w-full overflow-auto"}>
      <ReactTable table={table}>
        <Table>
          <TableHeader
            className={
              "sticky top-0 z-10 bg-background shadow-[0px_-3px_3px_-3px_hsl(var(--table-border))_inset] [&_tr]:border-b"
            }>
            <TableHeadGroup
              className={"group/TableHeadGroup border-b transition-colors"}>
              <TableHead
                className={
                  "h-10 px-2 text-left align-middle font-medium text-muted-foreground group-hover/TableHeadGroup:bg-muted/50 data-[pinned=true]:bg-background [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                }/>
            </TableHeadGroup>
          </TableHeader>

          <TableBody className={"[&_tr:last-child]:border-0"}>
            <TableRow
              className={
                "group/TableRow border-b transition-colors data-[state=selected]:bg-muted"
              }>
              <TableCell
                className={
                  "p-2 align-middle group-hover/TableRow:bg-muted/50 data-[pinned=true]:bg-background [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                }/>
            </TableRow>
          </TableBody>
        </Table>
      </ReactTable>
    </div>
  )
}
