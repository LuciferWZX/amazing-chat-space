import { cn } from "@amazing-chat/ui"
import type { ComponentProps } from "react"

interface MentionItemProps extends ComponentProps<'li'>{
    label?:string
    inset?: boolean
  variant?: "default" | "destructive"
  active?:boolean
  disabled?:boolean
}
const MentionItem=(props:MentionItemProps)=>{
    const {className,children,label,inset,variant,active,disabled,...rest}=props
    return(
        <li 
            data-inset={inset}
            data-variant={variant}
            className={cn(
                "mb-1 last:mb-0 select-none relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                
                {
                    "bg-accent text-accent-foreground":active,
                    "hover:bg-accent hover:text-accent-foreground":!disabled,
                    "opacity-50 pointer-events-none":disabled
                },
                className
            )}
            aria-label={label}  {...rest}>
            {children}
        </li>
    )
}
export default MentionItem