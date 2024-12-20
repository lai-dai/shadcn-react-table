"use client"

import {
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table"
import React from "react"
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

export default function ReactTableOriginDemo() {
  const [data] = React.useState<IPerson[]>(Persons100)
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

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
