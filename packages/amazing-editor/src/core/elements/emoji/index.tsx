import type { RenderElementProps } from 'slate-react'
import type { EmojiElement } from '@/types'
import { cn } from '@amazing-chat/ui'
import { useEffect, useMemo, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { useSlateStatic } from 'slate-react'
import { AmazingEditorManager } from '@/instance/amazing-editor'
import { cacheEmojiImage, getCachedEmojiImage } from '@/lib/cache'
import { IS_MAC } from '@/lib/environment'

interface EmojiElementProps extends RenderElementProps {
  element: EmojiElement
}
export function EmojiRenderElement(props: EmojiElementProps) {
  const { attributes, children, element } = props
  const editor = useSlateStatic()
  const { url } = element
  const [src, setSrc] = useState<string | undefined>(url)
  useEffect(() => {
    loadEmoji()
  }, [url])
  async function loadEmoji() {
    if (!url) {
      return
    }
    // 先查缓存
    const cached = await getCachedEmojiImage(url)
    if (cached) {
      const blob = await cached.blob()
      setSrc(URL.createObjectURL(blob))
      return
    }
    // 缓存没有，则加载图片
    setSrc(url)
    cacheEmojiImage(url)
  }
  const imageNode = useMemo(() => {
    if (!src) {
      return null
    }
    return <img src={src} alt="emoji" className="size-4.5 inline-block  align-[calc(-3px)]" />
  }, [src])
  return (
    <span
      contentEditable={false}
      className={cn('inline-block h-[17px] mx-[1px]')}

      {...attributes}
      onClick={(e) => {
        const domElement = e.currentTarget as HTMLElement
        requestAnimationFrame(() => {
          AmazingEditorManager.focusVoidElement(editor, element, domElement, e.clientX)
        })
      }}
    >
      <span className="block  h-[17px]" contentEditable={false}>
        {IS_MAC
          ? (
              <Fragment>
                {children}
                {imageNode}
              </Fragment>
            )
          : (
              <Fragment>
                {imageNode}
                {children}
              </Fragment>
            )}
      </span>

    </span>
  )
}
