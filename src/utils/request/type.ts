// 返回res.data的interface
export interface IResponse<T = any> {
  status: string | number
  msg: string
  data: T
}
