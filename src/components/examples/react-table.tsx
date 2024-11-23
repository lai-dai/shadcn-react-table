"use client"

import { type RowSelectionState } from "@tanstack/react-table"
import { useState } from "react"
import { Persons100 } from "~/data/person-100"
import { type IPerson } from "~/lib/make-data"
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

export default function ReactTableOriginDemo() {
  const [data] = useState<IPerson[]>(Persons100)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  return (
    <div
      className={
        "max-h-[72vh] min-h-96 w-full overflow-auto rounded-md border border-table-border"
      }>
      <ReactTable
        data={data}
        columns={columns}
        initialState={{
          columnPinning: {
            right: ["actions"],
          },
        }}
        state={{
          rowSelection,
        }}
        onRowSelectionChange={setRowSelection}>
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
