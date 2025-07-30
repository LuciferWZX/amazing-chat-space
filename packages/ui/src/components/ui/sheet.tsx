"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "ama-:fixed ama-:inset-0 ama-:z-50 ama-:bg-black/80 ama-: ama-:data-[state=open]:animate-in ama-:data-[state=closed]:animate-out ama-:data-[state=closed]:fade-out-0 ama-:data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "ama-:fixed ama-:z-50 ama-:gap-4 ama-:bg-background ama-:p-6 ama-:shadow-lg ama-:transition ama-:ease-in-out ama-:data-[state=open]:animate-in ama-:data-[state=closed]:animate-out ama-:data-[state=closed]:duration-300 ama-:data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "ama-:inset-x-0 ama-:top-0 ama-:border-b ama-:data-[state=closed]:slide-out-to-top ama-:data-[state=open]:slide-in-from-top",
        bottom:
          "ama-:inset-x-0 ama-:bottom-0 ama-:border-t ama-:data-[state=closed]:slide-out-to-bottom ama-:data-[state=open]:slide-in-from-bottom",
        left: "ama-:inset-y-0 ama-:left-0 ama-:h-full ama-:w-3/4 ama-:border-r ama-:data-[state=closed]:slide-out-to-left ama-:data-[state=open]:slide-in-from-left ama-:sm:max-w-sm",
        right:
          "ama-:inset-y-0 ama-:right-0 ama-:h-full ama-:w-3/4 ama-: ama-:border-l ama-:data-[state=closed]:slide-out-to-right ama-:data-[state=open]:slide-in-from-right ama-:sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="ama-:absolute ama-:right-4 ama-:top-4 ama-:rounded-sm ama-:opacity-70 ama-:ring-offset-background ama-:transition-opacity ama-:hover:opacity-100 ama-:focus:outline-none ama-:focus:ring-2 ama-:focus:ring-ring ama-:focus:ring-offset-2 ama-:disabled:pointer-events-none ama-:data-[state=open]:bg-secondary">
        <X className="ama-:h-4 ama-:w-4" />
        <span className="ama-:sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "ama-:flex ama-:flex-col ama-:space-y-2 ama-:text-center ama-:sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "ama-:flex ama-:flex-col-reverse ama-:sm:flex-row ama-:sm:justify-end ama-:sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("ama-:text-lg ama-:font-semibold ama-:text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("ama-:text-sm ama-:text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
