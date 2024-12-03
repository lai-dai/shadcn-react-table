import { format } from "date-fns"
import { Edit2 } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Persons100 } from "~/data/person-100"

export function ShadcnTableDemo() {
  return (
    <div className={"max-h-[72vh] min-h-96 w-full overflow-auto"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{"ID"}</TableHead>

            <TableHead>{"firstName"}</TableHead>

            <TableHead>{"lastName"}</TableHead>

            <TableHead>{"age"}</TableHead>

            <TableHead>{"progress"}</TableHead>

            <TableHead>{"status"}</TableHead>

            <TableHead>{"visits"}</TableHead>

            <TableHead>{"Act"}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Persons100.map(it => (
            <TableRow key={it.id}>
              <TableCell>{it.firstName}</TableCell>

              <TableCell>{it.lastName}</TableCell>

              <TableCell>{it.age}</TableCell>

              <TableCell>{it.progress}</TableCell>

              <TableCell>{it.status}</TableCell>

              <TableCell>{it.visits}</TableCell>

              <TableCell>
                {format(new Date(it.createdAt), "dd/MM/yyyy, HH:mm")}
              </TableCell>

              <TableCell>
                <div className={"flex justify-center"}>
                  <Button
                    className={"size-7"}
                    size={"icon"}
                    variant={"ghost"}>
                    <Edit2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
