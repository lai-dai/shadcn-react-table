import { type Metadata } from "next"
import { ShadcnTableDemo } from "~/components/tables/table-shadcn"

export const metadata: Metadata = {
  title: "Shadcn Table",
}

export default function ShadcnTablePage() {
  return (
    <div className="p-3 md:p-6">
      <ShadcnTableDemo />
    </div>
  )
}
