import type { ReactNode } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@amazing-chat/ui'

interface MessageBubbleProps {
  avatar?: string
  fallback?: ReactNode
}
export function MessageAvatar(props: MessageBubbleProps) {
  const { avatar, fallback } = props
  return (
    <div className="mt-4">
      <Avatar className="size-8">
        <AvatarImage src={avatar} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </div>
  )
}
