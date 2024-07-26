import type { SwiperItem } from '../common/type';

export interface Plan {
  id: number
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

export interface MerchantInfo {
  id: number
  name: string
  address: string
  phone: string
  logo: string
  images: SwiperItem[]
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
