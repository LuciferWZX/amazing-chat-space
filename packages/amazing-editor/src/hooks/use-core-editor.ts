import type { Editor } from 'slate'
import { useState } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'
import { withEmoji } from '@/core/elements/emoji/with-emoji'
import { withMention } from '@/core/elements/mention/with-mention.ts'
import { consumePlugins } from '@/lib/consume-plugins'

function useCoreEditor() {
  const [editor] = useState<Editor>(() => {
    const plugins: Editor[] = [
      withEmoji,
      withMention,
      withHistory,
      withReact,
    ].reverse()
    const editor = consumePlugins(createEditor(), plugins)

    return editor
  })

  return editor
}
export default useCoreEditor
