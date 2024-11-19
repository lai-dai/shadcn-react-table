"use client"

import { type RowSelectionState } from "@tanstack/react-table"
import { useState } from "react"
import { BaseReactTable } from "~/components/tables/bases/base-react-table"
import { Persons100 } from "~/data/person-100"
import { type IPerson } from "~/lib/make-data"
import { columns } from "~/components/tables/columns"

export function ReactTableOriginDemo() {
  const [data] = useState<IPerson[]>(Persons100)
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
      className="max-h-[72vh] min-h-96"
    />
  )
}
