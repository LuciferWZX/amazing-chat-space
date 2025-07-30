"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "ama-:flex ama-:h-10 ama-:w-full ama-:items-center ama-:justify-between ama-:rounded-md ama-:border ama-:border-input ama-:bg-background ama-:px-3 ama-:py-2 ama-:text-sm ama-:ring-offset-background ama-:data-[placeholder]:text-muted-foreground ama-:focus:outline-none ama-:focus:ring-2 ama-:focus:ring-ring ama-:focus:ring-offset-2 ama-:disabled:cursor-not-allowed ama-:disabled:opacity-50 ama-:[&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="ama-:h-4 ama-:w-4 ama-:opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "ama-:flex ama-:cursor-default ama-:items-center ama-:justify-center ama-:py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="ama-:h-4 ama-:w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "ama-:flex ama-:cursor-default ama-:items-center ama-:justify-center ama-:py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="ama-:h-4 ama-:w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "ama-:relative ama-:z-50 ama-:max-h-[--radix-select-content-available-height] ama-:min-w-[8rem] ama-:overflow-y-auto ama-:overflow-x-hidden ama-:rounded-md ama-:border ama-:bg-popover ama-:text-popover-foreground ama-:shadow-md ama-:data-[state=open]:animate-in ama-:data-[state=closed]:animate-out ama-:data-[state=closed]:fade-out-0 ama-:data-[state=open]:fade-in-0 ama-:data-[state=closed]:zoom-out-95 ama-:data-[state=open]:zoom-in-95 ama-:data-[side=bottom]:slide-in-from-top-2 ama-:data-[side=left]:slide-in-from-right-2 ama-:data-[side=right]:slide-in-from-left-2 ama-:data-[side=top]:slide-in-from-bottom-2 ama-:origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "ama-:data-[side=bottom]:translate-y-1 ama-:data-[side=left]:-translate-x-1 ama-:data-[side=right]:translate-x-1 ama-:data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "ama-:p-1",
          position === "popper" &&
            "ama-:h-[var(--radix-select-trigger-height)] ama-:w-full ama-:min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("ama-:py-1.5 ama-:pl-8 ama-:pr-2 ama-:text-sm ama-:font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "ama-:relative ama-:flex ama-:w-full ama-:cursor-default ama-:select-none ama-:items-center ama-:rounded-sm ama-:py-1.5 ama-:pl-8 ama-:pr-2 ama-:text-sm ama-:outline-none ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:data-[disabled]:pointer-events-none ama-:data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="ama-:absolute ama-:left-2 ama-:flex ama-:h-3.5 ama-:w-3.5 ama-:items-center ama-:justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="ama-:h-4 ama-:w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("ama-:-mx-1 ama-:my-1 ama-:h-px ama-:bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
