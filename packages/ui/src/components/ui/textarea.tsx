import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "ama-:flex ama-:min-h-[80px] ama-:w-full ama-:rounded-md ama-:border ama-:border-input ama-:bg-background ama-:px-3 ama-:py-2 ama-:text-base ama-:ring-offset-background ama-:placeholder:text-muted-foreground ama-:focus-visible:outline-none ama-:focus-visible:ring-2 ama-:focus-visible:ring-ring ama-:focus-visible:ring-offset-2 ama-:disabled:cursor-not-allowed ama-:disabled:opacity-50 ama-:md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
