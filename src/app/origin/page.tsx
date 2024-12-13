import { type Metadata } from "next"
import ReactTableOriginDemo from "~/components/examples/react-table"

export const metadata: Metadata = {
  title: "React Table",
}

export default function Page() {
  return (
    <div className={"p-3 md:p-6"}>
      <ReactTableOriginDemo />
    </div>
  )
}
