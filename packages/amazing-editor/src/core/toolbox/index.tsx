import { Button, LucideIcons } from "@amazing-chat/ui";
const {Smile}=LucideIcons
const Toolbox = () => {
    const tools=[
        {
            label:"表情 Ctrl+R",
            icon:Smile,
            key:"face",
        }
    ]
  return(
      <header className={'mx-2 mt-1'}>
        {tools.map((tool)=>(
            <Button key={tool.key} aria-label={tool.label} variant={'ghost'}  className={'text-muted-foreground size-7'} size={'icon'}>
                <tool.icon className={'size-5'}/>
            </Button>
        ))}
          <Button aria-label="表情 Ctrl+R" variant={'ghost'}  className={'text-muted-foreground size-7'} size={'icon'}>
              <Smile className={'size-5'}/>
          </Button>
      </header>
  )
}
export default Toolbox