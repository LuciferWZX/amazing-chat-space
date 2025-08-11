import {AmazingEditor} from "@amazing-chat/editor";

const Content = () => {
    return(
        <div className={'flex-1 flex flex-col'}>
           
            <div className={'mb-auto'}> this is main</div>
            <div className={'p-4'}>
              <AmazingEditor classes={{viewport:'max-h-38 '}}  placeholder={"请输入消息"}/>
            </div>
        </div>
    )
}
export default Content