import { useCallback, useEffect, useRef, useState } from "react"


interface PullToLoadMoreProps<T> {
    initialList:T[]
    initialHasMore:boolean
    onLoadMore:()=>Promise<T[]>
    hasMore?:boolean
    renderItem:(item:T)=>React.ReactNode
}
export const PullToLoadMore = <T,>(props:PullToLoadMoreProps<T>) => {
    const {initialList,onLoadMore,initialHasMore=true,renderItem}=props
    const [list,setList]=useState<T[]>(initialList)
    const [loading,setLoading]=useState<boolean>(false)
    const [hasMore,setHasMore]=useState<boolean>(initialHasMore)
    const listRef = useRef<HTMLDivElement|null>(null);
    const scrollRestorationRef = useRef({
        isRestoring: false,
        restorePosition: 0
    });

    // 检查是否接近顶部（用户有意图加载更多）
    const isCloseToTop = useCallback((element:HTMLElement) => {
        // 只有当用户滚动到顶部附近，并且不是因为内容增加而自动滚动时才加载
        return element.scrollTop < 100 && element.scrollHeight > element.clientHeight;
    }, []);
        // 恢复滚动位置
    const restoreScrollPosition = useCallback((prevScrollHeight:number) => {
        const list = listRef.current;
        if (!list) return;
        
        // 计算需要滚动的距离
        const currentScrollHeight = list.scrollHeight;
        const scrollDiff = currentScrollHeight - prevScrollHeight;
        
        if (scrollDiff > 0) {
        // 恢复到原来的位置
        list.scrollTop = list.scrollTop + scrollDiff;
        }
    }, []);
    // 加载更多消息
    const loadMoreMessages = useCallback(async () => {
        if (loading || !hasMore || scrollRestorationRef.current.isRestoring) return;
        
        const list = listRef.current;
        if (!list) return;
        
        // 只有当用户接近顶部时才加载
        if (!isCloseToTop(list)) return;
        
        setLoading(true);
        
        // 保存当前的滚动高度
        const prevScrollHeight = list.scrollHeight;
        
        try {
        const newList = await onLoadMore();
        
        if (newList.length === 0) {
            setHasMore(false);
        } else {
            // 添加新消息到前面
            setList(prev => [...newList, ...prev]);
            
            // 状态更新后恢复滚动位置
            // 使用 requestAnimationFrame 确保在下一次重绘前执行
            requestAnimationFrame(() => {
            restoreScrollPosition(prevScrollHeight);
            });
        }
        } catch (error) {
        console.error('加载消息失败:', error);
        } finally {
        setLoading(false);
        }
    }, [loading, hasMore, isCloseToTop, restoreScrollPosition, onLoadMore]);
        // 滚动处理函数
    const handleScroll = useCallback(() => {
        const list = listRef.current;
        if (!list || loading || !hasMore) return;
        
        // 只有当接近顶部时才准备加载
        if (isCloseToTop(list)) {
            // 使用防抖，避免频繁触发
            if (!scrollRestorationRef.current.isRestoring) {
                // 可以添加防抖逻辑
                loadMoreMessages();
            }
        }
    }, [loading, hasMore, isCloseToTop, loadMoreMessages]);
     // 初始化加载
  useEffect(() => {
    loadMoreMessages();
  }, []);
    return(
        <div
            ref={listRef}
            className="message-list"
            onScroll={handleScroll}>
             {/* 加载提示 */}
        {loading && (
          <div className="loading">
            加载中...
          </div>
        )}
        {list.map(renderItem)}
        {/* 没有更多消息 */}
        {!hasMore && list.length > 0 && (
          <div className="no-more">
            没有更多历史消息
          </div>
        )}
        </div>
    )
}