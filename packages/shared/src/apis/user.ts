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
/**
 * 获取同事
 */
export function getColleagues() {
  return request.get<CustomResponse<BaseUser[]>>(`${USER_PREFIX}/colleagues`)
}
