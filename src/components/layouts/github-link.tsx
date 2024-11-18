import { GitBranch } from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"

export function GithubLink() {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            referrerPolicy="no-referrer"
            target="_blank"
            href={"https://github.com/lai-dai/shadcn-react-table"}
            className="flex items-center text-sm">
            <GitBranch className="mr-1 size-3" /> main*
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>GitHub</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
