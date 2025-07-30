import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "ama-:inline-flex ama-:h-10 ama-:items-center ama-:justify-center ama-:rounded-md ama-:bg-muted ama-:p-1 ama-:text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "ama-:inline-flex ama-:items-center ama-:justify-center ama-:whitespace-nowrap ama-:rounded-sm ama-:px-3 ama-:py-1.5 ama-:text-sm ama-:font-medium ama-:ring-offset-background ama-:transition-all ama-:focus-visible:outline-none ama-:focus-visible:ring-2 ama-:focus-visible:ring-ring ama-:focus-visible:ring-offset-2 ama-:disabled:pointer-events-none ama-:disabled:opacity-50 ama-:data-[state=active]:bg-background ama-:data-[state=active]:text-foreground ama-:data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ama-:mt-2 ama-:ring-offset-background ama-:focus-visible:outline-none ama-:focus-visible:ring-2 ama-:focus-visible:ring-ring ama-:focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
