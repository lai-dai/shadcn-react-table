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

export function ReactTableS02Demo() {
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
    <div
      className={
        "max-h-[72vh] w-full overflow-auto rounded-md border border-table-border"
      }>
      <ReactTable table={table}>
        <Table className={"bg-table text-sm text-table-foreground"}>
          <TableHeader
            className={
              "sticky top-0 z-10 border-b bg-table shadow-[0px_-3px_3px_-3px_hsl(var(--table-border))_inset]"
            }>
            <TableHeadGroup>
              <TableHead
                className={
                  "border-r border-table-border px-2 py-1.5 text-left align-middle font-medium hover:!bg-table-accent hover:text-table-accent-foreground data-[pinned=true]:bg-table"
                }/>
            </TableHeadGroup>
          </TableHeader>

          <TableBody className={"border-b border-table-border"}>
            <TableRow
              className={
                "group/tableRow hover:bg-table-accent hover:text-table-accent-foreground data-[even=true]:bg-table-secondary data-[even=true]:text-table-secondary-foreground"
              }>
              <TableCell
                className={
                  "border-r border-table-border px-2 py-1 align-middle group-hover/tableRow:border-table-secondary group-hover/tableRow:!bg-table-accent data-[pinned=true]:bg-table group-data-[even=true]/tableRow:bg-table-secondary group-data-[selected=true]/tableRow:!bg-table-primary group-data-[selected=true]/tableRow:!text-table-primary-foreground"
                }/>
            </TableRow>
          </TableBody>
        </Table>
      </ReactTable>
    </div>
  )
}
