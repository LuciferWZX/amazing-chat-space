import { withMention } from "@/core/elements/mention/with-mention.ts";
import { consumePlugins } from "@/lib/consume-plugins";
import { useState } from "react";
import { createEditor, Editor } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
const useCoreEditor=()=>{
    const [editor]=useState<Editor>(()=>{

        const plugins:Editor[] = [
            withMention,
            withHistory,
            withReact
        ].reverse()
        return consumePlugins(createEditor(),plugins)
    })
    return editor
}
export default useCoreEditor;