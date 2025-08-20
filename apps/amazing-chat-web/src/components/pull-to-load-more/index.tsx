import { useRef, useEffect, useCallback, useState, type ReactNode, useMemo, useImperativeHandle } from "react"
import { cn, ScrollArea } from "@amazing-chat/ui"
import { lodash } from "@amazing-chat/shared"
const {debounce}=lodash
interface PullToLoadMoreProps<T> {
    list: T[]
    hasMore?: boolean
    renderItem: (item: T, index: number) => ReactNode
    onLoadMore: () => void
    viewportRef?: React.RefObject<HTMLDivElement | null>
    preloadThreshold?: number // 预加载阈值，距离顶部多少px时开始加载
    ref?:React.RefObject<PullToLoadMoreRef|null>
}
export interface PullToLoadMoreRef {
    scrollBottom:()=>void
}
export const PullToLoadMore = <T,>(props: PullToLoadMoreProps<T>) => {
    const { 
        list, 
        hasMore, 
        renderItem, 
        onLoadMore, 
        viewportRef,
        preloadThreshold = 100,
        ref:componentRef
    } = props
   
    const [isLoading, setIsLoading] = useState(false)
    const internalViewportRef = useRef<HTMLDivElement>(null)
    const actualViewportRef = viewportRef || internalViewportRef
    const scrollViewportRef = useRef<HTMLDivElement>(null)
    const [isManualScroll,setIsManualScroll]=useState(false)
    const canLoadMore=useMemo(()=>{
        return hasMore && !isLoading
    },[hasMore,isLoading])
    // 滚动到底部的函数
    const scrollToBottom = useCallback(() => {
       
        if (scrollViewportRef.current && !isManualScroll) {
            requestAnimationFrame(() => {
                if (scrollViewportRef.current) {
                    scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight
                }
            })
        }
    }, [isManualScroll])
    useImperativeHandle(componentRef, () => ({
        scrollBottom: () => {
            scrollViewportRef.current?.scrollTo({
                top: scrollViewportRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }))
    // 获取真正的滚动容器
    useEffect(() => {
        if (actualViewportRef.current) {
            // 查找 ScrollArea 内部的真正滚动容器
            const scrollViewport = actualViewportRef.current.querySelector('[data-radix-scroll-area-viewport]')
            if (scrollViewport) {
                scrollViewportRef.current = scrollViewport as HTMLDivElement
            }
        }
    }, [actualViewportRef])
    
    // 初始化时滚动到底部
    useEffect(() => {
        if (scrollViewportRef.current) {
            scrollToBottom()
        }
    }, [scrollViewportRef.current, scrollToBottom])
    
    // 当列表更新时，滚动到底部
    useEffect(() => {
        if (scrollViewportRef.current && list.length > 0) {
            scrollToBottom()
        }
    }, [list.length, scrollToBottom])
    
    // 预加载检查：当用户即将看到加载组件时开始加载
    const checkAndPreload = useCallback(async () => {
        if (!canLoadMore || !scrollViewportRef.current) return
        const viewport = scrollViewportRef.current
        const scrollTop = viewport.scrollTop
        // 计算距离顶部的距离
        const distanceFromTop = scrollTop
        // 如果距离顶部小于预加载阈值，开始加载
        if (distanceFromTop <= preloadThreshold) {
            console.warn('小于阈值加载数据');
            setIsLoading(true)
            try {
                await onLoadMore()
            } finally {
                setIsLoading(false)
            }
        }
    }, [canLoadMore, onLoadMore, preloadThreshold])

    useEffect(()=>{
        checkAndPreload()
    },[list.length,canLoadMore])
    
    //handleScroll 防抖
    const handleScroll = debounce(() => {
        setIsManualScroll(true)
        // 限制滚动位置，不能滚动到最顶部
        if (scrollViewportRef.current && hasMore) {
            const viewport = scrollViewportRef.current
            const minScrollTop = 1 // 最小滚动距离，确保能看到一些历史消息
            
            if (viewport.scrollTop < minScrollTop) {
                viewport.scrollTop = minScrollTop
            }
            
        }
        if (canLoadMore) {
            checkAndPreload()
        }
        
    }, 100)

    // 监听滚动事件
    useEffect(() => {
        const viewport = scrollViewportRef.current
        if (!viewport) return

        viewport.addEventListener('scroll', handleScroll, { passive: true })
        return () => viewport.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
        <ScrollArea className={cn('h-full')} viewportRef={actualViewportRef}>
            {isLoading && (
                <div className="flex justify-center py-4 text-sm text-muted-foreground">
                    加载中...
                </div>
            )}
            {list.map(renderItem)}
        </ScrollArea>
    )
}