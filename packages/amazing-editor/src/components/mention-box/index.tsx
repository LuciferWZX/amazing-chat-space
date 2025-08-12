import type { MentionConfig, MentionDataItem } from '@/core'
import { cn, ScrollArea } from '@amazing-chat/ui'
import {type ComponentProps, useCallback} from 'react'
import MentionItem from './mention-item'
import Highlighter from "react-highlight-words";

interface MentionBoxProps extends ComponentProps<'ul'> {
  config: MentionConfig
  keyword: string
  items: MentionDataItem[]
  activeKey: string | null
}
export const MentionBox = (props: MentionBoxProps) => {
  const { className, config, keyword, activeKey, items, ...rest } = props
  const highlightWrapper = useCallback((label:string)=>{
    return (
        <Highlighter
            highlightClassName={"bg-[unset] text-primary"}
            searchWords={[keyword]}
            autoEscape={true}
            textToHighlight={label}
        />
    )
  },[keyword])
  return (
    <ul
      className={cn('absolute top-0 left-0 z-0 w-[200px] bg-card border border-border rounded-md shadow-md', className)}
      {...rest}
    >
      <ScrollArea classes={{ viewport: 'max-h-[200px] p-3' }}>
        {items.map(item => {
          return (
            <MentionItem
              key={item.value}
              disabled={item.disabled}
              className={config.className}
              label={item.label}
              active={activeKey === item.value}
            >
              {config.renderItem ? config.renderItem(item) : highlightWrapper(item.label)}
            </MentionItem>
          )
        })}
      </ScrollArea>
    </ul>
  )
}
