import { AmazingEditor, AmazingEditorManager } from "@amazing-chat/editor"
import type { RefObject } from "react"
interface ChatInputProps {
    expandContainerRef:RefObject<HTMLElement | null>
}
const ChatInput = (props:ChatInputProps) => {
    const {expandContainerRef}=props
    return(
         <div className={'relative'}>
              <AmazingEditor
                  expandContainerRef={expandContainerRef}
                  instanceId={"happy"}

                  onSendMessage={(message) => {
                      console.warn("message", message)
                      const htmlStr = AmazingEditorManager.serialize(message.value)
                      console.warn("htmlStr", htmlStr)
                  }}
                  mentions={[
                      {
                          trigger:"@",
                          data:[
                              {
                                  label:"孙悟空",
                                  value:"adnwjndnwjved"
                              },
                              {
                                  label:"蝙蝠侠",
                                  value:"fafeaefe",
                                  disabled:true
                              },
                              {
                                  label:"超人",
                                  value:"sasdwda"
                              }
                          ]
                      }
                  ]}
                  classes={{viewport:'max-h-38 '}}
                  placeholder={"请输入消息"}/>
            </div>
    )
}
export default ChatInput;