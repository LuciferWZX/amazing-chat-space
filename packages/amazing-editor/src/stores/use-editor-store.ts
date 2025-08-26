import type { Descendant, Editor } from 'slate'
import { create } from 'zustand'
import { AmazingEditorManager } from '@/instance/amazing-editor'
import appleEmoji from '@/resources/emoji.json'

export interface Emoji {
  shortName: string
  emoji: string
  category: string
  subCategory: string
  url: string
  image: string
  unified: string
  keywords?: string[]
}
export type EmojiMap = Map<string, Emoji[]>
export interface EditorInstance {
  id: string
  editor: Editor
  value: Descendant[]
  isExpand?: boolean

}
interface EditorStoreState {
  instances: Map<string, EditorInstance>
  emojis: EmojiMap
  arrEmojis: Array<[string, Emoji[]]>
}
interface Actions {
  initInstance: (editor: Editor, id: string, value?: Descendant[]) => void
  setValue: (id: string, value: Descendant[]) => void
  setInstanceProps: (id: string, props: Partial<EditorInstance>) => void
}
function initEmojis() {
  const emojisMap = new Map<string, Emoji[]>()
  // const categories = ['Smileys & Emotion', 'People & Body', 'Animals & Nature', 'Food & Drink', 'Travel & Places', 'Activities', 'Objects', 'Symbols', 'Flags']
  const subCategory = ['face-smiling', 'face-affection', 'face-tongue', 'face-hand', 'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat', 'face-glasses', 'face-concerned']
  subCategory.forEach((category) => {
    emojisMap.set(category, [])
  })
  appleEmoji
    .filter((item: any) => item.has_img_apple && item.unified)
    .forEach((emoji: any) => {
      const subCategory = emoji.subcategory
      if (!emojisMap.has(subCategory)) {
        // emojisMap.set(subCategory, [])
        return
      }
      emojisMap.get(subCategory)?.push({
        shortName: emoji.short_name as string,
        url: `https://cdnjs.cloudflare.com/ajax/libs/emoji-datasource-apple/15.1.2/img/apple/64/${emoji.image}`,
        emoji: String.fromCodePoint(...emoji.unified.split('-').map(h => `0x${h}`)),
        category: emoji.category,
        subCategory: emoji.subcategory,
        image: emoji.image,
        unified: emoji.unified,
      })
    })

  return emojisMap
}
const emojis = initEmojis()
const initialState: EditorStoreState = {
  instances: new Map(),
  emojis,
  arrEmojis: Array.from(emojis.entries()),
}
export const useEditorStore = create<EditorStoreState & Actions>((set, get) => ({
  ...initialState,
  initInstance: (editor: Editor, id: string, value?: Descendant[]) => {
    const instanceValue = value || AmazingEditorManager.emptyValue
    if (get().instances.has(id)) {
      console.warn('[实例已存在]', id)
      return
    }
    const instance: EditorInstance = {
      id,
      editor,
      value: instanceValue,
      isExpand: false,
    }
    console.warn('[实例初始化]', id)
    set(state => ({
      instances: state.instances.set(id, instance),
    }))
  },
  setValue: (id: string, value: Descendant[]) => {
    set((state) => {
      const instance = state.instances.get(id)!
      return {
        instances: state.instances.set(id, {
          ...instance,
          value,
        }),
      }
    })
  },
  /**
   * 设置实例属性
   * @param id 实例ID
   * @param props 实例属性
   */
  setInstanceProps: (id: string, props: Partial<EditorInstance>) => {
    const instance = get().instances.get(id)
    if (instance) {
      set((state) => {
        return {
          instances: state.instances.set(id, { ...instance, ...props }),
        }
      })
    }
  },
}))
