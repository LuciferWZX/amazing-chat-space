import {useFieldContext} from "@/hooks/use-app-form.tsx";
import {cn, Input} from "@amazing-chat/ui";
import {type ComponentProps,type ReactNode} from "react";
import FieldErrorInfo from "./field-error-info.tsx";
interface TextFieldsProps extends ComponentProps<typeof Input>{
    label?:string
    children?:ReactNode
    layout?:'horizontal' | 'vertical'
}
const FormField = (props:TextFieldsProps) => {
    const {label,children,layout='vertical'}=props
    const field = useFieldContext<string>()
    return(
        <div>
            <div className={cn("flex gap-1",{
                "items-center":layout==='horizontal',
                "flex-col":layout==='vertical'
            })}>
                {label&&(
                    <div className={cn("leading-5 mb-1 flex-shrink-0")}>
                        <label>{label}</label>
                    </div>
                )}
                <div className={cn("flex-1")}>
                    {children}
                </div>
            </div>
             <FieldErrorInfo field={field} />
        </div>
    )
}
export default FormField