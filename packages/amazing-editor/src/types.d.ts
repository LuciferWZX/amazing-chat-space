import type { HistoryEditor } from 'slate-history'
import type { ReactEditor } from 'slate-react'

interface CustomText {
  // 文本
  text: string
  // 加粗
  bold?: boolean
  // 斜体
  italic?: boolean
  // 下划线
  underline?: boolean
  // 删除线
  strikethrough?: boolean
  // 颜色
  color?: string
  // 背景色
  backgroundColor?: string
}
interface ParagraphElement {
  type: 'paragraph'
  children: CustomText[]
}
interface EmojiElement {
  type: 'emoji'
  unified: string
  url?: string
  emoji: string
  children: CustomText[]
}
interface MentionElement {
  type: 'mention'
  trigger: string
  character: string
  children: CustomText[]
  value: string
}
type CustomElement = ParagraphElement | MentionElement | EmojiElement
declare module 'slate' {
  interface CustomTypes {
    Editor: ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}
export type ToolbarActionType = 'emoji' | 'image' | 'expand' | 'close'
export interface ToolItem {
  label: string
  key: string
  icon: LucideIcon
  hidden?: boolean
  onClick?: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
