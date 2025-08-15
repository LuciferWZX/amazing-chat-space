import type { ComponentProps } from 'react'
import { cn } from '@amazing-chat/ui'

interface MaskProps extends ComponentProps<'div'> {

}
export function Mask(props: MaskProps) {
  const { className, ...rest } = props
  return <div className={cn('absolute z-50 inset-0 bg-black/50', className)} {...rest} />
}
