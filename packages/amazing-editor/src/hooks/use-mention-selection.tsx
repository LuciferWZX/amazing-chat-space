import { MentionBox, Portal } from "@/components"
import type { MentionConfig } from "@/core"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Editor, Node, Range } from "slate"
import { ReactEditor } from "slate-react"
const useMentionSelection=(editor:Editor,mentions?:Array<MentionConfig>)=>{
    const [targetRange,setTargetRange]=useState<Range|null>(null)
    const [keyword,setKeyword]=useState<string>("")
    const [mentionConfig,setMentionConfig]=useState<MentionConfig|null>(null)
    const mentionNodeRef = useRef<HTMLUListElement|null>(null)
   const onChangeWithMention=()=>{
    if (!mentions || mentions.length === 0) {
        return
    }
    const {selection}=editor
    if (selection && Range.isCollapsed(selection)) {
        const {anchor}=selection
        const [startNode]=Editor.node(editor,anchor)    
        const textBeforeCursor = Node.string(startNode).slice(0,anchor.offset)
        console.warn("textBeforeCursor:",textBeforeCursor);
        let atIndex = -1
        let mentionConfig:MentionConfig|null=null
        for (const mention of mentions) {
            const curIndex=textBeforeCursor.lastIndexOf(mention.trigger)
            if (curIndex === -1) {
                //说明没找到关键词
                continue
            }
              //说明找到关键词了
            atIndex=curIndex
            mentionConfig=mention
            break;   
        }
        if (atIndex !== -1) {
            const searchText=textBeforeCursor.slice(atIndex)
            const mentionRange = Editor.range(editor,{...anchor,offset:atIndex},anchor)
            setTargetRange(mentionRange)
            setKeyword(searchText)
            setMentionConfig(mentionConfig)
            // editor.selection=mentionRange    
        }else{
            setTargetRange(null)
            setKeyword("")
            setMentionConfig(null)
        }
    }
   }
   const onKeydownWithMention=useCallback((e:React.KeyboardEvent<HTMLDivElement>)=>{
    if(e.key==="Enter"){
        e.preventDefault()
        e.stopPropagation()
    }
   },[keyword,editor,targetRange,mentionConfig])
   useEffect(()=>{
     if (targetRange && mentionConfig) {
        const el = mentionNodeRef.current
        if (el) {
            const domRange=ReactEditor.toDOMRange(editor,targetRange)
           const rect=domRange.getBoundingClientRect()
           el.style.left = `${rect.left + window.pageXOffset}px`
           if ((rect.bottom+el.offsetHeight) > window.innerHeight) {
            el.style.top = `${rect.bottom - el.offsetHeight - rect.height}px`
           }else{
            el.style.top = `${rect.top + window.pageYOffset+24}px`
           }
           if (rect.left+el.offsetWidth > window.innerWidth) {
            el.style.left = `${rect.right - el.offsetWidth - rect.width}px`
           }else{
            el.style.left = `${rect.left + window.pageXOffset}px`
           }

           el.style.zIndex = '100'
        }
     }   
   },[targetRange,editor,keyword,mentionConfig])
   const mentionNode = useMemo(()=>{
    if (mentionConfig && targetRange) {
        return (
            <Portal>
                <MentionBox 
                    config={mentionConfig}
                    keyword={keyword}
                    ref={mentionNodeRef} 
                    />
            </Portal>
        )
    }
   },[mentionConfig,targetRange,keyword])
   return {
    onChangeWithMention,
    mentionNode,
    onKeydownWithMention
   }
}
export default useMentionSelection