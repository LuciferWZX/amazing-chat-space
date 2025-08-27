import type { ToolItem } from '@/types'
import { cn, LucideIcons, Popover, PopoverContent, PopoverTrigger, ShadTooltip, Tooltip, TooltipContent, TooltipTrigger } from '@amazing-chat/ui'
import { useMemo, useState } from 'react'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { useShallow } from 'zustand/shallow'
import { AmazingEditorManager } from '@/index.ts'
import { EditorCommand } from '@/lib/command.ts'
import { useEditorStore } from '@/stores/use-editor-store.ts'
import EmojiPicker from './emoji-picker.tsx'

const { Smile, Image, MoveDiagonal } = LucideIcons

interface ToolboxProps {
  instanceId: string
}
function Toolbox(props: ToolboxProps) {
  const { instanceId } = props
  const editor = useSlateStatic()
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false)
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
    <header
      className="flex gap-1"
      onClick={(evt) => {
        evt.stopPropagation()
      }}
    >
      {tools.filter(item => item.hidden !== true).map((tool) => {
        const base = (

          <span
            // type="button"
            onClick={tool.onClick}
            className={cn(
              'bg-input cursor-pointer text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground  focus-visible:ring-ring/50 inline-flex size-6 items-center justify-center rounded text-sm transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
            )}
            aria-label={tool.label}
          >
            <tool.icon className="size-4" />
          </span>

        )
        if (tool.key === 'face') {
          return (
            <Popover key={tool.key} open={emojiPickerVisible} onOpenChange={setEmojiPickerVisible}>
              <ShadTooltip>
                <TooltipTrigger asChild={true}>
                  <PopoverTrigger asChild={true}>
                    {base}
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  {tool.label}
                </TooltipContent>
              </ShadTooltip>
              <PopoverContent forceMount={true} className="p-0 w-[inner] ">
                <EmojiPicker
                  onSelect={(emoji) => {
                    setEmojiPickerVisible(false)
                    requestAnimationFrame(() => {
                      EditorCommand.insertEmoji(editor, editor.selection, {
                        unified: emoji.unified,
                        emoji: emoji.emoji,
                        url: emoji.url,
                      })
                      ReactEditor.focus(editor)
                    })
                  }}
                />
              </PopoverContent>
            </Popover>
          )
        }
        return (
          <Tooltip key={tool.key} tips={tool.label}>
            {base}
          </Tooltip>
        )
      })}
    </header>
  )
}
export default Toolbox
