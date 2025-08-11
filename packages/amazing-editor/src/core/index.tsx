import useCoreEditor from "@/hooks/use-core-editor"
import { AmazingEditor } from "@/instance/amazing-editor"
import { cn,ScrollArea } from "@amazing-chat/ui"
import type {ComponentProps} from "react"
import { Editable, Slate } from "slate-react"
import "./index.css"
import Toolbox from "@/core/toolbox";
import ActionBox from "@/core/action-box";

interface CoreEditorProps extends Partial<Omit<ComponentProps<typeof Slate>,"editor"|"children">>{
    className?:string
    placeholder?:string
    classes?:{
        viewport?:string
    }
}
export const CoreEditor=(props:CoreEditorProps)=>{
    const {className,initialValue,placeholder,classes,...rest} = props
    const editor = useCoreEditor()

    return(

        <div
            className={cn(
            'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            "has-[:focus]:border-primary has-[:focus]:ring-[var(--primary)] has-[:focus]:ring-[2px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
        )}>
            <Slate
                editor={editor}
                initialValue={initialValue ?? AmazingEditor.emptyValue}
                {...rest}>
                <Toolbox/>
                <ScrollArea
                    type={'always'}
                    classes={{
                        viewport:classes?.viewport
                    }}
                    >
                    <Editable
                        className={cn('mx-3 my-1 outline-none')}
                        placeholder={placeholder}
                    />
                </ScrollArea>
                <ActionBox/>
            </Slate>
        </div>
    )
}