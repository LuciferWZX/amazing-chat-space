import type { ComponentProps, ReactNode } from "react"
import { ShadTooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
interface TooltipProps extends ComponentProps<typeof ShadTooltip>{
  children:ReactNode
  asChild?:boolean
  tips?:ReactNode
  content?:ComponentProps<typeof TooltipContent>
}
export const Tooltip = (props:TooltipProps) => {
    const {children,asChild,tips,content,...rest}=props
    return(
   
        <ShadTooltip {...rest}>
            <TooltipTrigger asChild={asChild}>
                {children}
            </TooltipTrigger>
        
            <TooltipContent {...content}>
                {tips} 
            </TooltipContent>
        </ShadTooltip>
    )
}