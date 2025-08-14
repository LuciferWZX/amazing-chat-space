import { MentionBox, Portal } from '@/components'
import type { MentionConfig, MentionDataItem } from '@/core'
import { EditorCommand } from '@/lib/command.ts'
import { isHotkey } from 'is-hotkey'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Editor, Node, Range } from 'slate'
import { ReactEditor } from 'slate-react'

const useMentionSelection = (editor: Editor, mentions?: Array<MentionConfig>) => {
  const [targetRange, setTargetRange] = useState<Range | null>(null)
  const [keyword, setKeyword] = useState<string>('')
  const [mentionConfig, setMentionConfig] = useState<MentionConfig | null>(null)
  const mentionNodeRef = useRef<HTMLUListElement | null>(null)
  const [items, setItems] = useState<MentionDataItem[]>([])
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const fetchData = useCallback(async () => {
    let data = mentionConfig?.fetch ? await mentionConfig.fetch(keyword) : (mentionConfig?.data ?? [])
    if (data.length > 0) {
      data = data.filter(item => item.label.startsWith(keyword))
    }
    if (data.length > 0) {
      setActiveKey(data[0].value)
    }
    setItems(data)
  }, [mentionConfig?.data, mentionConfig?.fetch, keyword])
  const onChangeWithMention = () => {
    if (!mentions || mentions.length === 0) {
      return
    }
    const { selection } = editor
    if (selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const [startNode] = Editor.node(editor, anchor)
      const textBeforeCursor = Node.string(startNode).slice(0, anchor.offset)
      let atIndex = -1
      let mentionConfig: MentionConfig | null = null
      for (const mention of mentions) {
        const curIndex = textBeforeCursor.lastIndexOf(mention.trigger)
        if (curIndex === -1) {
          //说明没找到关键词
          continue
        }
        //说明找到关键词了
        atIndex = curIndex
        mentionConfig = mention
        break
      }
      if (atIndex !== -1) {
        const searchText = textBeforeCursor.slice(atIndex)
        const mentionRange = Editor.range(editor, { ...anchor, offset: atIndex }, anchor)
        setTargetRange(mentionRange)
        //searchText去除前面的trigger
        const keywordWithoutTrigger = searchText.slice(mentionConfig?.trigger.length ?? 0)
        setKeyword(keywordWithoutTrigger)
        setMentionConfig(mentionConfig)
        // editor.selection=mentionRange
      } else {
        setTargetRange(null)
        setKeyword('')
        setMentionConfig(null)
      }
    }
  }
  const getNextItemKey = (active: string | null, data: MentionDataItem[]) => {
    if (data.length === 0) {
      return null
    }
    if (active === null) {
      return data[0].value
    }
    const index = data.findIndex(item => item.value === active)
    if (index === -1 || index === data.length - 1) {
      return data[0].value
    }
    const target = data[index + 1]
    if (target?.disabled) {
      return getNextItemKey(target.value, data)
    }
    return target.value
  }
  const getPrevItemKey = (active: string | null, data: MentionDataItem[]) => {
    if (active === null) {
      return data[0].value
    }
    const index = data.findIndex(item => item.value === active)
    if (index === -1) {
      return data[0].value
    }
    if (index === 0) {
      return data[data.length - 1].value
    }
    const target = data[index - 1]
    if (target?.disabled) {
      return getPrevItemKey(target.value, data)
    }
    return target.value
  }
  const onKeydownWithMention = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (items.length > 0 && targetRange) {
        if (isHotkey('up', e)) {
          e.preventDefault()
          console.warn('up')
          const nextKey = getPrevItemKey(activeKey, items)
          setActiveKey(nextKey)
        }
        if (isHotkey('down', e)) {
          e.preventDefault()
          console.warn('down')
          const nextKey = getNextItemKey(activeKey, items)
          setActiveKey(nextKey)
        }
        if (isHotkey(['tab', 'enter'], e)) {
          e.preventDefault()
          console.warn('选中')
          const target = items.find(item => item.value === activeKey)
          if (target) {
            // Transforms.select(editor,targetRange)
            EditorCommand.insertMention(editor, targetRange, {
              character: target.label,
              trigger: mentionConfig?.trigger ?? '',
              value: target.value,
            })
          }
        }
      }
    },
    [editor, items, activeKey, targetRange],
  )
  //获取下拉框数据
  useEffect(() => {
    fetchData()
  }, [mentionConfig, keyword])
  //渲染下拉框
  useEffect(() => {
    if (targetRange && mentionConfig && items && items.length > 0) {
      const el = mentionNodeRef.current
      if (el) {
        const domRange = ReactEditor.toDOMRange(editor, targetRange)
        const rect = domRange.getBoundingClientRect()
        el.style.left = `${rect.left + window.pageXOffset}px`
        if (rect.bottom + el.offsetHeight > window.innerHeight) {
          el.style.top = `${rect.bottom - el.offsetHeight - rect.height}px`
        } else {
          el.style.top = `${rect.top + window.pageYOffset + 24}px`
        }
        if (rect.left + el.offsetWidth > window.innerWidth) {
          el.style.left = `${rect.right - el.offsetWidth - rect.width}px`
        } else {
          el.style.left = `${rect.left + window.pageXOffset}px`
        }

        el.style.zIndex = '100'
      }
    }
  }, [targetRange, editor, mentionConfig, items])

  //下拉框节点
  const mentionNode = useMemo(() => {
    if (mentionConfig && targetRange && items && items.length > 0) {
      return (
        <Portal>
          <MentionBox
            onClick={evt => {
              evt.preventDefault()
              ReactEditor.focus(editor)
            }}
            activeKey={activeKey}
            items={items}
            onClickItem={(_evt, item) => {
              EditorCommand.insertMention(editor, targetRange, {
                character: item.label,
                trigger: mentionConfig?.trigger ?? '',
                value: item.value,
              })
            }}
            config={mentionConfig}
            keyword={keyword}
            ref={mentionNodeRef}
          />
        </Portal>
      )
    }
  }, [mentionConfig, targetRange, items, keyword, activeKey])
  return {
    onChangeWithMention,
    mentionNode,
    onKeydownWithMention,
  }
}
export default useMentionSelection
