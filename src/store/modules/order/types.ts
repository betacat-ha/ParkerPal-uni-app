export interface TbOrder {
  _id: string
  orderNo: string
  actualPayment: number
  discount: number
  parkingDuration: string
  payment: string
  position: string
  parkingLotName: string
  parkingLotId: string
  packageId: string
  userId: string
  status: string
  createTime: Date
}

export interface OrderState {
  orders: TbOrder[]
  total: number
  page: number
  pageSize: number
  hasNext: boolean
}
