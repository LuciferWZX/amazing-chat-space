import { cn, Tooltip } from '@amazing-chat/ui'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import { useMemo } from 'react'

interface RenderWithMentionProps {
  html: string
}

export function RenderWithMention(props: RenderWithMentionProps) {
  const { html } = props

  const cleanHtml = useMemo(() => {
    const cleanHtml = DOMPurify.sanitize(html)
    const parsedHtml = parse(cleanHtml, {
      replace: (node) => {
        // 处理mention
        if (node.type === 'tag' && node.name === 'span') {
          const value = node.attribs['data-mention-value']
          const label = node.attribs['data-label']
          const trigger = node.attribs['data-trigger']
          return (
            <Tooltip tips={`${label} ${value}`}>
              <span className={cn('text-primary cursor-pointer')}>
                {`${trigger ?? ''}${label}`}
              </span>
            </Tooltip>
          )
        }
      },
    })
    return parsedHtml
  }, [html])

  return (
    <div className="whitespace-pre-wrap">
      {cleanHtml}
    </div>
  )
}
