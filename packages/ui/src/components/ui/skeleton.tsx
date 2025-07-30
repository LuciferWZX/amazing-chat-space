import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("ama-:animate-pulse ama-:rounded-md ama-:bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
