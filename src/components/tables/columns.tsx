import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Edit2 } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { type IPerson } from "~/lib/make-data"

export const columns: ColumnDef<IPerson>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        aria-label={"Select all"}
        className={"translate-y-0.5"}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}/>
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={"Select row"}
        checked={row.getIsSelected()}
        className={"translate-y-0.5"}
        onCheckedChange={value => row.toggleSelected(!!value)}/>
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
    cell: ({ getValue }) =>
      format(new Date(getValue<string>()), "dd/MM/yyyy, HH:mm"),
  },
  {
    id: "actions",
    header: "Act",
    cell: () => (
      <div className={"flex justify-center"}>
        <Button
          className={"size-7"}
          size={"icon"}
          variant={"ghost"}>
          <Edit2 />
        </Button>
      </div>
    ),
    maxSize: 45,
  },
]
