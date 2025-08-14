import { cn, LucideIcons, Tooltip } from '@amazing-chat/ui'

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
          <button
            type='button'
            onClick={() => {
              console.warn('click')
            }}
            className={cn(
              'bg-input text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground  focus-visible:ring-ring/50 inline-flex size-6 items-center justify-center rounded text-sm transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
            )}
            aria-label={tool.label}
          >
            <tool.icon className={'size-4'} />
          </button>
        </Tooltip>
      ))}
    </header>
  )
}
export default Toolbox
