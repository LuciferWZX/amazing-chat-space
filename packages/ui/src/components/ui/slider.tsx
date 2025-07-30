import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "ama-:relative ama-:flex ama-:w-full ama-:touch-none ama-:select-none ama-:items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="ama-:relative ama-:h-2 ama-:w-full ama-:grow ama-:overflow-hidden ama-:rounded-full ama-:bg-secondary">
      <SliderPrimitive.Range className="ama-:absolute ama-:h-full ama-:bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="ama-:block ama-:h-5 ama-:w-5 ama-:rounded-full ama-:border-2 ama-:border-primary ama-:bg-background ama-:ring-offset-background ama-:transition-colors ama-:focus-visible:outline-none ama-:focus-visible:ring-2 ama-:focus-visible:ring-ring ama-:focus-visible:ring-offset-2 ama-:disabled:pointer-events-none ama-:disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
