import { type Metadata } from "next"
import { ReactTableOriginDemo } from "~/components/tables/examples/react-table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Shadcn React Table",
}

export default function Page() {
  return (
    <div className="space-y-6 p-3 md:p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="opacity-75">Doc</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>React Table</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ReactTableOriginDemo />
    </div>
  )
}
