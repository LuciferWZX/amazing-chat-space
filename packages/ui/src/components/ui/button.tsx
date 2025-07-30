import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "ama-:inline-flex ama-:items-center ama-:justify-center ama-:gap-2 ama-:whitespace-nowrap ama-:rounded-md ama-:text-sm ama-:font-medium ama-:ring-offset-background ama-:transition-colors ama-:focus-visible:outline-none ama-:focus-visible:ring-2 ama-:focus-visible:ring-ring ama-:focus-visible:ring-offset-2 ama-:disabled:pointer-events-none ama-:disabled:opacity-50 ama-:[&_svg]:pointer-events-none ama-:[&_svg]:size-4 ama-:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "ama-:bg-primary ama-:text-primary-foreground ama-:hover:bg-primary/90",
        destructive:
          "ama-:bg-destructive ama-:text-destructive-foreground ama-:hover:bg-destructive/90",
        outline:
          "ama-:border ama-:border-input ama-:bg-background ama-:hover:bg-accent ama-:hover:text-accent-foreground",
        secondary:
          "ama-:bg-secondary ama-:text-secondary-foreground ama-:hover:bg-secondary/80",
        ghost: "ama-:hover:bg-accent ama-:hover:text-accent-foreground",
        link: "ama-:text-primary ama-:underline-offset-4 ama-:hover:underline",
      },
      size: {
        default: "ama-:h-10 ama-:px-4 ama-:py-2",
        sm: "ama-:h-9 ama-:rounded-md ama-:px-3",
        lg: "ama-:h-11 ama-:rounded-md ama-:px-8",
        icon: "ama-:h-10 ama-:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
