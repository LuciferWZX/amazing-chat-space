import { cn } from '@amazing-chat/ui'
import { useFocused } from 'slate-react'

function FooterTooltip() {
  const focused = useFocused()

  return (
    <div
      className={cn(
        'absolute opacity-0 right-5 text-xs text-muted-foreground bottom-1.5 leading-3 transition-opacity duration-300',
        {
          'opacity-100': focused,
        },
      )}
    >
      Shift + Enter 换行
    </div>
  )
}
export default FooterTooltip
