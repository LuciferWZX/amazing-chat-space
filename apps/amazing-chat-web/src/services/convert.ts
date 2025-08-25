/* eslint-disable @typescript-eslint/no-explicit-any */
import WKSDK, { Channel, Conversation, MessageStatus, Message, Setting, MessageExtra, MessageContentType } from "wukongimjssdk";
import BigNumber from "bignumber.js";
import { Buffer } from 'buffer';
export class Convert{
    /**
     * 将消息信息转换为Message
     * @param msgMap 消息信息
     * @returns Message
     */
    static toMessage(msgMap:Record<string,any>):Message{
        const message = new Message()
         if (msgMap['message_idstr']) {
            message.messageID = msgMap['message_idstr'];
        } else {
            message.messageID = new BigNumber(msgMap['message_id']).toString();
        }
        if (msgMap["header"]) {
            message.header.reddot = msgMap["header"]["red_dot"] === 1 ? true : false
        }
        if (msgMap["setting"]) {
            message.setting = Setting.fromUint8(msgMap["setting"])
        }
        if (msgMap["revoke"]) {
            message.remoteExtra.revoke = msgMap["revoke"] === 1 ? true : false
        }
        if(msgMap["message_extra"]) {
            const messageExtra = msgMap["message_extra"]
           message.remoteExtra = this.toMessageExtra(messageExtra)
        }
        
        message.clientSeq = msgMap["client_seq"]
        message.channel = new Channel(msgMap['channel_id'], msgMap['channel_type']);
        message.messageSeq = msgMap["message_seq"]
        message.clientMsgNo = msgMap["client_msg_no"]
        message.fromUID = msgMap["from_uid"]
        message.timestamp = msgMap["timestamp"]
        message.status = MessageStatus.Normal

        const streamBase64Data = msgMap["stream_data"]
        if(streamBase64Data) {
            const streamText = Buffer.from(streamBase64Data, 'base64')
            message.streamText = streamText.toString('utf8')
        }
       
        let contentType = 0
        try {
            let contentObj:any = null
            const payload = msgMap["payload"]
            if(payload && payload!=="") {
                // 使用浏览器原生API替代Buffer
                
                const decodedBuffer = Buffer.from(payload, 'base64')
                 contentObj = JSON.parse(decodedBuffer.toString('utf8'))
                
                 
                if (contentObj) {
                    contentType = contentObj.type
                }
            }
            const messageContent = WKSDK.shared().getMessageContent(contentType)
            if (contentObj) {
                messageContent.decode(this.stringToUint8Array(JSON.stringify(contentObj)))
            }
            message.content = messageContent
        }catch(e) {
            console.warn("不存在contentType",e)
            // 如果报错，直接设置为unknown  
            const messageContent = WKSDK.shared().getMessageContent(MessageContentType.unknown)
            message.content = messageContent
        }
        message.isDeleted = msgMap["is_deleted"] === 1

        return message
    }
    /**
     * 将会话信息转换为Conversation
     * @param conversationMap 会话信息
     * @returns Conversation
     */
    static toConversation(conversationMap:Record<string,any>):Conversation{
        const conversation = new Conversation() 
        conversation.channel = new Channel(conversationMap['channel_id'],conversationMap['channel_type'])
        conversation.unread = conversationMap['unread'] || 0
        conversation.timestamp = conversationMap['timestamp'] || 0
        const recents = conversationMap['recents']
        if(recents && recents.length > 0){
            const messageModel = this.toMessage(recents[0]);
            conversation.lastMessage = messageModel
        }
        conversation.extra = {}
        return conversation
    }
    /**
     * 将消息额外信息转换为MessageExtra
     * @param msgExtraMap 消息额外信息
     * @returns MessageExtra
     */
    static toMessageExtra(msgExtraMap: any) :MessageExtra {
        const messageExtra = new MessageExtra()
        if (msgExtraMap['message_id_str']) {
            messageExtra.messageID = msgExtraMap['message_id_str'];
        } else {
            messageExtra.messageID = new BigNumber(msgExtraMap['message_id']).toString();
        }
        messageExtra.messageSeq = msgExtraMap["message_seq"]
        messageExtra.readed = msgExtraMap["readed"] === 1
        if(msgExtraMap["readed_at"] && msgExtraMap["readed_at"]>0) {
            messageExtra.readedAt = new Date(msgExtraMap["readed_at"] )
        }
        messageExtra.revoke = msgExtraMap["revoke"] === 1
        if(msgExtraMap["revoker"]) {
            messageExtra.revoker = msgExtraMap["revoker"]
        }
        messageExtra.readedCount = msgExtraMap["readed_count"] || 0
        messageExtra.unreadCount = msgExtraMap["unread_count"] || 0
        messageExtra.extraVersion = msgExtraMap["extra_version"] || 0
        messageExtra.editedAt = msgExtraMap["edited_at"] || 0

        const contentEditObj = msgExtraMap["content_edit"]
        if(contentEditObj) {
            const contentEditContentType = contentEditObj.type
            const contentEditContent = WKSDK.shared().getMessageContent(contentEditContentType)
            const contentEditPayloadData = this.stringToUint8Array(JSON.stringify(contentEditObj))
            contentEditContent.decode(contentEditPayloadData)
            messageExtra.contentEditData = contentEditPayloadData
            messageExtra.contentEdit = contentEditContent

            messageExtra.isEdit = true
        }

        return messageExtra
    }
    /**
     * 将字符串转换为Uint8Array
     * @param str 字符串
     * @returns Uint8Array
     */
    static stringToUint8Array(str: string): Uint8Array {
        // 直接使用 TextEncoder 将字符串转换为 Uint8Array，避免 URI 解码问题
        const encoder = new TextEncoder();
        return encoder.encode(str);
    }
}