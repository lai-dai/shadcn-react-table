"use client"

import { type RowSelectionState } from "@tanstack/react-table"
import { useState } from "react"
import { Persons100 } from "~/data/person-100"
import { columns } from "./columns"
import { BaseTableOrigin } from "./bases/base-table-origin"

export function ReactTableStyle01Demo() {
  const [data] = useState(Persons100)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  return (
    <BaseTableOrigin
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
