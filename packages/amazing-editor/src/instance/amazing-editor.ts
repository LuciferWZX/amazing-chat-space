import type { Descendant, Editor } from 'slate'
import type { EditorInstance } from '@/stores/use-editor-store'
import type { ToolbarActionType } from '@/types'
import { events } from '@amazing-chat/shared'
import { Element, Node, Text, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { match } from 'ts-pattern'
import { deserialize } from '@/lib/deserialize'
import { serialize } from '@/lib/serialize'
import { useEditorStore } from '@/stores/use-editor-store'

export class AmazingEditorManager {
  static emptyValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]

  /**
   * 获取编辑器状态实例
   * @param id 实例id
   * @returns 编辑器实例
   */
  static getEditorInstance(id: string): EditorInstance | undefined {
    const instances = useEditorStore.getState().instances
    return instances.get(id)
  }

  /**
   * 反序列化HTML为编辑器内容
   * @param html HTML字符串
   * @returns 编辑器内容
   */
  static deserialize(html: string): Descendant[] {
    const document = new DOMParser().parseFromString(html, 'text/html')
    return deserialize(document.body) as Descendant[]
  }

  /**
   * 序列化编辑器内容为HTML
   * @param value 编辑器内容
   * @returns 序列化后的HTML
   */
  static serialize(value: Descendant[]): string {
    return value.map(v => serialize(v)).join('\n')
  }

  /**
   * 从HTML中获取纯文本
   * @param html HTML字符串
   * @returns 纯文本
   */
  static getTextFromHtml(html: string): string {
    const value = this.deserialize(html)
    return this.getText(value)
  }

  /**
   * 获取编辑器内容为纯文本
   * @param value 编辑器内容
   * @returns 纯文本
   */
  static getText(value: Descendant[]): string {
    const transformVoidToText = (nodes: Descendant[]): Descendant[] => {
      return nodes.map((node) => {
        if (Text.isText(node)) {
          return node
        }
        if (Element.isElement(node)) {
          if (node.type === 'mention') {
            return {
              text: `${node.trigger}${node.character}`,
            }
          }
          if (node.type === 'emoji') {
            return {
              text: `<img src="${node.url}" alt="${node.emoji}" class='amazing-emoji' />`,
            }
          }
          return {
            ...node,
            children: transformVoidToText(node.children),
          } as Descendant
        }
        return node
      })
    }
    return transformVoidToText(value)
      .map(tn => Node.string(tn))
      .join('\n')
  }

  /**
   * 判断编辑器内容是否为空
   * @param value 编辑器内容
   * @returns 是否为空
   */
  static isEmpty(value: Descendant[]): boolean {
    const pureText = AmazingEditorManager.getText(value)
    // 替换空格和换行符
    const pureTextWithoutSpace = pureText.replace(/\s/g, '')
    return pureTextWithoutSpace === ''
  }

  /**
   * 发送消息
   * @param instanceId 实例id
   * @param type 发送类型
   */
  static sendMessage(instanceId: string, type: 'keyboard' | 'button') {
    const value = useEditorStore.getState().instances.get(instanceId)?.value
    if (value) {
      // 发送消息
      events.emit(`message:send:${instanceId}`, {
        type,
        value,
      })
      // 清空编辑器
      const editor = useEditorStore.getState().instances.get(instanceId)!.editor
      this.clearEditor(editor)
    }
  }

  static handleAction(instanceId: string, action: ToolbarActionType) {
    match(action)
      .with('emoji', () => {
        console.warn('emoji')
      })
      .with('image', () => {
        console.warn('image')
      })
      .with('expand', () => {
        console.warn('expand')
        useEditorStore.getState().setInstanceProps(instanceId, { isExpand: true })
      })
      .with('close', () => {
        console.warn('close')
        useEditorStore.getState().setInstanceProps(instanceId, { isExpand: false })
      })
      .exhaustive()
  }

  /**
   * 清空编辑器
   * @param editor 编辑器实例
   */
  static clearEditor(editor: Editor) {
    editor.children = AmazingEditorManager.emptyValue
    Transforms.select(editor, [0, 0])
    ReactEditor.focus(editor)
    editor.onChange()
    editor.history = { undos: [], redos: [] } // 手动清空历史
  }

  static focusVoidElement(editor: Editor, node: Node, ele: HTMLElement, clientX: number) {
    const rect = ele.getBoundingClientRect()
    // 计算点击点是否在中心线右侧
    const isClickOnRight = clientX > (rect.left + rect.width / 2)

    // 获取当前节点在 Slate 中的路径
    const elementPath = ReactEditor.findPath(editor, node)

    // 根据点击位置决定目标位置
    const targetPoint = isClickOnRight
      ? editor.after(elementPath) // 右侧 → 节点后
      : editor.before(elementPath) // 左侧 → 节点前

    // 如果找到了有效位置，设置光标
    if (targetPoint) {
      Transforms.select(editor, {
        anchor: targetPoint,
        focus: targetPoint,
      })
    }

    // 确保编辑器获得焦点
    ReactEditor.focus(editor)
  }
}
