import { serialize } from "@/lib/serialize"
import { useEditorStore, type EditorInstance } from "@/stores/use-editor-store"
import { Element, Node, Text, type Descendant } from "slate"

export class AmazingEditorManager{
   
    
    static emptyValue: Descendant[] = [
        {
            type: "paragraph",
            children: [{text: ""}]
        }
    ]   
    
    /**
     * 获取编辑器状态实例
     * @param id 实例id
     * @returns 编辑器实例
     */
    static getEditorInstance(id: string): EditorInstance | undefined {
        const instances = useEditorStore.getState().instances
        return instances.get(id)
    }
    /**
     * 序列化编辑器内容为HTML
     * @param value 编辑器内容
     * @returns 序列化后的HTML
     */
    static serialize(value:Descendant[]):string{
        return value.map(v=>serialize(v)).join('\n')
    }
    /**
     * 获取编辑器内容为纯文本
     * @param value 编辑器内容
     * @returns 纯文本
     */
    static getText(value:Descendant[]):string{
        const transformVoidToText = (nodes:Descendant[]):Descendant[]=>{
            return nodes.map(node=>{
                if(Text.isText(node)){
                    return node
                }
                if (Element.isElement(node)) {
                    if (node.type === "mention") {
                        return {
                            text:`${node.trigger}${node.character}`
                        }
                    }
                    return {
                        ...node,
                        children:transformVoidToText(node.children)
                    } as Descendant
                }
                return node
            })
        }
        const transformedNodes = transformVoidToText(value)
        console.warn("transformedNodes",transformedNodes);
        
        return transformedNodes.map(tn=>Node.string(tn)).join('\n')
    }
    /**
     * 判断编辑器内容是否为空
     * @param value 编辑器内容
     * @returns 是否为空
     */
    static isEmpty(value:Descendant[]):boolean{
        const pureText = this.getText(value)
        //替换空格和换行符
        const pureTextWithoutSpace = pureText.replace(/\s/g, "")
        return pureTextWithoutSpace === ""
    }
}