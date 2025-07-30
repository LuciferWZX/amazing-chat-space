import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "ama-:flex ama-:h-10 ama-:w-full ama-:rounded-md ama-:border ama-:border-input ama-:bg-background ama-:px-3 ama-:py-2 ama-:text-base ama-:ring-offset-background ama-:file:border-0 ama-:file:bg-transparent ama-:file:text-sm ama-:file:font-medium ama-:file:text-foreground ama-:placeholder:text-muted-foreground ama-:focus-visible:outline-none ama-:focus-visible:ring-2 ama-:focus-visible:ring-ring ama-:focus-visible:ring-offset-2 ama-:disabled:cursor-not-allowed ama-:disabled:opacity-50 ama-:md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
