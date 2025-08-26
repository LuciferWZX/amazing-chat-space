import type { Editor, Element } from 'slate'

export function withMention(editor: Editor) {
  const { isInline, isVoid, markableVoid } = editor
  editor.isInline = (element: Element) => {
    return element.type === 'mention' ? true : isInline(element)
  }
  editor.isVoid = (element: Element) => {
    return element.type === 'mention' ? true : isVoid(element)
  }
  editor.markableVoid = (element: Element) => {
    return element.type === 'mention' || markableVoid(element)
  }
  return editor
}
