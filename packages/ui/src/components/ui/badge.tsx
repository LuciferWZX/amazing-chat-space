import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "ama-:inline-flex ama-:items-center ama-:rounded-full ama-:border ama-:px-2.5 ama-:py-0.5 ama-:text-xs ama-:font-semibold ama-:transition-colors ama-:focus:outline-none ama-:focus:ring-2 ama-:focus:ring-ring ama-:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "ama-:border-transparent ama-:bg-primary ama-:text-primary-foreground ama-:hover:bg-primary/80",
        secondary:
          "ama-:border-transparent ama-:bg-secondary ama-:text-secondary-foreground ama-:hover:bg-secondary/80",
        destructive:
          "ama-:border-transparent ama-:bg-destructive ama-:text-destructive-foreground ama-:hover:bg-destructive/80",
        outline: "ama-:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
