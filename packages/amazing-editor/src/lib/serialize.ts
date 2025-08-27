import type { Descendant } from 'slate'
import escapeHtml from 'escape-html'
import { Text } from 'slate'
import { match } from 'ts-pattern'
/**
 * 序列化编辑器内容为HTML
 * @param node 编辑器内容
 * @returns 序列化后的HTML
 */
export function serialize(node: Descendant): string {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    if (node.italic) {
      string = `<em>${string}</em>`
    }
    if (node.underline) {
      string = `<u>${string}</u>`
    }
    if (node.strikethrough) {
      string = `<s>${string}</s>`
    }
    if (node.color) {
      string = `<span style="color: ${node.color}">${string}</span>`
    }
    return string
  }
  const children = node.children.map(n => serialize(n)).join('')
  return match(node)
    .with({ type: 'paragraph' }, () => `<p>${children}</p>`)
    .with({ type: 'mention' }, (mentionNode) => {
      const text = `${mentionNode.trigger}${mentionNode.character}`
      return `<span class="amazing-mention" data-trigger="${mentionNode.trigger}" data-mention-value="${mentionNode.value}" data-label="${mentionNode.character}">${text}</span>`
    })
    .with({ type: 'emoji' }, (emojiNode) => {
      return `<img class="amazing-emoji" data-url="${emojiNode.url}" data-unified="${emojiNode.unified}" data-emoji="${emojiNode.emoji}" />`
    })
    .otherwise(() => children)
}
