import type { RefObject } from 'react'
import { AmazingEditor, AmazingEditorManager } from '@amazing-chat/editor'
import { events } from '@amazing-chat/shared'
import WKSDK, { MessageText } from 'wukongimjssdk'
import { useIMChat } from '../chat-provider'

interface ChatInputProps {
  expandContainerRef: RefObject<HTMLElement | null>
}
function ChatInput(props: ChatInputProps) {
  const { expandContainerRef } = props
  const { conversation } = useIMChat()
  return (
    <div className="relative">
      <AmazingEditor
        expandContainerRef={expandContainerRef}
        instanceId="happy"

        onSendMessage={(message) => {
          if (conversation) {
            const htmlStr = AmazingEditorManager.serialize(message.value)
            console.warn('htmlStr', htmlStr)
            const content = new MessageText(htmlStr)
            WKSDK.shared().chatManager.send(content, conversation.channel)
            requestAnimationFrame(() => {
              events.emit(`scroll-to-bottom`, {})
            })
          }
        }}
        mentions={[
          {
            trigger: '@',
            data: [
              {
                label: '孙悟空',
                value: 'adnwjndnwjved',
              },
              {
                label: '蝙蝠侠',
                value: 'fafeaefe',
                disabled: true,
              },
              {
                label: '超人',
                value: 'sasdwda',
              },
            ],
          },
        ]}
        classes={{ viewport: 'max-h-38 ' }}
        placeholder="请输入消息"
      />
    </div>
  )
}
export default ChatInput
