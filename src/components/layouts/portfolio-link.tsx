import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"

export function PortfolioLink() {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={"https://laidai.xyz/"}
            target="_blank"
            className="text-xs hover:underline">
            By Daire
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>My Portfolio </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
