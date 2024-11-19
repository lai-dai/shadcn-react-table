import { type Metadata } from "next"
import { ReactTableS01Demo } from "~/components/tables/examples/react-table-s01"

export const metadata: Metadata = {
  title: "React Table Style 01",
}

export default function Page() {
  return (
    <div className="p-3 md:p-6">
      <ReactTableS01Demo />
    </div>
  )
}
