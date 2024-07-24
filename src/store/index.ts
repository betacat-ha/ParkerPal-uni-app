import type { App } from 'vue';
import { createPinia } from 'pinia';

// 导入子模块
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useOrderStore from './modules/order';
import useMerchantStore from './modules/merchant';

// import piniaPersist from 'pinia-plugin-persist-uni';

// 安装pinia状态管理插件
function setupStore(app: App) {
  const store = createPinia();
  // store.use(piniaPersist);

  app.use(store);
}

// 导出模块
export { useAppStore, useUserStore, useOrderStore, useMerchantStore };
export default setupStore;
