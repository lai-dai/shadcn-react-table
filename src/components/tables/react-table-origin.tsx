"use client"

import { type RowSelectionState } from "@tanstack/react-table"
import { useState } from "react"
import { BaseTableOrigin } from "~/components/tables/bases/base-table-origin"
import { Persons100 } from "~/data/person-100"
import { type IPerson } from "~/lib/make-data"
import { columns } from "./columns"

export function ReactTableOriginDemo() {
  const [data] = useState<IPerson[]>(Persons100)
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
      className="max-h-[72vh] min-h-96"
    />
  )
}
