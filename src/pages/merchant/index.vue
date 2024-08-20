<script setup lang="ts">
import zPaging from 'z-paging/components/z-paging/z-paging.vue'
import MerchantCard from '../me/merchant-card.vue'
import { useMerchantStore } from '@/store/index'
import type { MerchantInfo } from '@/store/modules/merchant/types'

const pagingRef = ref<InstanceType<typeof zPaging> | null>(null)
const dataList = ref<MerchantInfo[]>([])
const searchKeyword = ref('')

const merchantStore = useMerchantStore()
const merchantList = storeToRefs(merchantStore).list

// 处理搜索事件
function handleSearch() {
  reloadList()
}

// 处理清空搜索事件
function handleClear() {
  searchKeyword.value = ''
  reloadList()
}

// 重载列表
function reloadList() {
  pagingRef.value?.reload()
}

// 查询列表，由z-paging调用
async function queryList(pageNo: number, pageSize: number) {
  console.log('[ pageNo ] >', pageNo)
  console.log('[ pageSize ] >', pageSize)

  await merchantStore.fetchInfo({
    keyword: searchKeyword.value || undefined, // 仅当searchKeyword有值时才传
    page: pageNo,
    limit: pageSize,
  })

  pagingRef.value?.complete(merchantList.value)
}

// 处理点击商户卡片事件
function handleClick(id: string) {
  uni.navigateTo({
    url: `/pages/merchant/detail?id=${id}`,
  })
}

// 页面加载时的操作
onLoad((option) => {
  // 取出URL中的搜索关键词
  searchKeyword.value = option?.keyword || ''
})
</script>

<template>
  <z-paging ref="pagingRef" v-model="dataList" :safe-area-inset-bottom="false" @query="queryList">
    <template #top>
      <!-- 顶部搜索栏 -->
      <view class="search-bar">
        <u-search
          v-model="searchKeyword" search-icon="search" :show-action="false" placeholder="搜搜附近的停车场"
          class="input" :clearabled="true" @search="handleSearch" @clear="handleClear"
        />
      </view>
    </template>

    <!-- 商家列表 -->
    <view v-for="(item, index) in dataList" :key="index" style="padding: 20rpx 20rpx 0;" @click="handleClick(item.id)">
      <MerchantCard :merchant-data="item" />
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx;
  background-color: white;
}
</style>
