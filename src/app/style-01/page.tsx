import { type Metadata } from "next"
import { MyReactTableDemo } from "~/components/tables/react-table-style-01"

export const metadata: Metadata = {
  title: "React Table Style 01",
}

export default function Page() {
  return (
    <div className="p-3 md:p-6">
      <MyReactTableDemo />
    </div>
  )
}
