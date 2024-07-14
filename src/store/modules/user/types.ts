export type RoleType = '' | '*' | 'user';

export interface UserInfo {
  id: string | undefined
  name: string | undefined
  avatar: string | undefined
}

export interface UserState {
  info: UserInfo
  token: string
  tabValue: number
}

export type providerType =
  | 'weixin'
  | 'qq'
  | 'sinaweibo'
  | 'xiaomi'
  | 'apple'
  | 'univerify'
  | undefined;
