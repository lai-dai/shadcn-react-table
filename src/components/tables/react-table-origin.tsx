"use client"

import { type ColumnDef, type RowSelectionState } from "@tanstack/react-table"
import { Edit2 } from "lucide-react"
import { useMemo, useState } from "react"
import { BaseTableOrigin } from "~/components/tables/bases/base-table-origin"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { Persons100 } from "~/data/person-100"
import { type IPerson } from "~/lib/make-data"
import { DateCell } from "./cells/date-cell"

export function OriginReactTableDemo() {
  const [data] = useState<IPerson[]>(Persons100)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns = useMemo<ColumnDef<IPerson>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-0.5"
          />
        ),
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={value => row.toggleSelected(!!value)}
              aria-label="Select row"
              className="translate-y-0.5"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        maxSize: 34,
      },
      {
        header: "id",
        accessorKey: "id",
        size: 50,
      },
      {
        header: "firstName",
        accessorKey: "firstName",
      },
      {
        header: "age",
        accessorKey: "age",
        size: 50,
      },
      {
        header: "lastName",
        accessorKey: "lastName",
      },
      {
        header: "progress",
        accessorKey: "progress",
      },
      {
        header: "status",
        accessorKey: "status",
      },
      {
        header: "visits",
        accessorKey: "visits",
      },
      {
        header: "createdAt",
        accessorKey: "createdAt",
        minSize: 250,
        cell: DateCell,
      },
      {
        id: "actions",
        header: "Act",
        cell: () => (
          <div className="flex justify-center">
            <Button size="icon" variant="ghost" className="size-7">
              <Edit2 />
            </Button>
          </div>
        ),
        maxSize: 45,
      },
    ],
    [],
  )

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
      className="max-h-[80vh] min-h-96"
    />
  )
}
