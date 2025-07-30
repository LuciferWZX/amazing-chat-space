import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "ama-:flex ama-:cursor-default ama-:select-none ama-:items-center ama-:gap-2 ama-:rounded-sm ama-:px-2 ama-:py-1.5 ama-:text-sm ama-:outline-none ama-:focus:bg-accent ama-:data-[state=open]:bg-accent ama-:[&_svg]:pointer-events-none ama-:[&_svg]:size-4 ama-:[&_svg]:shrink-0",
      inset && "ama-:pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ama-:ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "ama-:z-50 ama-:min-w-[8rem] ama-:overflow-hidden ama-:rounded-md ama-:border ama-:bg-popover ama-:p-1 ama-:text-popover-foreground ama-:shadow-lg ama-:data-[state=open]:animate-in ama-:data-[state=closed]:animate-out ama-:data-[state=closed]:fade-out-0 ama-:data-[state=open]:fade-in-0 ama-:data-[state=closed]:zoom-out-95 ama-:data-[state=open]:zoom-in-95 ama-:data-[side=bottom]:slide-in-from-top-2 ama-:data-[side=left]:slide-in-from-right-2 ama-:data-[side=right]:slide-in-from-left-2 ama-:data-[side=top]:slide-in-from-bottom-2 ama-:origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "ama-:z-50 ama-:max-h-[var(--radix-dropdown-menu-content-available-height)] ama-:min-w-[8rem] ama-:overflow-y-auto ama-:overflow-x-hidden ama-:rounded-md ama-:border ama-:bg-popover ama-:p-1 ama-:text-popover-foreground ama-:shadow-md ama-:data-[state=open]:animate-in ama-:data-[state=closed]:animate-out ama-:data-[state=closed]:fade-out-0 ama-:data-[state=open]:fade-in-0 ama-:data-[state=closed]:zoom-out-95 ama-:data-[state=open]:zoom-in-95 ama-:data-[side=bottom]:slide-in-from-top-2 ama-:data-[side=left]:slide-in-from-right-2 ama-:data-[side=right]:slide-in-from-left-2 ama-:data-[side=top]:slide-in-from-bottom-2 ama-:origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "ama-:relative ama-:flex ama-:cursor-default ama-:select-none ama-:items-center ama-:gap-2 ama-:rounded-sm ama-:px-2 ama-:py-1.5 ama-:text-sm ama-:outline-none ama-:transition-colors ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:data-[disabled]:pointer-events-none ama-:data-[disabled]:opacity-50 ama-:[&_svg]:pointer-events-none ama-:[&_svg]:size-4 ama-:[&_svg]:shrink-0",
      inset && "ama-:pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "ama-:relative ama-:flex ama-:cursor-default ama-:select-none ama-:items-center ama-:rounded-sm ama-:py-1.5 ama-:pl-8 ama-:pr-2 ama-:text-sm ama-:outline-none ama-:transition-colors ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:data-[disabled]:pointer-events-none ama-:data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="ama-:absolute ama-:left-2 ama-:flex ama-:h-3.5 ama-:w-3.5 ama-:items-center ama-:justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="ama-:h-4 ama-:w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "ama-:relative ama-:flex ama-:cursor-default ama-:select-none ama-:items-center ama-:rounded-sm ama-:py-1.5 ama-:pl-8 ama-:pr-2 ama-:text-sm ama-:outline-none ama-:transition-colors ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:data-[disabled]:pointer-events-none ama-:data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="ama-:absolute ama-:left-2 ama-:flex ama-:h-3.5 ama-:w-3.5 ama-:items-center ama-:justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="ama-:h-2 ama-:w-2 ama-:fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "ama-:px-2 ama-:py-1.5 ama-:text-sm ama-:font-semibold",
      inset && "ama-:pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("ama-:-mx-1 ama-:my-1 ama-:h-px ama-:bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ama-:ml-auto ama-:text-xs ama-:tracking-widest ama-:opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
