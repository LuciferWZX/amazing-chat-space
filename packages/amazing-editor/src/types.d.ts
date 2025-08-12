import type { ReactEditor } from "slate-react"

type CustomText = {
    //文本
    text:string
    //加粗
    bold?:boolean
    //斜体
    italic?:boolean
    //下划线
    underline?:boolean
    //删除线
    strikethrough?:boolean
    //颜色
    color?:string
    //背景色
    backgroundColor?:string
}
type ParagraphElement={
    type:"paragraph",
    children:CustomText[]
}
type MentionElement={
    type:"mention",
    character:string,
    children:CustomText[],
    value:string
}
type  CustomElement = ParagraphElement|MentionElement
declare module "slate" {
    interface CustomTypes{
        Editor:CustomEditor & ReactEditor
        Element:CustomElement
        Text:CustomText
    }
}

