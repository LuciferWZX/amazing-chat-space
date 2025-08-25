// 使用 Set 来管理监听器，提高性能
const listeners = new Set<() => void>()
let interval: NodeJS.Timeout | null = null

// 添加错误处理的时间更新函数
const safeNotify = () => {
    listeners.forEach(listener => {
        try {
            listener()
        } catch (error) {
            console.error('Time updater listener error:', error)
            // 移除有问题的监听器
            listeners.delete(listener)
        }
    })
}

export const timeUpdater = {
    start() {
        if (!interval) {
            interval = setInterval(safeNotify, 1000)
        }
    },
    
    stop() {
        if (interval) {
            clearInterval(interval)
            interval = null
            listeners.clear()
        }
    },
    
    subscribe(fn: () => void) {
        listeners.add(fn)
        
        // 如果这是第一个监听器，自动启动定时器
        if (listeners.size === 1) {
            timeUpdater.start()
        }
        
        // 返回取消订阅函数
        return () => {
            listeners.delete(fn)
            
            // 如果没有监听器了，停止定时器
            if (listeners.size === 0) {
                timeUpdater.stop()
            }
        }
    },
    
    // 获取当前监听器数量
    getListenerCount() {
        return listeners.size
    },
    
    // 检查是否正在运行
    isRunning() {
        return interval !== null
    }
}