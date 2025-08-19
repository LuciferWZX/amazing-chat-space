import { cn } from "@amazing-chat/ui"
import type { AnyFieldApi } from "@tanstack/react-form"
import { useMemo } from "react"

function FieldErrorInfo({ field }: { field: AnyFieldApi }) {
  const firstError = useMemo(()=>{
    return field.state.meta.errors?.[0]
  },[field.state.meta.errors])
  return (
    <div className="min-h-5">
      {field.state.meta.isTouched && !field.state.meta.isValid
        ? <div className={cn("text-red-500 text-xs leading-5")}>{firstError.message}</div>
        : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </div>
  )
}
export default FieldErrorInfo