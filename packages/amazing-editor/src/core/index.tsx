import type { ComponentProps, ReactNode, RefObject } from 'react'
import type { Descendant } from 'slate'
import { cn, ScrollArea } from '@amazing-chat/ui'
import { Fragment, useMemo } from 'react'

import { Editable, ReactEditor, Slate } from 'slate-react'
import { useShallow } from 'zustand/shallow'
import ActionBox from '@/core/action-box'
import ExpandBottomDrawer from '@/core/expand-bottom-drawer'
import useCoreEditor from '@/hooks/use-core-editor'
import useEditorAction from '@/hooks/use-editor-action.ts'
import { useInitEditor } from '@/hooks/use-init-edtor'
import useMentionSelection from '@/hooks/use-mention-selection'
import useRender from '@/hooks/use-render'
import { AmazingEditorManager } from '@/instance/amazing-editor'
import { useEditorStore } from '@/stores/use-editor-store'
import FooterTooltip from './toolbox/footer-tooltip'
import './index.css'

export interface MentionConfig {
  trigger: string
  fetch?: (keyword: string) => Promise<MentionDataItem[]>
  data?: MentionDataItem[]
  className?: string
  renderItem?: (item: MentionDataItem) => ReactNode
}
export interface MentionDataItem {
  label: string
  value: string
  disabled?: boolean
}
interface CoreEditorProps extends Partial<Omit<ComponentProps<typeof Slate>, 'editor' | 'children'>> {
  className?: string
  placeholder?: string
  instanceId: string
  expandContainerRef?: RefObject<HTMLElement | null>
  classes?: {
    viewport?: string
  }
  config?: {
    footer?: ReactNode | null
  }
  onSendMessage?: (params: { value: Descendant[], type: 'keyboard' | 'button' }) => void
  /**
   * @description 如果有fetch方法，则每次输入时都会调用fetch方法获取数据
   * 如果没有fetch方法，则使用data数据
   */
  mentions?: Array<MentionConfig>
}
export function CoreEditor(props: CoreEditorProps) {
  const {
    className,
    initialValue,
    onChange,
    onValueChange,
    placeholder,
    instanceId,
    classes,
    config,
    mentions,
    onSendMessage,
    expandContainerRef,
    ...rest
  } = props
  const editor = useCoreEditor()
  const { onActionKeydown } = useEditorAction(instanceId, editor, {
    onSendMessage,
  })
  const value = useEditorStore(
    useShallow(state => state.instances.get(instanceId)?.value ?? AmazingEditorManager.emptyValue),
  )
  const isExpand = useEditorStore(useShallow(state => state.instances.get(instanceId)?.isExpand))

  useInitEditor(editor, instanceId, initialValue)
  const { renderElement, renderLeaf } = useRender()
  const { onChangeWithMention, mentionNode, onKeydownWithMention } = useMentionSelection(editor, mentions)

  const footerElement = useMemo(() => {
    if (config?.footer) {
      return config.footer
    }
    if (config?.footer === null) {
      return null
    }
    return <ActionBox instanceId={instanceId} />
  }, [config?.footer, instanceId])
  const isMoreThanOneLine = useMemo(() => {
    return value.length > 1
  }, [value])
  const renderCoreElement = (isExpandMode?: boolean) => (
    <Fragment>

      <div
        className={cn('flex flex-wrap', {
          'flex-col': isMoreThanOneLine || isExpandMode,
          'items-center': !isMoreThanOneLine,
          'items-start flex-1 overflow-auto': isExpandMode,
        })}
      >
        <ScrollArea
          type="always"
          onClick={() => {
            if (isExpandMode) {
              ReactEditor.focus(editor)
            }
          }}
          className={cn(
            '',
            {
              'flex-auto max-w-full min-w-[216px]': !isExpandMode,
              'w-full h-full flex-1 overflow-auto': isExpandMode,
            },
          )}
          classes={{
            viewport: isExpandMode ? 'h-full' : classes?.viewport,
          }}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            className={cn('mx-3 my-1 outline-none break-all')}
            placeholder={placeholder}
            onKeyDown={(e) => {
              // 检查事件是否已被处理，如果已处理则不再执行后续方法
              if (!e.defaultPrevented) {
                onKeydownWithMention(e)
              }

              if (!e.defaultPrevented) {
                onActionKeydown(e)
              }
            }}
          />
        </ScrollArea>
        <div className="flex flex-nowrap ml-auto align-end">{footerElement}</div>
      </div>
    </Fragment>
  )
  return (
    <Slate
      editor={editor}
      initialValue={initialValue ?? AmazingEditorManager.emptyValue}
      onChange={(selection) => {
        onChangeWithMention()
        onChange?.(selection)
      }}
      onValueChange={(value) => {
        useEditorStore.getState().setValue(instanceId, value)
        onValueChange?.(value)
      }}
      {...rest}
    >
      {mentionNode}
      {!isExpand && (
        <div>
          <div
            className={cn(
              ' mx-5 mb-5.5 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'has-[:focus]:border-primary has-[:focus]:ring-[var(--primary)] has-[:focus]:ring-[2px]',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden',
              className,
            )}
          >
            {renderCoreElement()}
          </div>
          <FooterTooltip />
        </div>
      )}
      <ExpandBottomDrawer instanceId={instanceId} containerRef={expandContainerRef}>
        {isExpand ? renderCoreElement(true) : null}
      </ExpandBottomDrawer>
    </Slate>
  )
}
