import type { ToolItem } from '@/types'
import { cn, LucideIcons, Tooltip } from '@amazing-chat/ui'
import { useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { AmazingEditorManager } from '@/index.ts'
import { useEditorStore } from '@/stores/use-editor-store.ts'

const { Smile, Image, MoveDiagonal } = LucideIcons

interface ToolboxProps {
  instanceId: string
}
function Toolbox(props: ToolboxProps) {
  const { instanceId } = props
  const { isExpand } = useEditorStore(
    useShallow((state) => {
      return {
        isExpand: state.instances.get(instanceId)?.isExpand,
      }
    }),
  )
  const tools: ToolItem[] = useMemo(() => {
    return [
      {
        label: '表情',
        icon: Smile,
        key: 'face',
      },
      {
        label: '图片',
        icon: Image,
        key: 'image',
      },
      {
        label: '展开',
        icon: MoveDiagonal,
        hidden: isExpand,
        key: 'expand',
        onClick: (evt) => {
          evt.stopPropagation()
          AmazingEditorManager.handleAction(instanceId, 'expand')
        },
      },
    ]
  }, [instanceId, isExpand])
  return (
    <header className="flex gap-1">
      {tools.filter(item => item.hidden !== true).map(tool => (
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
export default Toolbox
