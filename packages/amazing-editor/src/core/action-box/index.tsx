import Toolbox from '@/core/toolbox'
import { Button, LucideIcons, Separator,Tooltip } from '@amazing-chat/ui'


const { SendHorizontal } = LucideIcons
const ActionBox = () => {
  return (
    <footer className={'box-border flex flex-row-reverse gap-2 py-2.5 pr-2'}>
        <Tooltip asChild={true}  tips={'发送 (Enter)'}>
          <Button size={'icon'} className={'size-6'} variant={'ghost'}>
            <SendHorizontal className={'size-4 text-primary'} />
          </Button>
        </Tooltip>
      <Separator orientation={'vertical'} />
      <Toolbox />
    </footer>
  )
}
export default ActionBox
