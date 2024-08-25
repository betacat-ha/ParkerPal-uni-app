export interface OrderInfo {
  id: string
  orderNo: string
  licensePlate: string
  createtime: string
  merchantName: string
  parkingDuration: string
  orderstatus: string
  amount: number
  actualPayment: number
  discount: number
  payment: string
}

export interface OrderState {
  list: OrderInfo[]
  total: number
  page: number
  pageSize: number
  hasNext: boolean
}
