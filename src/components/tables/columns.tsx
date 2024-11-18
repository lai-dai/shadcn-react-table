import { type ColumnDef } from "@tanstack/react-table";
import { type IPerson } from "~/lib/make-data";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import { Edit2 } from "lucide-react";
import { DateCell } from "./cells/date-cell";

export const columns:ColumnDef<IPerson>[] = [
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
      maxSize: 32,
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
      header: "lastName",
      accessorKey: "lastName",
    },
    {
      header: "age",
      accessorKey: "age",
      size: 50,
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
  ]
