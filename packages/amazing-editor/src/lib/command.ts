import { Editor } from "slate";

const EditorCommand = {
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
    }
}