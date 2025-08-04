import type { ComponentProps } from "react"
import React from "react"
import type { FieldValues, UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

interface BaseFormItemProps extends Omit<ComponentProps<typeof FormField>,"render"|"control"> {
    form:UseFormReturn<FieldValues>
    children: React.ReactElement
}

const BaseFormItem = (props:BaseFormItemProps) => {
    const {form,...rest} = props

    return(
        <FormField
            control={form.control}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    {React.cloneElement(rest.children, field)}
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            {...rest}
        />
    )
}
export default BaseFormItem