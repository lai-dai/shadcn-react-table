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

export function ReactTableS04Demo() {
  const [data] = useState<IPerson[]>(Persons100)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  return (
    <div className={"max-h-[72vh] w-full overflow-auto"}>
      <ReactTable
        columns={columns}
        data={data}
        initialState={{ columnPinning: { right: ["actions"] } }}
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}>
        <Table>
          <TableHeader
            className={
              "sticky top-0 z-10 bg-background shadow-[0px_-3px_3px_-3px_hsl(var(--table-border))_inset] [&_tr]:border-b"
            }>
            <TableHeadGroup
              className={"border-b transition-colors group/TableHeadGroup"}>
              <TableHead
                className={
                  "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] data-[pinned=true]:bg-background group-hover/TableHeadGroup:bg-muted/50"
                }/>
            </TableHeadGroup>
          </TableHeader>

          <TableBody className={"[&_tr:last-child]:border-0"}>
            <TableRow
              className={
                "border-b transition-colors data-[state=selected]:bg-muted group/TableRow"
              }>
              <TableCell
                className={
                  "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] data-[pinned=true]:bg-background group-hover/TableRow:bg-muted/50"
                }/>
            </TableRow>
          </TableBody>
        </Table>
      </ReactTable>
    </div>
  )
}
