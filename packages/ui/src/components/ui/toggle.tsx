import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "ama-:inline-flex ama-:items-center ama-:justify-center ama-:rounded-md ama-:text-sm ama-:font-medium ama-:ring-offset-background ama-:transition-colors ama-:hover:bg-muted ama-:hover:text-muted-foreground ama-:focus-visible:outline-none ama-:focus-visible:ring-2 ama-:focus-visible:ring-ring ama-:focus-visible:ring-offset-2 ama-:disabled:pointer-events-none ama-:disabled:opacity-50 ama-:data-[state=on]:bg-accent ama-:data-[state=on]:text-accent-foreground ama-:[&_svg]:pointer-events-none ama-:[&_svg]:size-4 ama-:[&_svg]:shrink-0 ama-:gap-2",
  {
    variants: {
      variant: {
        default: "ama-:bg-transparent",
        outline:
          "ama-:border ama-:border-input ama-:bg-transparent ama-:hover:bg-accent ama-:hover:text-accent-foreground",
      },
      size: {
        default: "ama-:h-10 ama-:px-3 ama-:min-w-10",
        sm: "ama-:h-9 ama-:px-2.5 ama-:min-w-9",
        lg: "ama-:h-11 ama-:px-5 ama-:min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
