import type { MentionElement } from "@/types";
import { Editor, Range, Transforms } from "slate";
import { HistoryEditor } from "slate-history";

export const EditorCommand = {
    //是否加粗
    isBold(editor:Editor){
        const marks = Editor.marks(editor)
        return !!marks?.bold
    },
    //是否斜体
    isItalic(editor:Editor){
        const marks = Editor.marks(editor)
        return !!marks?.italic
    },
    //是否下划线
    isUnderline(editor:Editor){
        const marks = Editor.marks(editor)
        return !!marks?.underline
    },
    //是否删除线
    isStrikethrough(editor:Editor){
        const marks = Editor.marks(editor)
        return !!marks?.strikethrough
    },
    //是否颜色
    hasColor(editor:Editor){
        const marks = Editor.marks(editor)
        return !!marks?.color
    },
    //是否背景色
    hasBackgroundColor(editor:Editor){
        const marks = Editor.marks(editor)
        return !!marks?.backgroundColor
    },
    insertMention(
        editor:Editor,
        at:Range,
        mentionParams:{
            character:string
            value:string
            trigger:string
        }){

        const mention:MentionElement={
            type:'mention',
            trigger:mentionParams.trigger,
            character:mentionParams.character,
            value:mentionParams.value,
            children:[{text:""}]
        }
        HistoryEditor.withNewBatch(editor,()=>{
            Transforms.select(editor,at)
            Transforms.insertNodes(editor,mention)
            Transforms.move(editor)
        })

        
    }
}