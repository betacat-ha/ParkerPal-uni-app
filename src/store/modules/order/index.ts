import { defineStore } from 'pinia';
import type { OrderInfo, OrderState } from './types';
import { getAllOrders, getOrdersByPage } from '@/api/order';
import type { pageParams } from '@/api/order/types';

const useOrderStore = defineStore('order', {
  state: (): OrderState => {
    return {
      list: [] as OrderInfo[],
      total: 0,
      page: 0,
      pageSize: 0,
      hasNext: false,
    };
  },
  getters: {
  },
  actions: {
    setOrderState(partial: Partial<OrderState>) {
      this.$patch(partial);
    },
    async fetchInfo(pageParams: pageParams) {
      console.log('开始获取信息');
      const result = await getOrdersByPage(pageParams);
      this.setOrderState(result);
      console.log(result)
    },
    async fetchAllInfo() {
      console.log('开始获取全部信息');
      const result = await getAllOrders();
      this.setOrderState(result);
    },
    async fetchNextInfo() {
      if (!this.hasNext) {
        console.log('数据已到底');
        return;
      }

      console.log('开始获取下一页信息');
      const result = await getOrdersByPage({ page: this.page + 1, limit: this.pageSize });
      this.hasNext = result.hasNext;
      this.list = this.list.concat(result.list);
    },
  },
});

export default useOrderStore;
