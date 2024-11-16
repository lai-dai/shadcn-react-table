import { type CellContext } from "@tanstack/react-table"
import { format } from "date-fns"

export function DateCell<T>({ getValue }: CellContext<T, unknown>) {
  return format(new Date(getValue<string>()), "dd/MM/yyyy, HH:mm")
}
