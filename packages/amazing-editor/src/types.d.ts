import type { ReactEditor } from "slate-react"

type CustomText = {
    text:string
}
type  CustomElement = {
    type:"paragraph",
    children:CustomText[]
}
declare module "slate" {
    interface CustomTypes{
        Editor:CustomEditor & ReactEditor
        Element:CustomElement
        Text:CustomText
    }
}

