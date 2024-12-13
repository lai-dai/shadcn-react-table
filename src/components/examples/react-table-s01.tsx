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
import { cn } from "~/lib/utils"

export function ReactTableS01Demo() {
  const [data] = useState(Persons100)
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
    columns: columns,
    data: data,
    onRowSelectionChange: setRowSelection,
  })

  return (
    <div className={cn("max-h-[72vh] w-full overflow-auto")}>
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
