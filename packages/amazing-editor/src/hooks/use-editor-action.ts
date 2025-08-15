import type { KeyboardEvent } from 'react'
import type { Descendant, Editor } from 'slate'
import { useEventBus } from '@amazing-chat/shared'
import { isHotkey } from 'is-hotkey'
import { useCallback } from 'react'
import { AmazingEditorManager } from '@/instance/amazing-editor'

function useEditorAction(instanceId: string, editor: Editor, actionConfig?: {
  onSendMessage?: (params: { value: Descendant[], type: 'keyboard' | 'button' }) => void
}) {
  useEventBus(`message:send:${instanceId}`, (params: { value: Descendant[], type: 'keyboard' | 'button' }) => {
    console.warn(`统一事件[message:send:${instanceId}]`)
    actionConfig?.onSendMessage?.(params)
  })
  const onActionKeydown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (isHotkey(['enter'], e)) {
        const isEmpty = AmazingEditorManager.isEmpty(editor.children)
        e.preventDefault()
        if (isEmpty) {
          return
        }
        AmazingEditorManager.sendMessage(instanceId, 'keyboard')
      }
    },
    [instanceId],
  )
  return {
    onActionKeydown,
  }
}
export default useEditorAction
