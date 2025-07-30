import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "ama-:peer ama-:inline-flex ama-:h-6 ama-:w-11 ama-:shrink-0 ama-:cursor-pointer ama-:items-center ama-:rounded-full ama-:border-2 ama-:border-transparent ama-:transition-colors ama-:focus-visible:outline-none ama-:focus-visible:ring-2 ama-:focus-visible:ring-ring ama-:focus-visible:ring-offset-2 ama-:focus-visible:ring-offset-background ama-:disabled:cursor-not-allowed ama-:disabled:opacity-50 ama-:data-[state=checked]:bg-primary ama-:data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "ama-:pointer-events-none ama-:block ama-:h-5 ama-:w-5 ama-:rounded-full ama-:bg-background ama-:shadow-lg ama-:ring-0 ama-:transition-transform ama-:data-[state=checked]:translate-x-5 ama-:data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
