import type { Message } from 'wukongimjssdk'
import type { AppUser } from '@/types'
import { cn } from '@amazing-chat/ui'
import dayjs from 'dayjs'
import { Fragment, useMemo } from 'react'
import { getTimeStringAutoShort, isSameDay } from '@/utils/format'
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
  showDate?: boolean
}
function MessageItem(props: MessageItemProps) {
  const { message, className, user, clientUser, closeToPreviousMessage, closeToNextMessage, showDate } = props

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
    // dayjs判断是否是今天
    const isToday = dayjs(message.timestamp * 1000).isSame(dayjs(), 'day')
    const _time = (closeToPreviousMessage || isToday) ? dayjs(message.timestamp * 1000).format('HH:mm') : getTimeStringAutoShort(message.timestamp * 1000, true)
    return (
      <div className={cn('group-hover/message:opacity-100 opacity-0 text-xs text-muted-foreground flex', {
        'justify-end': !isFromMe,
      })}
      >
        {_time}
      </div>
    )
  }, [closeToPreviousMessage, isFromMe, message.timestamp])
  const _date = useMemo(() => {
    const _timestamp = message.timestamp * 1000
    // 如果时间是今天就显示HH:mm,如果时间是昨天就显示 昨天，如果时间距离今天大于一天就显示MM-DD，如果时间是去年的则显示YYYY-MM-DD
    if (isSameDay(_timestamp, new Date().getTime())) {
      return dayjs(_timestamp).format('HH:mm')
    }
    else if (isSameDay(_timestamp, new Date().getTime() - 24 * 60 * 60 * 1000)) {
      return '昨天'
    }
    else if (isSameDay(_timestamp, new Date().getTime() - 2 * 24 * 60 * 60 * 1000)) {
      return '前天'
    }
    else if (dayjs(_timestamp).isSame(dayjs(), 'year')) {
      return dayjs(_timestamp).format('MM-DD')
    }
    else {
      return dayjs(_timestamp).format('YYYY-MM-DD')
    }
  }, [message.timestamp])
  return (
    <Fragment>
      {showDate ? <div className="text-xs flex items-center leading-5 py-3 justify-center text-muted-foreground">{_date}</div> : null}
      <div className={cn('group/message pt-0.5', className)}>
        <div className={cn('flex', {
          'flex-row-reverse': !isFromMe,
        })}
        >
          <div className={cn(
            'flex-shrink-0 w-16 flex',
            {
              ' pl-5': isFromMe,
              ' pr-5 justify-end': !isFromMe,
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
    </Fragment>
  )
}
export default MessageItem
