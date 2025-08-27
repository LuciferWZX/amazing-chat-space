import { cn, Tooltip } from '@amazing-chat/ui'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import { useMemo } from 'react'

interface RenderWithMentionProps {
  html: string
}

export function RenderEditorText(props: RenderWithMentionProps) {
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
        if (node.type === 'tag' && node.name === 'img') {
          const url = node.attribs['data-url']
          const unified = node.attribs['data-unified']
          const emoji = node.attribs['data-emoji']
          return <Emoji url={url} unified={unified} emoji={emoji} />
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
function Emoji(props: { url: string, unified: string, emoji: string }) {
  const { url, emoji } = props
  if (url) {
    return <img className="size-4.5 inline-block align-[calc(-3px)]" src={url} alt={emoji} />
  }
  return <span className="size-4.5 inline-block align-[calc(-3px)]">{emoji}</span>
}
