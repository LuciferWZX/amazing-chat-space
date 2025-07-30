import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "ama-:relative ama-:z-10 ama-:flex ama-:max-w-max ama-:flex-1 ama-:items-center ama-:justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "ama-:group ama-:flex ama-:flex-1 ama-:list-none ama-:items-center ama-:justify-center ama-:space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "ama-:group ama-:inline-flex ama-:h-10 ama-:w-max ama-:items-center ama-:justify-center ama-:rounded-md ama-:bg-background ama-:px-4 ama-:py-2 ama-:text-sm ama-:font-medium ama-:transition-colors ama-:hover:bg-accent ama-:hover:text-accent-foreground ama-:focus:bg-accent ama-:focus:text-accent-foreground ama-:focus:outline-none ama-:disabled:pointer-events-none ama-:disabled:opacity-50 ama-:data-[state=open]:text-accent-foreground ama-:data-[state=open]:bg-accent/50 ama-:data-[state=open]:hover:bg-accent ama-:data-[state=open]:focus:bg-accent"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "ama-:group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="ama-:relative ama-:top-[1px] ama-:ml-1 ama-:h-3 ama-:w-3 ama-:transition ama-:duration-200 ama-:group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "ama-:left-0 ama-:top-0 ama-:w-full ama-:data-[motion^=from-]:animate-in ama-:data-[motion^=to-]:animate-out ama-:data-[motion^=from-]:fade-in ama-:data-[motion^=to-]:fade-out ama-:data-[motion=from-end]:slide-in-from-right-52 ama-:data-[motion=from-start]:slide-in-from-left-52 ama-:data-[motion=to-end]:slide-out-to-right-52 ama-:data-[motion=to-start]:slide-out-to-left-52 ama-:md:absolute ama-:md:w-auto ama-:",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("ama-:absolute ama-:left-0 ama-:top-full ama-:flex ama-:justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "ama-:origin-top-center ama-:relative ama-:mt-1.5 ama-:h-[var(--radix-navigation-menu-viewport-height)] ama-:w-full ama-:overflow-hidden ama-:rounded-md ama-:border ama-:bg-popover ama-:text-popover-foreground ama-:shadow-lg ama-:data-[state=open]:animate-in ama-:data-[state=closed]:animate-out ama-:data-[state=closed]:zoom-out-95 ama-:data-[state=open]:zoom-in-90 ama-:md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "ama-:top-full ama-:z-[1] ama-:flex ama-:h-1.5 ama-:items-end ama-:justify-center ama-:overflow-hidden ama-:data-[state=visible]:animate-in ama-:data-[state=hidden]:animate-out ama-:data-[state=hidden]:fade-out ama-:data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="ama-:relative ama-:top-[60%] ama-:h-2 ama-:w-2 ama-:rotate-45 ama-:rounded-tl-sm ama-:bg-border ama-:shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
