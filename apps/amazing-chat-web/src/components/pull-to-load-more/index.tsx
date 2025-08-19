import type{ ReactNode } from "react"


interface PullToLoadMoreProps<T> {
    list:T[]
    hasMore?:boolean
    renderItem:(item:T)=>ReactNode
    onLoadMore:()=>Promise<T[]>
}
export const PullToLoadMore = <T,>(props:PullToLoadMoreProps<T>) => {
   const {list,hasMore,renderItem,onLoadMore}=props
  return(
      <div>
          组件开发
      </div>
  )
}