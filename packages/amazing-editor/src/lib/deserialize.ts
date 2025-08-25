import type { Descendant } from 'slate'
import { jsx } from 'slate-hyperscript'
import { match } from 'ts-pattern'

export function deserialize(el: ChildNode, markAttributes = {}): (Descendant | string)[] | Descendant | string | null {
  if (el.nodeType === Node.TEXT_NODE) {
    return jsx('text', markAttributes, el.textContent)
  }
  else if (el.nodeType !== Node.ELEMENT_NODE) {
    return null
  }
  const nodeAttributes: any = { ...markAttributes }
  switch (el.nodeName) {
    case 'STRONG':{
      nodeAttributes.bold = true
    }
  }
  const children = Array.from(el.childNodes).map(child => deserialize(child, nodeAttributes)).flat()
  if (children.length === 0) {
    children.push(jsx('text', nodeAttributes, ''))
  }
  return match(el.nodeName)
    .with('BODY', () => {
      return jsx('fragment', {}, children)
    })
    .with('P', () => {
      return jsx('element', { type: 'paragraph' }, children)
    })
    .with('BR', () => {
      return `\n`
    })
    .with('MENTION', () => {
      const mel = el as any
      const value = mel.getAttribute('data-mention-value')
      const label = mel.getAttribute('data-label')
      const trigger = mel.getAttribute('data-trigger')
      return jsx('element', { type: 'mention', value, label, trigger }, children)
    })
    .otherwise(() => {
      return children
    }) as (Descendant | string)[] | Descendant | string | null
}
