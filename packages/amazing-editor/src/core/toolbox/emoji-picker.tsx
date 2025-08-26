import type { Emoji } from '@/stores/use-editor-store'
import { cn, ScrollArea } from '@amazing-chat/ui'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { cacheEmojiImage, getCachedEmojiImage } from '@/lib/cache'
import { useEditorStore } from '@/stores/use-editor-store'

interface EmojiPickerProps {
  onSelect: (emoji: Emoji) => void
}
function EmojiPicker(props: EmojiPickerProps) {
  const { onSelect } = props
  const emojis = useEditorStore(useShallow(state => state.emojis))
  const emojiMap = useMemo(() => {
    const emojiArray = Array.from(emojis.values()).flat()
    const map = new Map<string, Emoji>()
    emojiArray.forEach((emoji) => {
      map.set(emoji.unified, emoji)
    })
    return map
  }, [emojis])
  return (
    <ScrollArea className="w-96 px-4" classes={{ viewport: ' max-h-[40vh]' }}>
      <div
        className="my-4"
        onClick={(e) => {
          const target = e.target as HTMLElement

          const unifiedTarget = target.closest('[data-unified]') as HTMLElement
          if (!unifiedTarget) {
            return
          }
          const unified = unifiedTarget.dataset.unified
          const emoji = unified ? emojiMap.get(unified) : null
          if (emoji) {
            onSelect(emoji)
          }
        }}
      >
        {Array.from(emojis.entries()).map(([category, emojis]) => {
          return (
            <div key={category} className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">{category}</h3>
              <div className="grid grid-cols-9 gap-2">
                {emojis.map(emoji => (
                  <LazyEmojiImage emoji={emoji} key={emoji.shortName} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}

function LazyEmojiImage({ emoji }: { emoji: Emoji }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [src, setSrc] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const img = ref.current

    if (img) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadEmoji()
          observer.disconnect()
        }
      }, {
        rootMargin: '50px',
      })
      async function loadEmoji() {
        const url = emoji.url
        // 先查缓存
        const cached = await getCachedEmojiImage(url)
        if (cached) {
          const blob = await cached.blob()
          setSrc(URL.createObjectURL(blob))
          setLoaded(true)
          return
        }
        // 缓存没有，则加载图片
        setSrc(url)
        cacheEmojiImage(url)
      }
      observer.observe(img)
    }
  }, [emoji.url])

  return (
    <span
      ref={ref}
      data-unified={emoji.unified}
      className={cn(
        'bg-input cursor-pointer text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground  focus-visible:ring-ring/50 inline-flex size-8 items-center justify-center rounded text-sm transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        {
          'opacity-0': !loaded,
          'opacity-100': loaded,
        },
      )}
    >
      {src && (
        <img
          src={src}
          onLoad={() => { setLoaded(true) }}
          onError={() => {
            setSrc(null)
          }}
          alt={emoji.shortName}
          className="size-4/5"
        />
      )}
    </span>
  )
}
export default EmojiPicker
