<template>
  <z-paging ref="pagingRef" v-model="dataList" :safe-area-inset-bottom="false" @query="queryList">
    <!-- 订单列表 -->
    <view v-for="(item, index) in dataList" :key="index" style="padding: 20rpx 20rpx 0 20rpx;" @click="handleClick(item.id)">
      <OrderCard :order-data="item" />
    </view>
  </z-paging>
</template>

<script setup lang="ts">
import zPaging from 'z-paging/components/z-paging/z-paging.vue';
import OrderCard from './order-card.vue';
import useOrderStore from '@/store/modules/order/index';
import type { OrderInfo } from '@/store/modules/order/types';

const pagingRef = ref<InstanceType<typeof zPaging> | null>(null);
const dataList = ref<OrderInfo[]>([]);
const searchKeyword = ref('');

const OrderStore = useOrderStore();
const OrderList = storeToRefs(OrderStore).list;

// 重载列表
function reloadList() {
  pagingRef.value?.reload();
}

async function queryList(pageNo: number, pageSize: number) {
  console.log('[ pageNo ] >', pageNo);
  console.log('[ pageSize ] >', pageSize);

  await OrderStore.fetchInfo({
    keyword: searchKeyword.value || undefined,
    page: pageNo,
    limit: pageSize,
  });

  pagingRef.value?.complete(OrderList.value);
}

function handleClick(id: string) {
  uni.navigateTo({
    url: `/pages/order/detail?id=${id}`,
  });
}

// 页面加载时的操作
onLoad((option) => {
  // 取出URL中的搜索关键词
  searchKeyword.value = option?.keyword || '';
});
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20rpx;
}
</style>
