import {useFieldContext} from "@/hooks/use-app-form.tsx";
import {Input} from "@amazing-chat/ui";
import {type ComponentProps, useMemo} from "react";
import FormField from "./form-field.tsx";
interface TextFieldsProps extends ComponentProps<typeof Input>{
    label?:string
}
const TextField = (props:TextFieldsProps) => {
    const {label,value,onChange,onBlur,...restProps}=props
    const field = useFieldContext<string>()
    const mergedValue = useMemo(()=>{
        if (value){
            return value
        }
        return field.state.value
    },[value,field.state.value]) 
    return(
        <FormField label={label}>
            <Input
                {...restProps}
                value={mergedValue}
                onChange={e=>{
                    onChange?.(e)
                    field.handleChange(e.target.value)
                }}
                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                onBlur={(e)=>{
                    onBlur?.(e)
                    field.handleBlur()
                }}
            />
        </FormField>
    )
}
export default TextField