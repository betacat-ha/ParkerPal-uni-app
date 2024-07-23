import type { MerchantInfo } from '../merchant/type';

export interface OrderInfo {
  id: string
  userId: string
  merchantId: string
  merchantData: MerchantInfo
  price: string
  status: string
  createTime: string
  updateTime: string
}

export interface paymentInfo {
  id: string
  orderId: string
  payType: string
  payStatus: string
  payTime: string
  payAmount: string
  payChannel: string
  payChannelOrderId: string
  payChannelOrderData: string
  createTime: string
  updateTime: string
}

export interface OrderState {
  list: OrderInfo[]
  total: number
  page: number
  pageSize: number
  hasNext: boolean
}
