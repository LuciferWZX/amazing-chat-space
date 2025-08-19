import { useRef, type ReactNode } from "react"
import { cn, ScrollArea } from "@amazing-chat/ui"

interface PullToLoadMoreProps<T> {
    list:T[]
    hasMore?:boolean
    renderItem:(item:T,index:number)=>ReactNode
    onLoadMore:()=>void
    viewportRef?:React.RefObject<HTMLDivElement|null>
}
export const PullToLoadMore = <T,>(props:PullToLoadMoreProps<T>) => {
   const {list,hasMore,renderItem,onLoadMore,viewportRef}=props
   
  return(
      <ScrollArea className={cn('bg-amber-800 h-full')} viewportRef={viewportRef}>
          {list.map(renderItem)}
      </ScrollArea>
  )
}