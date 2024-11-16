'use client'

import { type RowSelectionState } from "@tanstack/react-table"
import { Edit2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { BaseTable } from "~/components/tables/base-table"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"

export default function HomePage() {
  const [
    rowSelection,
    setRowSelection,
  ] = useState<RowSelectionState>({
  })

  return (
    <div>
      <BaseTable
        columns={[
          {
            id: "select",
            header: ({ table }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={value =>
                  table.toggleAllPageRowsSelected(!!value)
                }
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
            maxSize: 33,
          },
          {
            header: "name",
            accessorKey: "name",
          },
          {
            header: "description",
            accessorKey: "description",
          },
          {
            header: "update at",
            accessorKey: "update_at",
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
            maxSize: 60,
          },
        ]}
        data={[
          {
            name: "name 1",
            description: "description 1",
            update_at: "10-2024",
          },
          {
            name: "name 2",
            description: "description 2",
            update_at: "11-2024",
          },
          {
            name: "name 3",
            description: "description 3",
            update_at: "12-2024",
          },
          {
            name: "name 4",
            description: "description 4",
            update_at: "5-2024",
          },
          {
            name: "name 1",
            description: "description 1",
            update_at: "10-2024",
          },
          {
            name: "name 2",
            description: "description 2",
            update_at: "11-2024",
          },
          {
            name: "name 3",
            description: "description 3",
            update_at: "12-2024",
          },
          {
            name: "name 4",
            description: "description 4",
            update_at: "5-2024",
          },
          {
            name: "name 1",
            description: "description 1",
            update_at: "10-2024",
          },
          {
            name: "name 2",
            description: "description 2",
            update_at: "11-2024",
          },
          {
            name: "name 3",
            description: "description 3",
            update_at: "12-2024",
          },
          {
            name: "name 4",
            description: "description 4",
            update_at: "5-2024",
          },
          {
            name: "name 1",
            description: "description 1",
            update_at: "10-2024",
          },
          {
            name: "name 2",
            description: "description 2",
            update_at: "11-2024",
          },
          {
            name: "name 3",
            description: "description 3",
            update_at: "12-2024",
          },
          {
            name: "name 4",
            description: "description 4",
            update_at: "5-2024",
          },
        ]}
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
    </div>
  )
}
