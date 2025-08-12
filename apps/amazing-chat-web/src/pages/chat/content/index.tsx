import {AmazingEditor} from "@amazing-chat/editor";

const Content = () => {
    return(
        <div className={'flex-1 overflow-auto flex flex-col'}>
            <div className={'mb-auto'}> this is main</div>
            <div className={'p-4 overflow-auto'}>
              <AmazingEditor
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