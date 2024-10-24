export interface TbVehicle {
  _id: string
  make: string
  model: string
  year: number
  licensePlate: string
}

export interface TbUser {
  _id: string
  username: string
  password: string
  name: string
  avatar: string | null
  vehicles: TbVehicle[]
}

export interface UserState {
  user: TbUser | null
  weixinId: string | null
  token: string
  tabValue: number
}
