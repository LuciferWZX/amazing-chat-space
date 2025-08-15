import type { Descendant, Editor } from 'slate'
import { create } from 'zustand'
import { AmazingEditorManager } from '@/instance/amazing-editor'

export interface EditorInstance {
  id: string
  editor: Editor
  value: Descendant[]
  isExpand?: boolean
}
interface EditorStoreState {
  instances: Map<string, EditorInstance>
}
interface Actions {
  initInstance: (editor: Editor, id: string, value?: Descendant[]) => void
  setValue: (id: string, value: Descendant[]) => void
  setInstanceProps: (id: string, props: Partial<EditorInstance>) => void
}
const initialState: EditorStoreState = {
  instances: new Map(),
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
    console.warn('instance', instance)
    console.warn('props', props)
    if (instance) {
      set((state) => {
        return {
          instances: state.instances.set(id, { ...instance, ...props }),
        }
      })
    }
  },
}))
