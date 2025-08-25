import type { BaseUser, IMAddress } from '@/types'
import type { CustomResponse } from '@/types/response.ts'
import request from './request'

const USER_PREFIX = '/user'
export function login(data: { username: string, password: string }) {
  return request<CustomResponse<{ access_token: string }>>('/auth/login', {
    method: 'POST',
    data,
  })
}
export async function logout() {
  return request.get<CustomResponse<null>>('/auth/logout')
}
/**
 * @description 根据token获取用户的文档
 */
export function getProfile() {
  return request.get<CustomResponse<BaseUser>>(`${USER_PREFIX}/profile`)
}
/**
 * @description 获取连接的地址
 */
export function getAddress() {
  return request.get<CustomResponse<IMAddress>>(`${USER_PREFIX}/address`)
}
export function register(data: any) {
  return request.post('/register', data)
}
export function syncConversation<T = any>(data: {
  uid: string
  //  当前客户端的会话最大版本号(从保存的结果里取最大的version，如果本地没有数据则传0)，
  version?: number
  // 客户端所有频道会话的最后一条消息序列号拼接出来的同步串 格式： channelID:channelType:last_msg_seq|channelID:channelType:last_msg_seq  （此字段非必填，如果不填就获取全量数据，填写了获取增量数据，看你自己的需求。）
  last_msg_seqs?: string
  // 每个会话获取最大的消息数量，一般为app点进去第一屏的数据
  msg_count: number
}) {
  return request.post<CustomResponse<T>>(`${USER_PREFIX}/conversation/sync`, { data })
}
export function syncMessages<T = any>(data: {
  login_uid: string // 当前登录用户uid
  channel_id: string //  频道ID
  channel_type: 1 | 2 // 频道类型
  start_message_seq: number // 开始消息列号（结果包含start_message_seq的消息）
  end_message_seq: number // 结束消息列号（结果不包含end_message_seq的消息）
  limit: number // 消息数量限制
  pull_mode: 0 | 1 // 拉取模式 0:向下拉取 1:向上拉取
}) {
  return request.post<CustomResponse<T>>(`${USER_PREFIX}/channel/messagesync`, { data })
}
/**
 * @description 获取用户频道信息
 * @param params
 * @returns
 */
export function getUserChannelInfo(params: { uid: string }) {
  return request.get<CustomResponse<BaseUser>>(
    `${USER_PREFIX}/channel/${params.uid}`,
  )
}

/**
 * 获取同事
 */
export function getColleagues() {
  return request.get<CustomResponse<BaseUser[]>>(`${USER_PREFIX}/colleagues`)
}
export function sendMessage(data: {
  header: {
    // 消息头
    no_persist: 0 | 1 // 是否不存储消息 0.存储 1.不存储
    red_dot: 0 | 1 // 是否显示红点计数，0.不显示 1.显示
    sync_once: 0 | 1 // 是否是写扩散，这里一般是0，只有cmd消息才是1
  }
  from_uid: string // 发送者uid
  stream_no: string // 流式消息编号，如果是流式消息，需要指定，否则为空
  channel_id: string // 接收频道ID 如果channel_type=1 channel_id为个人uid 如果channel_type=2 channel_id为群id
  channel_type: 1 | 2 // 接收频道类型  1.个人频道 2.群聊频道
  payload: string // 消息，base64编码，消息格式参考下面 【payload 内容参考】的链接
  subscribers: string[] // 订阅者 subscribers和channel_id二选一
}) {
  return request.post<CustomResponse<null>>(`${USER_PREFIX}/message/send`, { data })
}
