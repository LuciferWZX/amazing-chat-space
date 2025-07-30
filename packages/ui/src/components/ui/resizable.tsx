"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "ama-:flex ama-:h-full ama-:w-full ama-:data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "ama-:relative ama-:flex ama-:w-px ama-:items-center ama-:justify-center ama-:bg-border ama-:after:absolute ama-:after:inset-y-0 ama-:after:left-1/2 ama-:after:w-1 ama-:after:-translate-x-1/2 ama-:focus-visible:outline-none ama-:focus-visible:ring-1 ama-:focus-visible:ring-ring ama-:focus-visible:ring-offset-1 ama-:data-[panel-group-direction=vertical]:h-px ama-:data-[panel-group-direction=vertical]:w-full ama-:data-[panel-group-direction=vertical]:after:left-0 ama-:data-[panel-group-direction=vertical]:after:h-1 ama-:data-[panel-group-direction=vertical]:after:w-full ama-:data-[panel-group-direction=vertical]:after:-translate-y-1/2 ama-:data-[panel-group-direction=vertical]:after:translate-x-0 ama-:[&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="ama-:z-10 ama-:flex ama-:h-4 ama-:w-3 ama-:items-center ama-:justify-center ama-:rounded-sm ama-:border ama-:bg-border">
        <GripVertical className="ama-:h-2.5 ama-:w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
