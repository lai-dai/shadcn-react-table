import { type Metadata } from "next"
import { ShadcnTableDemo } from "~/components/tables/shadcn-table"

export const metadata: Metadata = {
  title: "Shadcn Table",
}

export default function ShadcnTablePage() {
  return (
    <div className="p-3 md:px-6">
      <ShadcnTableDemo />
    </div>
  )
}
