import type { RenderElementProps } from 'slate-react'
import type { ParagraphElement } from '@/types'
import { cn } from '@amazing-chat/ui'

interface ParagraphElementProps extends RenderElementProps {
  element: ParagraphElement
}
export function ParagraphRenderElement(props: ParagraphElementProps) {
  const { attributes, children } = props
  return (
    <p className={cn('')} {...attributes}>
      {children}
    </p>
  )
}
