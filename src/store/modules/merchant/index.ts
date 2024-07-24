import { defineStore } from 'pinia';
import type { MerchantInfo, MerchantState } from './types';
import { getAllList, getList } from '@/api/merchant';
import type { pageParams } from '@/api/merchant/types';

const useMerchantStore = defineStore('merchant', {
  state: (): MerchantState => {
    return {
      list: [] as MerchantInfo[],
      total: 0,
      page: 0,
      pageSize: 0,
      hasNext: false,
    };
  },
  getters: {
  },
  actions: {
    setMerchantState(partial: Partial<MerchantState>) {
      this.$patch(partial);
    },
    async fetchInfo(pageParams: pageParams) {
      console.log('开始获取信息');
      const result = await getList(pageParams);
      this.setMerchantState(result);
    },
    async fetchAllInfo() {
      console.log('开始获取全部信息');
      const result = await getAllList();
      this.setMerchantState(result);
    },
    async fetchNextInfo() {
      if (!this.hasNext) {
        console.log('数据已到底');
        return;
      }

      console.log('开始获取下一页信息');
      const result = await getList({ page: this.page + 1, limit: this.pageSize });
      // 追加数据
      this.hasNext = result.hasNext;
      this.list = this.list.concat(result.list);
    },
  },
});

export default useMerchantStore;
