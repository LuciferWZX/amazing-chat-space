import type { ToolItem } from '@/types'
import { cn, LucideIcons, Tooltip } from '@amazing-chat/ui'
import { useMemo } from 'react'
import { AmazingEditorManager } from '@/instance/amazing-editor.ts'

const { Minimize2 } = LucideIcons
interface ExpandDrawerToolbarProps {
  instanceId: string
}
function ExpandDrawerToolbar(props: ExpandDrawerToolbarProps) {
  const { instanceId } = props
  const endTools: ToolItem[] = useMemo(() => {
    return [
      {
        label: '收起',
        icon: Minimize2,
        key: 'close',
        onClick: (evt) => {
          evt.stopPropagation()
          AmazingEditorManager.handleAction(instanceId, 'close')
        },
      },
    ]
  }, [instanceId])
  return (
    <header className="flex justify-end">
      {endTools.map(tool => (
        <Tooltip asChild={true} key={tool.key} tips={tool.label}>
          <button
            type="button"
            onClick={tool.onClick}
            className={cn(
              'bg-input cursor-pointer text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground  focus-visible:ring-ring/50 inline-flex size-6 items-center justify-center rounded text-sm transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
            )}
            aria-label={tool.label}
          >
            <tool.icon className="size-4" />
          </button>
        </Tooltip>
      ))}
    </header>
  )
}
export default ExpandDrawerToolbar
