"use client"

import { type RowSelectionState } from "@tanstack/react-table"
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

export function ReactTableS03Demo() {
  const [data] = useState<IPerson[]>(Persons100)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  return (
    <div
      className={
        "max-h-[72vh] w-full overflow-auto rounded-md border border-table-border"
      }>
      <ReactTable
        columns={columns}
        data={data}
        initialState={{ columnPinning: { right: ["actions"] } }}
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}>
        <Table className={"text-sm"}>
          <TableHeader
            className={
              "sticky top-0 z-10 border-b bg-muted shadow-[0px_-3px_3px_-3px_hsl(var(--table-border))_inset]"
            }>
            <TableHeadGroup>
              <TableHead
                className={
                  "px-2 py-2 text-left align-middle font-medium data-[pinned=true]:bg-muted"
                }/>
            </TableHeadGroup>
          </TableHeader>

          <TableBody>
            <TableRow
              className={
                "group/tableRow border-b hover:bg-table-accent hover:text-table-accent-foreground data-[selected=true]:bg-muted"
              }>
              <TableCell
                className={
                  "px-2 py-1 align-middle group-hover/tableRow:border-table-secondary group-hover/tableRow:!bg-table-accent data-[pinned=true]:bg-background group-data-[selected=true]/tableRow:!bg-table-primary group-data-[selected=true]/tableRow:!text-table-primary-foreground"
                }/>
            </TableRow>
          </TableBody>
        </Table>
      </ReactTable>
    </div>
  )
}
