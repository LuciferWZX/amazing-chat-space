import { MessageContent, MessageText } from "wukongimjssdk";

export function isTextContent(content:MessageContent):content is MessageText{
    return content.contentType===1
}