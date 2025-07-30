import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "ama-:flex ama-:h-full ama-:w-full ama-:flex-col ama-:overflow-hidden ama-:rounded-md ama-:bg-popover ama-:text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="ama-:overflow-hidden ama-:p-0 ama-:shadow-lg">
        <Command className="ama-:[&_[cmdk-group-heading]]:px-2 ama-:[&_[cmdk-group-heading]]:font-medium ama-:[&_[cmdk-group-heading]]:text-muted-foreground ama-:[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 ama-:[&_[cmdk-group]]:px-2 ama-:[&_[cmdk-input-wrapper]_svg]:h-5 ama-:[&_[cmdk-input-wrapper]_svg]:w-5 ama-:[&_[cmdk-input]]:h-12 ama-:[&_[cmdk-item]]:px-2 ama-:[&_[cmdk-item]]:py-3 ama-:[&_[cmdk-item]_svg]:h-5 ama-:[&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="ama-:flex ama-:items-center ama-:border-b ama-:px-3" cmdk-input-wrapper="">
    <Search className="ama-:mr-2 ama-:h-4 ama-:w-4 ama-:shrink-0 ama-:opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "ama-:flex ama-:h-11 ama-:w-full ama-:rounded-md ama-:bg-transparent ama-:py-3 ama-:text-sm ama-:outline-none ama-:placeholder:text-muted-foreground ama-:disabled:cursor-not-allowed ama-:disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("ama-:max-h-[300px] ama-:overflow-y-auto ama-:overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="ama-:py-6 ama-:text-center ama-:text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "ama-:overflow-hidden ama-:p-1 ama-:text-foreground ama-:[&_[cmdk-group-heading]]:px-2 ama-:[&_[cmdk-group-heading]]:py-1.5 ama-:[&_[cmdk-group-heading]]:text-xs ama-:[&_[cmdk-group-heading]]:font-medium ama-:[&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("ama-:-mx-1 ama-:h-px ama-:bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "ama-:relative ama-:flex ama-:cursor-default ama-:gap-2 ama-:select-none ama-:items-center ama-:rounded-sm ama-:px-2 ama-:py-1.5 ama-:text-sm ama-:outline-none ama-:data-[disabled=true]:pointer-events-none ama-:data-[selected=true]:bg-accent ama-:data-[selected=true]:text-accent-foreground ama-:data-[disabled=true]:opacity-50 ama-:[&_svg]:pointer-events-none ama-:[&_svg]:size-4 ama-:[&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
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
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
