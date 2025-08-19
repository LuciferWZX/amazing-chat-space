
import {createFormHook,createFormHookContexts} from '@tanstack/react-form'
import SubscribeButton from "@/components/forms/subscribe-button.tsx";
import TextField from "@/components/forms/text-field.tsx";

const {fieldContext,formContext,useFormContext,useFieldContext}=createFormHookContexts()
const {useAppForm}=createFormHook({
    fieldComponents:{
        TextField,
    },
    formComponents:{
        SubscribeButton
    },
    fieldContext,
    formContext
})
export  {useAppForm,useFormContext,useFieldContext}