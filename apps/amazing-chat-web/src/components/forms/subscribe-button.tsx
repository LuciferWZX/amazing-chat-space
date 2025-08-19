import {useFormContext} from "@/hooks/use-app-form.tsx";
import {Button} from "@amazing-chat/ui";
import type {ComponentProps, ReactNode} from "react";
interface SubscribeButtonProps extends ComponentProps<typeof Button>{
    submittingText?:ReactNode   
}
const SubscribeButton=(props:SubscribeButtonProps)=>{
    const {disabled,submittingText,children,...restProps}=props
    const form = useFormContext()
    return(
        <form.Subscribe selector={state=>[state.canSubmit,state.isSubmitting]}>
            {([canSubmit,isSubmitting])=>{
                console.warn("canSubmit",canSubmit);
                console.warn("isSubmitting",isSubmitting);
                return(
                    <Button disabled={!canSubmit || disabled} type={'submit'} {...restProps}>
                        {isSubmitting?submittingText:children}
                    </Button>
                )
            }}
        </form.Subscribe>
    )
}
export default SubscribeButton