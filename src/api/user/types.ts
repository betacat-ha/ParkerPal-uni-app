export interface LoginParams {
  username: string
  password: string
}

export interface LoginByPhoneParams {
  phone: string
  code: string
}

export interface LoginByAuthCodeParams {
  code: string
}

export interface LoginResult {
  token: string
  user_id: number
  user_name: string
  avatar: string
}
