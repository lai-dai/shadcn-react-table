import { type Metadata } from "next"
import { ReactTableS02Demo } from "~/components/examples/react-table-s02"

export const metadata: Metadata = {
  title: "React Table Style 01",
}

export default function Page() {
  return (
    <div className={"p-3 md:p-6"}>
      <ReactTableS02Demo />
    </div>
  )
}
