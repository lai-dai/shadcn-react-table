import { type Metadata } from "next"
import { OriginReactTableDemo } from "~/components/tables/react-table-origin"

export const metadata: Metadata = {
  title: "React Table Style 01",
}

export default function Page() {
  return (
    <div className="p-3 md:p-6">
      <OriginReactTableDemo />
    </div>
  )
}
