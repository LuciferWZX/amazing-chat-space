"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "ama-:flex ama-:h-10 ama-:items-center ama-:space-x-1 ama-:rounded-md ama-:border ama-:bg-background ama-:p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "ama-:flex ama-:cursor-default ama-:select-none ama-:items-center ama-:rounded-sm ama-:px-3 ama-:py-1.5 ama-:text-sm ama-:font-medium ama-:outline-none ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:data-[state=open]:bg-accent ama-:data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "ama-:flex ama-:cursor-default ama-:select-none ama-:items-center ama-:rounded-sm ama-:px-2 ama-:py-1.5 ama-:text-sm ama-:outline-none ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:data-[state=open]:bg-accent ama-:data-[state=open]:text-accent-foreground",
      inset && "ama-:pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ama-:ml-auto ama-:h-4 ama-:w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "ama-:z-50 ama-:min-w-[8rem] ama-:overflow-hidden ama-:rounded-md ama-:border ama-:bg-popover ama-:p-1 ama-:text-popover-foreground ama-:data-[state=open]:animate-in ama-:data-[state=closed]:animate-out ama-:data-[state=closed]:fade-out-0 ama-:data-[state=open]:fade-in-0 ama-:data-[state=closed]:zoom-out-95 ama-:data-[state=open]:zoom-in-95 ama-:data-[side=bottom]:slide-in-from-top-2 ama-:data-[side=left]:slide-in-from-right-2 ama-:data-[side=right]:slide-in-from-left-2 ama-:data-[side=top]:slide-in-from-bottom-2 ama-:origin-[--radix-menubar-content-transform-origin]",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "ama-:z-50 ama-:min-w-[12rem] ama-:overflow-hidden ama-:rounded-md ama-:border ama-:bg-popover ama-:p-1 ama-:text-popover-foreground ama-:shadow-md ama-:data-[state=open]:animate-in ama-:data-[state=closed]:fade-out-0 ama-:data-[state=open]:fade-in-0 ama-:data-[state=closed]:zoom-out-95 ama-:data-[state=open]:zoom-in-95 ama-:data-[side=bottom]:slide-in-from-top-2 ama-:data-[side=left]:slide-in-from-right-2 ama-:data-[side=right]:slide-in-from-left-2 ama-:data-[side=top]:slide-in-from-bottom-2 ama-:origin-[--radix-menubar-content-transform-origin]",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "ama-:relative ama-:flex ama-:cursor-default ama-:select-none ama-:items-center ama-:rounded-sm ama-:px-2 ama-:py-1.5 ama-:text-sm ama-:outline-none ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:data-[disabled]:pointer-events-none ama-:data-[disabled]:opacity-50",
      inset && "ama-:pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "ama-:relative ama-:flex ama-:cursor-default ama-:select-none ama-:items-center ama-:rounded-sm ama-:py-1.5 ama-:pl-8 ama-:pr-2 ama-:text-sm ama-:outline-none ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:data-[disabled]:pointer-events-none ama-:data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="ama-:absolute ama-:left-2 ama-:flex ama-:h-3.5 ama-:w-3.5 ama-:items-center ama-:justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="ama-:h-4 ama-:w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "ama-:relative ama-:flex ama-:cursor-default ama-:select-none ama-:items-center ama-:rounded-sm ama-:py-1.5 ama-:pl-8 ama-:pr-2 ama-:text-sm ama-:outline-none ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:data-[disabled]:pointer-events-none ama-:data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="ama-:absolute ama-:left-2 ama-:flex ama-:h-3.5 ama-:w-3.5 ama-:items-center ama-:justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="ama-:h-2 ama-:w-2 ama-:fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "ama-:px-2 ama-:py-1.5 ama-:text-sm ama-:font-semibold",
      inset && "ama-:pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("ama-:-mx-1 ama-:my-1 ama-:h-px ama-:bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ama-:ml-auto ama-:text-xs ama-:tracking-widest ama-:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
