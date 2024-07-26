<template>
  <z-paging ref="pagingRef" v-model="dataList" :safe-area-inset-bottom="false" @query="queryList">
    <template #top>
      <view class="search-bar">
        <u-search
          v-model="searchKeyword" search-icon="search" :show-action="false" placeholder="搜搜附近的停车场"
          class="input" :clearabled="true" @search="handleSearch"
        />
      </view>
    </template>
    <view v-for="(item, index) in dataList" :key="index" style="padding: 20rpx 20rpx 0 20rpx;" @click="handleClick(item.id)">
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
const searchKeyword = ref('');

const merchantStore = useMerchantStore();
const merchantList = storeToRefs(merchantStore).list;

function handleSearch() {
  pagingRef.value?.reload();
}

async function queryList(pageNo: number, pageSize: number) {
  console.log('[ pageNo ] >', pageNo);
  console.log('[ pageSize ] >', pageSize);

  await merchantStore.fetchInfo({
    keyword: searchKeyword.value || undefined, // 仅当searchKeyword有值时才传
    page: pageNo,
    limit: pageSize,
  });

  pagingRef.value?.complete(merchantList.value);
}

// 点击商户卡片
function handleClick(id: string) {
  uni.navigateTo({
    url: `/pages/home/merchant/detail?id=${id}`,
  });
}

onLoad((option) => {
  searchKeyword.value = option.keyword;
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
