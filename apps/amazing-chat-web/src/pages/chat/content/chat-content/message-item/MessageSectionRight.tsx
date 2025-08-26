import { LucideIcons, Tooltip } from '@amazing-chat/ui'
import { useMemo } from 'react'
import { MessageStatus } from 'wukongimjssdk'

const { LoaderCircle, CircleAlert } = LucideIcons
interface MessageSectionRightProps {
  status: MessageStatus
}
export function MessageSectionRight(props: MessageSectionRightProps) {
  const { status } = props
  const messageStatus = useMemo(() => {
    if (status === MessageStatus.Normal) {
      return null
    }
    if (status === MessageStatus.Fail) {
      return (
        <Tooltip tips="消息发送失败">
          <CircleAlert size={12} className="text-red-500" />
        </Tooltip>
      )
    }
    if (status === MessageStatus.Wait) {
      return <LoaderCircle size={12} className="animate-spin text-muted-foreground" />
    }
    return null
  }, [status])
  return (
    <div className="flex shrink-0 w-16 items-end pl-1">
      {messageStatus}
    </div>
  )
}
