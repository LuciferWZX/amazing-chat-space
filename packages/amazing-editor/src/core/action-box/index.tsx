import { cn, LucideIcons, Separator, Tooltip } from '@amazing-chat/ui'
import { useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import Toolbox from '@/core/toolbox'
import { AmazingEditorManager } from '@/instance/amazing-editor'
import { useEditorStore } from '@/stores/use-editor-store'

const { SendHorizontal } = LucideIcons
interface ActionBoxProps {
  instanceId: string
}
function ActionBox(props: ActionBoxProps) {
  const { instanceId } = props
  const value = useEditorStore(
    useShallow(state => state.instances.get(instanceId)?.value ?? AmazingEditorManager.emptyValue),
  )
  const isEmpty = useMemo(() => {
    return AmazingEditorManager.isEmpty(value)
  }, [value])
  const mergedDisabled = useMemo(() => {
    return isEmpty
  }, [isEmpty])
  return (
    <footer className="box-border flex flex-row-reverse gap-2 py-2.5 pr-2">
      <Tooltip asChild={true} tips="发送 (Enter)">
        <button
          type="button"
          onClick={() => {
            AmazingEditorManager.sendMessage(instanceId, 'button')
          }}
          className={cn(
            'bg-background text-muted-foreground/80 hover:bg-accent  focus-visible:ring-ring/50 inline-flex size-6 items-center justify-center rounded text-sm transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
            {
              'text-primary': !mergedDisabled,
            },
          )}
          aria-label="发送消息"
          disabled={mergedDisabled}
        >
          <SendHorizontal className="size-4" />
        </button>
      </Tooltip>
      <Separator orientation="vertical" />
      <Toolbox instanceId={instanceId} />
    </footer>
  )
}
export default ActionBox
