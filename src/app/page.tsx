import { type Metadata } from "next"
import { ReactTableDemo } from "~/components/tables/react-table"

export const metadata: Metadata = {
  title: "React Table",
}

export default function Page() {
  return (
    <div className="p-3 md:px-6">
      <ReactTableDemo />
    </div>
  )
}
