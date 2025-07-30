"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "ama-:relative ama-:h-4 ama-:w-full ama-:overflow-hidden ama-:rounded-full ama-:bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="ama-:h-full ama-:w-full ama-:flex-1 ama-:bg-primary ama-:transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
