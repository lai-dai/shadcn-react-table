"use client"

import { type RowSelectionState } from "@tanstack/react-table"
import { useState } from "react"
import { Persons100 } from "~/data/person-100"
import { columns } from "~/components/tables/columns"
import { BaseReactTable } from "~/components/tables/bases/base-react-table"

export function ReactTableS01Demo() {
  const [data] = useState(Persons100)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  return (
    <BaseReactTable
      columns={columns}
      data={data}
      options={{
        initialState: {
          columnPinning: {
            right: ["actions"],
          },
        },
        state: {
          rowSelection,
        },
        onRowSelectionChange: setRowSelection,
      }}
      className="max-h-[72vh] min-h-96 style-01 rounded-none"
    />
  )
}
