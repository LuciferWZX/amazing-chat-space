import { Button, LucideIcons, Tooltip } from '@amazing-chat/ui'

const { Smile, Image } = LucideIcons
const Toolbox = () => {
  const tools = [
    {
      label: '表情 Ctrl+R',
      icon: Smile,
      key: 'face',
    },
    {
      label: '图片 Ctrl+G',
      icon: Image,
      key: 'image',
    },
  ]
  return (
    <header className={'flex gap-1'}>
      {tools.map(tool => (
        <Tooltip asChild={true} key={tool.key} tips={tool.label}>
          <Button aria-label={tool.label} variant={'ghost'} className={'text-muted-foreground size-6'} size={'icon'}>
            <tool.icon className={'size-4'} />
          </Button>
        </Tooltip>
      ))}
    </header>
  )
}
export default Toolbox
