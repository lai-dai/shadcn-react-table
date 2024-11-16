"use client"

import { type ColumnDef, type RowSelectionState } from "@tanstack/react-table"
import { Edit2 } from "lucide-react"
import { useMemo, useState } from "react"
import { BaseTableStyle01 } from "~/components/tables/bases/base-table-style-01"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { makeData, type IPerson } from "~/lib/make-data"

export function MyReactTableDemo() {
  const [data] = useState(() => makeData(10))
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
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5"
          />
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
      },
      {
        id: "actions",
        header: "Act",
        cell: () => (
          <div>
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
    <BaseTableStyle01
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
    />
  )
}
