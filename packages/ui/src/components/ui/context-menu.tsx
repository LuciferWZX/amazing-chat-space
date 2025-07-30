import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
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
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "ama-:z-50 ama-:min-w-[8rem] ama-:overflow-hidden ama-:rounded-md ama-:border ama-:bg-popover ama-:p-1 ama-:text-popover-foreground ama-:shadow-md ama-:data-[state=open]:animate-in ama-:data-[state=closed]:animate-out ama-:data-[state=closed]:fade-out-0 ama-:data-[state=open]:fade-in-0 ama-:data-[state=closed]:zoom-out-95 ama-:data-[state=open]:zoom-in-95 ama-:data-[side=bottom]:slide-in-from-top-2 ama-:data-[side=left]:slide-in-from-right-2 ama-:data-[side=right]:slide-in-from-left-2 ama-:data-[side=top]:slide-in-from-bottom-2 ama-:origin-[--radix-context-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "ama-:z-50 ama-:max-h-[--radix-context-menu-content-available-height] ama-:min-w-[8rem] ama-:overflow-y-auto ama-:overflow-x-hidden ama-:rounded-md ama-:border ama-:bg-popover ama-:p-1 ama-:text-popover-foreground ama-:shadow-md ama-:animate-in ama-:fade-in-80 ama-:data-[state=open]:animate-in ama-:data-[state=closed]:animate-out ama-:data-[state=closed]:fade-out-0 ama-:data-[state=open]:fade-in-0 ama-:data-[state=closed]:zoom-out-95 ama-:data-[state=open]:zoom-in-95 ama-:data-[side=bottom]:slide-in-from-top-2 ama-:data-[side=left]:slide-in-from-right-2 ama-:data-[side=right]:slide-in-from-left-2 ama-:data-[side=top]:slide-in-from-bottom-2 ama-:origin-[--radix-context-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "ama-:relative ama-:flex ama-:cursor-default ama-:select-none ama-:items-center ama-:rounded-sm ama-:px-2 ama-:py-1.5 ama-:text-sm ama-:outline-none ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:data-[disabled]:pointer-events-none ama-:data-[disabled]:opacity-50",
      inset && "ama-:pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "ama-:relative ama-:flex ama-:cursor-default ama-:select-none ama-:items-center ama-:rounded-sm ama-:py-1.5 ama-:pl-8 ama-:pr-2 ama-:text-sm ama-:outline-none ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:data-[disabled]:pointer-events-none ama-:data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="ama-:absolute ama-:left-2 ama-:flex ama-:h-3.5 ama-:w-3.5 ama-:items-center ama-:justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="ama-:h-4 ama-:w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "ama-:relative ama-:flex ama-:cursor-default ama-:select-none ama-:items-center ama-:rounded-sm ama-:py-1.5 ama-:pl-8 ama-:pr-2 ama-:text-sm ama-:outline-none ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:data-[disabled]:pointer-events-none ama-:data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="ama-:absolute ama-:left-2 ama-:flex ama-:h-3.5 ama-:w-3.5 ama-:items-center ama-:justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="ama-:h-2 ama-:w-2 ama-:fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "ama-:px-2 ama-:py-1.5 ama-:text-sm ama-:font-semibold ama-:text-foreground",
      inset && "ama-:pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("ama-:-mx-1 ama-:my-1 ama-:h-px ama-:bg-border", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
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
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
