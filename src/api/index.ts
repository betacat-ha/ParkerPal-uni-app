import { createCommonApi } from './common/index'
import { createUserApi } from './user/index'
import { createMerchantApi } from './merchant/index'

const requestMethod: 'http' | 'cloud' = import.meta.env.VITE_REQUEST_METHOD

const commonApi = createCommonApi(requestMethod)
const userApi = createUserApi(requestMethod)
const merchantApi = createMerchantApi(requestMethod)

// 导出 API 实例
export { commonApi, userApi, merchantApi }
