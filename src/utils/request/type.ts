// 返回res.data的interface
export interface IResponse<T = any> {
  status: string | number
  code: number | string
  msg: string
  data: T
}
