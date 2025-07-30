import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "ama-:peer ama-:h-4 ama-:w-4 ama-:shrink-0 ama-:rounded-sm ama-:border ama-:border-primary ama-:ring-offset-background ama-:focus-visible:outline-none ama-:focus-visible:ring-2 ama-:focus-visible:ring-ring ama-:focus-visible:ring-offset-2 ama-:disabled:cursor-not-allowed ama-:disabled:opacity-50 ama-:data-[state=checked]:bg-primary ama-:data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("ama-:flex ama-:items-center ama-:justify-center ama-:text-current")}
    >
      <Check className="ama-:h-4 ama-:w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
