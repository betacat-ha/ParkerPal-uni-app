/**
 * 用户信息相关接口
 */
import type { LoginByAuthCodeParams, LoginByPhoneParams, LoginParams, LoginResult } from './types'
import { get, post } from '@/utils/request'
import type { UserState } from '@/store/modules/user/types'

enum URL {
  login = '/user/login',
  loginByAuthCode = '/user/login/authCode',
  loginByPhone = '/user/login/textCode',
  logout = '/user/logout',
  profile = '/user/profile',
  getTextCode = '/code/login/phone', // 获取登录手机验证码
}

export const getUserProfile = () => get<UserState>({ url: URL.profile })
export const login = (data: LoginParams) => post<LoginResult>({ url: URL.login, data })
export const loginByPhone = (data: LoginByPhoneParams) => post<any>({ url: URL.loginByPhone, data })
export const loginByAuthCode = (data: LoginByAuthCodeParams) => post<any>({ url: URL.loginByAuthCode, data })
export const logout = () => post<any>({ url: URL.logout })
export const getTextCode = (data: { phone: string }) => post<any>({ url: URL.getTextCode, data })
