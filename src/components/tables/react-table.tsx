"use client"

import { type ColumnDef, type RowSelectionState } from "@tanstack/react-table"
import { Edit2 } from "lucide-react"
import { useMemo, useState } from "react"
import { BaseTable } from "~/components/tables/base-table"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { makeData, type IPerson } from "~/lib/make-data"

export function ReactTableDemo() {
  const [data] = useState(() => makeData(100))
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
        header: "age",
        accessorKey: "age",
      },
      {
        header: "createdAt",
        accessorKey: "createdAt",
      },
      {
        header: "firstName",
        accessorKey: "firstName",
      },
      {
        header: "id",
        accessorKey: "id",
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
    <BaseTable
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
