import type { Editor, Element } from 'slate'

export function withEmoji(editor: Editor) {
  const { isInline, isSelectable, isVoid, isElementReadOnly, markableVoid } = editor
  editor.isInline = (element: Element) => {
    return element.type === 'emoji' ? true : isInline(element)
  }
  editor.isElementReadOnly = (element: Element) => {
    return element.type === 'emoji' ? true : isElementReadOnly(element)
  }
  editor.isSelectable = (element: Element) => {
    return element.type === 'emoji' ? false : isSelectable(element)
  }
  editor.isVoid = (element: Element) => {
    return element.type === 'emoji' ? true : isVoid(element)
  }
  editor.markableVoid = (element: Element) => {
    return element.type === 'mention' || markableVoid(element)
  }
  return editor
}
