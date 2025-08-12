import ActionBox from "@/core/action-box"
import Toolbox from "@/core/toolbox"
import useCoreEditor from "@/hooks/use-core-editor"
import useMentionSelection from "@/hooks/use-mention-selection"
import useRender from "@/hooks/use-render"
import { AmazingEditor } from "@/instance/amazing-editor"
import { cn, ScrollArea } from "@amazing-chat/ui"
import { useMemo, type ComponentProps, type ReactNode } from "react"
import { Editable, Slate } from "slate-react"
import "./index.css"

export interface MentionConfig{
    trigger:string
    fetch?:(keyword:string)=>Promise<MentionDataItem[]>
    data?:MentionDataItem[],
    className?:string
    renderItem?:(item:MentionDataItem)=>ReactNode
}
export interface MentionDataItem{
    label:string
    value:string
    disabled?:boolean
}
interface CoreEditorProps extends Partial<Omit<ComponentProps<typeof Slate>,"editor"|"children">>{
    className?:string
    placeholder?:string
    classes?:{
        viewport?:string
    }
    config?:{
        footer?:ReactNode|null
    }
    /**
     * @description 如果有fetch方法，则每次输入时都会调用fetch方法获取数据
     * 如果没有fetch方法，则使用data数据
     */
    mentions?:Array<MentionConfig>
}
export const CoreEditor=(props:CoreEditorProps)=>{
    const {className,initialValue,onChange,placeholder,classes,config,mentions,...rest} = props
    const editor = useCoreEditor()
    const {renderElement,renderLeaf}=useRender()
    const {onChangeWithMention,mentionNode,onKeydownWithMention}=useMentionSelection(editor,mentions)
    const footerElement=useMemo(()=>{
        if(config?.footer){
            return config.footer
        }
        if(config?.footer===null){
            return null
        }
        return <ActionBox/>
    },[config?.footer])

    return(
        <div
            className={cn(
            'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            "has-[:focus]:border-primary has-[:focus]:ring-[var(--primary)] has-[:focus]:ring-[2px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
        )}>
            {mentionNode}
            <Slate
                editor={editor}
                initialValue={initialValue ?? AmazingEditor.emptyValue}
                onChange={(selection)=>{
                    onChangeWithMention()
                    onChange?.(selection)
                }}
                {...rest}>
                <Toolbox/>
                <ScrollArea
                    type={'always'}
                    classes={{
                        viewport:classes?.viewport
                    }}
                    >
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        className={cn('mx-3 my-1 outline-none break-all')}
                        placeholder={placeholder}
                        onKeyDown={(e)=>{
                            onKeydownWithMention(e)
                        }}

                    />
                </ScrollArea>
                {footerElement}
            </Slate>
        </div>
    )
}