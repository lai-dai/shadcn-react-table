import { type Metadata } from "next"
import { ReactTableS04Demo } from "~/components/examples/react-table-s04"

export const metadata: Metadata = {
  title: "React Table Style 01",
}

export default function Page() {
  return (
    <div className={"p-3 md:p-6"}>
      <ReactTableS04Demo />
    </div>
  )
}
