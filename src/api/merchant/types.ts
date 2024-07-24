export interface pageParams {
  page: number
  limit: number
}

export interface pageResult<T> {
  total: number
  list: T[]
  page: number
  pageSize: number
  hasNext: boolean
}
