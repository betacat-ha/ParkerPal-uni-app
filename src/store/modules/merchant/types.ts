import type { SwiperItem } from '../common/type'

export interface Plan {
  id: string
  name: string
  description: string
  price: number
  status: string
  tag: string
  stock: number
  inStock: boolean
  createTime: string
  updateTime: string
}

export interface Service {
  id: string
  icon: string
  name: string
  description: string
  status: string
  tag: string
}

export interface MerchantInfo {
  id: string
  name: string
  address: string
  description: string
  phone: string
  logo: string
  images: SwiperItem[]
  longitude: number
  latitude: number
  services: Service[]
  status: number
  createTime: string
  updateTime: string
  plans: Plan[]
}

export interface MerchantState {
  list: MerchantInfo[]
  total: number
  page: number
  pageSize: number
  hasNext: boolean
}
