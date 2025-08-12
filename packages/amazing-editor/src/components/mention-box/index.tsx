import type { MentionConfig, MentionDataItem } from "@/core"
import { cn, ScrollArea } from "@amazing-chat/ui"
import { useCallback, useEffect, useState, type ComponentProps } from "react"
import MentionItem from "./mention-item"

interface MentionBoxProps extends ComponentProps<"ul"> {
    config:MentionConfig
    keyword:string
}
export const MentionBox = (props:MentionBoxProps) => {
    const {className,config,keyword,...rest}=props
    const [items,setItems]=useState<MentionDataItem[]>([])
    
    const fetchData=useCallback(async ()=>{
        if(config.fetch){
            const data= await config.fetch(keyword)
            setItems(data)
        }
        setItems(config?.data ?? [])
    },[config.data,config.fetch,keyword])
    useEffect(()=>{
        fetchData()
    },[config.data,config.fetch,keyword])
    return(
        <ul className={cn("absolute top-0 left-0 z-0 w-[200px] bg-card border border-border rounded-md shadow-md",className)} {...rest}>
          <ScrollArea classes={{viewport:"max-h-[200px] p-3"}}>
            {items.map(item=>{
                return(
                    <MentionItem 
                        key={item.value} 
                        disabled={item.disabled}
                        className={config.className}
                        label={item.label} >
                        {config.renderItem?config.renderItem(item):item.label}
                    </MentionItem>
                )
            })}
          </ScrollArea>
        </ul>
    )
}