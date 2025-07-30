import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "ama-:relative ama-:w-full ama-:rounded-lg ama-:border ama-:p-4 ama-:[&>svg~*]:pl-7 ama-:[&>svg+div]:translate-y-[-3px] ama-:[&>svg]:absolute ama-:[&>svg]:left-4 ama-:[&>svg]:top-4 ama-:[&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "ama-:bg-background ama-:text-foreground",
        destructive:
          "ama-:border-destructive/50 ama-:text-destructive ama-:dark:border-destructive ama-:[&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("ama-:mb-1 ama-:font-medium ama-:leading-none ama-:tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ama-:text-sm ama-:[&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
