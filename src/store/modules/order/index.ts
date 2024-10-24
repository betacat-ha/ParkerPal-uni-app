import { defineStore } from 'pinia'
import type { OrderState, TbOrder } from './types'
import { userApi } from '@/api/index'

const useOrderStore = defineStore('order', {
  state: (): OrderState => {
    return {
      orders: [],
      total: 0,
      page: 0,
      pageSize: 0,
      hasNext: false,
    };
  },
  actions: {
    async getOrdersByUserId(userId: string) {
      try {
        const res = await userApi.getOrdersByUserId(userId)
        this.orders = res.data
      }
      catch (e) {
        console.error(e)
      }
    },
    async getActiveOrder() {
      if (this.orders.length > 0) {
        const activeOrder: TbOrder = toRaw(this.orders.filter(order => order.status === 'IN_PROGRESS')[0])
        return activeOrder === undefined ? null : activeOrder
      }
      return null
    },
  },
});

export default useOrderStore;
