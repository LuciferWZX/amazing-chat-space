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
