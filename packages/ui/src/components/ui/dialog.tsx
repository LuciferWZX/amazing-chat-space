"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "ama-:fixed ama-:inset-0 ama-:z-50 ama-:bg-black/80 ama-:data-[state=open]:animate-in ama-:data-[state=closed]:animate-out ama-:data-[state=closed]:fade-out-0 ama-:data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "ama-:fixed ama-:left-[50%] ama-:top-[50%] ama-:z-50 ama-:grid ama-:w-full ama-:max-w-lg ama-:translate-x-[-50%] ama-:translate-y-[-50%] ama-:gap-4 ama-:border ama-:bg-background ama-:p-6 ama-:shadow-lg ama-:duration-200 ama-:data-[state=open]:animate-in ama-:data-[state=closed]:animate-out ama-:data-[state=closed]:fade-out-0 ama-:data-[state=open]:fade-in-0 ama-:data-[state=closed]:zoom-out-95 ama-:data-[state=open]:zoom-in-95 ama-:data-[state=closed]:slide-out-to-left-1/2 ama-:data-[state=closed]:slide-out-to-top-[48%] ama-:data-[state=open]:slide-in-from-left-1/2 ama-:data-[state=open]:slide-in-from-top-[48%] ama-:sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="ama-:absolute ama-:right-4 ama-:top-4 ama-:rounded-sm ama-:opacity-70 ama-:ring-offset-background ama-:transition-opacity ama-:hover:opacity-100 ama-:focus:outline-none ama-:focus:ring-2 ama-:focus:ring-ring ama-:focus:ring-offset-2 ama-:disabled:pointer-events-none ama-:data-[state=open]:bg-accent ama-:data-[state=open]:text-muted-foreground">
        <X className="ama-:h-4 ama-:w-4" />
        <span className="ama-:sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "ama-:flex ama-:flex-col ama-:space-y-1.5 ama-:text-center ama-:sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "ama-:text-lg ama-:font-semibold ama-:leading-none ama-:tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("ama-:text-sm ama-:text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
