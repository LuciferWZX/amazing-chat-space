import type { Channel, ChannelInfo, Conversation, Message, SyncOptions } from 'wukongimjssdk'
import { apis, types } from '@amazing-chat/shared'
import WKSDK from 'wukongimjssdk'
import { Convert } from './convert'

export function initDatasource() {
  // 同步频道消息列表
  WKSDK.shared().config.provider.syncMessagesCallback = async (channel: Channel, opts: SyncOptions) => {
    const resultMessages = new Array<Message>()
    const resp = await apis.syncMessages<any>({
      login_uid: WKSDK.shared().config.uid!,
      channel_id: channel.channelID,
      channel_type: channel.channelType as 1 | 2,
      start_message_seq: opts.startMessageSeq,
      end_message_seq: opts.endMessageSeq,
      pull_mode: opts.pullMode,
      limit: opts.limit,
    })
    if (resp?.code === types.ResponseCode.SUCCESS) {
      const messageList = resp.data.messages
      if (messageList) {
        messageList.forEach((msg: any) => {
          const message = Convert.toMessage(msg)
          resultMessages.push(message)
        })
      }
    }

    return resultMessages
  }
  /**
   * 同步会话列表
   * @returns 会话列表
   */
  WKSDK.shared().config.provider.syncConversationsCallback = async (filter) => {
    const response = await apis.syncConversation<any[]>({
      uid: WKSDK.shared().config.uid!,
      msg_count: 1,
      ...filter,
    })

    const result = new Array<Conversation>()
    if (response?.code === types.ResponseCode.SUCCESS) {
      for (let i = 0; i < response.data.length; i++) {
        const conversation = Convert.toConversation(response.data[i])
        result.push(conversation)
      }
    }
    return result
  }
  /**
   * 同步频道信息
   * @param channel 频道
   * @returns 频道信息
   */
  WKSDK.shared().config.provider.channelInfoCallback = async (channel: Channel) => {
    let emptyChannelInfo: ChannelInfo = {
      title: '',
      logo: '',
      mute: false,
      top: false,
      channel,
      orgData: {},
      online: false,
      lastOffline: 0,
    }
    // if (channel.channelType === 1) {
    //     emptyChannelInfo.title = '单聊'
    // } else if (channel.channelType === 2) {
    //     emptyChannelInfo.title = '群聊'
    // }
    const response = await apis.getUserChannelInfo({
      uid: channel.channelID,
    })
    if (response?.code === types.ResponseCode.SUCCESS && response.data) {
      const user = response.data
      emptyChannelInfo = {
        title: user.nickname,
        logo: user.avatar,
        mute: false,
        top: false,
        channel,
        orgData: {},
        online: false,
        lastOffline: 0,
      }
      return emptyChannelInfo
    }
    return emptyChannelInfo
  }
}
