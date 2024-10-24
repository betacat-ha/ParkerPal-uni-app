import type { App } from 'vue'
import { createPinia } from 'pinia'

import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useMerchantStore from './modules/merchant'
import useOrderStore from './modules/order'
import useParkingLotStore from './modules/parkinglot'

// import piniaPersist from 'pinia-plugin-persist-uni';

// 安装pinia状态管理插件
function setupStore(app: App) {
  const store = createPinia()
  // store.use(piniaPersist);

  app.use(store)
}

// 导出模块
export { useAppStore, useUserStore, useMerchantStore, useOrderStore, useParkingLotStore }
export default setupStore
