import {AmazingEditor} from "@amazing-chat/editor";
import {AmazingEditorManager} from "@amazing-chat/editor";

const Content = () => {
    return(
        <div className={'flex-1 overflow-auto flex flex-col'}>
            <div className={'mb-auto'}> this is main</div>
            <div className={'relative'}>
              <AmazingEditor
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
        </div>
    )
}
export default Content