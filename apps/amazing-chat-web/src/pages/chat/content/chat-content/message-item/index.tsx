import type { Message } from 'wukongimjssdk'
import type { AppUser } from '@/types'
import { cn } from '@amazing-chat/ui'
import { useMemo } from 'react'
import { getTimeStringAutoShort } from '@/utils/format'
import { isTextContent } from '@/utils/is'
import { MessageAvatar } from './MessageAvatar'
import { MessageBubble } from './MessageBubble'
import { MessageContainer } from './MessageContainer'
import { MessageSectionRight } from './MessageSectionRight'
import { RenderWithMention } from './RenderWithMention'

interface MessageItemProps {
  message: Message
  className?: string
  user: {
    id: string
    avatar: string
    nickname: string
    fallback: string
  }
  clientUser: AppUser
  closeToPreviousMessage?: boolean
  closeToNextMessage?: boolean
}
function MessageItem(props: MessageItemProps) {
  const { message, className, user, clientUser, closeToPreviousMessage, closeToNextMessage } = props

  const isFromMe = useMemo(() => {
    return message.fromUID === clientUser.id
  }, [clientUser.id, message.fromUID])
  const content = useMemo(() => {
    const msgContent = message.content
    if (isTextContent(msgContent)) {
      return msgContent.text
    }
    return msgContent.conversationDigest
  }, [message.content])
  const time = useMemo(() => {
    return (
      <div className={cn('group-hover/message:opacity-100 opacity-0 text-xs text-muted-foreground flex', {
        'justify-end': !isFromMe,
      })}
      >
        {getTimeStringAutoShort(message.timestamp * 1000, true)}
      </div>
    )
  }, [isFromMe, message.timestamp])
  return (
    <div className={cn('group/message pt-0.5', className)}>
      <div className={cn('flex', {
        'flex-row-reverse': !isFromMe,
      })}
      >
        <div className={cn(
          'flex-shrink-0 w-16 flex justify-end',
          {
            ' pl-5': isFromMe,
            ' pr-5': !isFromMe,
            'items-center justify-center': closeToPreviousMessage,
          },
        )}
        >
          {closeToPreviousMessage ? null : <MessageAvatar avatar={user.avatar} fallback={user.fallback} />}
          {closeToPreviousMessage ? time : null}
        </div>
        <MessageContainer>
          {closeToPreviousMessage ? null : time}
          <div className={cn('flex', {
            'flex-row-reverse': !isFromMe,
          })}
          >
            <MessageBubble
              className={cn('rounded-lg', {
                'bg-primary/20': isFromMe,
                'bg-muted': !isFromMe,
                'rounded-tl-none!': closeToPreviousMessage && isFromMe,
                'rounded-bl-none!': closeToNextMessage && isFromMe,
                'rounded-tr-none!': closeToPreviousMessage && !isFromMe,
                'rounded-br-none!': closeToNextMessage && !isFromMe,
              })}
            >
              <RenderWithMention html={content} />
            </MessageBubble>
            <MessageSectionRight status={message.status} />
          </div>

        </MessageContainer>

      </div>
    </div>
  )
}
export default MessageItem
