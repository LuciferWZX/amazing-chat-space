import type { RenderLeafProps } from 'slate-react'
import { cn } from '@amazing-chat/ui'

interface LeafRenderElementProps extends RenderLeafProps {

}
export function LeafRenderElement(props: LeafRenderElementProps) {
  const { attributes, children, leaf } = props
  return (
    <span
      {...attributes}
      className={cn('whitespace-break-spaces', {
        'font-bold': leaf.bold,
        'italic': leaf.italic,
        'underline': leaf.underline,
        'line-through': leaf.strikethrough,
      })}
      style={{
        color: leaf.color,
        backgroundColor: leaf.backgroundColor,
      }}
    >
      {children}
    </span>
  )
}
