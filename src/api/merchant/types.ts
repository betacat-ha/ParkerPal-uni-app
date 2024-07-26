export interface pageParams {
  keyword?: string
  sort?: string
  order?: string
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
