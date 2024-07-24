<template>
  <z-paging ref="pagingRef" v-model="dataList" :safe-area-inset-bottom="false" @query="queryList">
    <template #top>
      <view class="search-bar">
        <u-search
          v-model="searchKeyword" search-icon="search" :show-action="false" placeholder="搜搜附近的停车场"
          class="input" @search="handleSearch" @click-icon="handleScan"
        />
      </view>
    </template>
    <view v-for="(item, index) in dataList" :key="index" style="padding: 20rpx 20rpx 0 20rpx;">
      <MerchantCard :merchant-data="item" />
    </view>
  </z-paging>
</template>

<script setup lang="ts">
import zPaging from 'z-paging/components/z-paging/z-paging.vue';
import MerchantCard from '../merchant-card.vue';
import { useMerchantStore } from '@/store/index';

const pagingRef = ref<InstanceType<typeof zPaging> | null>(null);
const dataList = ref<string[]>([]);

const merchantStore = useMerchantStore();
const merchantList = storeToRefs(merchantStore).list;

async function queryList(pageNo: number, pageSize: number) {
  console.log('[ pageNo ] >', pageNo);
  console.log('[ pageSize ] >', pageSize);

  await merchantStore.fetchInfo({
    page: pageNo,
    limit: pageSize,
  });

  pagingRef.value?.complete(merchantList.value);

  // this.$request
  //   .queryList({ pageNo, pageSize })
  //   .then(res => {
  //     // 请勿在网络请求回调中给dataList赋值！！只需要调用complete就可以了
  //     pagingRef.value.complete(res.data.list);
  //   })
  //   .catch(res => {
  //     // 如果请求失败写pagingRef.value.complete(false)，会自动展示错误页面
  //     // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
  //     // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
  //     pagingRef.value.complete(false);
  //   });
}
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
