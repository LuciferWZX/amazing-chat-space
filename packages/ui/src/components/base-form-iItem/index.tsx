import { cn } from "@/lib/utils"
import type { ComponentProps, ReactElement, ReactNode } from "react"
import React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

interface BaseFormItemProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ComponentProps<typeof FormField<TFieldValues, TName>>,"render"> {
    children: ReactElement
    label?: ReactNode
    description?: ReactNode
    showFormMessage?: boolean
    classes?:{
        label?:string
    }
}

export const BaseFormItem = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: BaseFormItemProps<TFieldValues, TName>) => {
    const {label,description,showFormMessage,classes,...rest} = props

    return(
        <FormField<TFieldValues, TName>
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel className={cn('',classes?.label)}>{label}</FormLabel>}
                    <FormControl>
                        {React.cloneElement(rest.children, field)}
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    {showFormMessage!==false && <FormMessage/>}
                </FormItem>
            )}
            {...rest}
        />
    )
}
