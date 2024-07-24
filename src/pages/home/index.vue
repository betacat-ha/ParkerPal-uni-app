<template>
  <view class="page-wrap">
    <image class="mb-50rpx mt-200rpx h-200rpx w-200rpx" src="@/static/images/logo.png" width="200rpx" height="200rpx" />
    <view class="flex justify-center">
      <text class="font-size-36rpx color-gray-700">
        {{ title }}
      </text>
    </view>
    <u-navbar :safe-area-inset-top="true" :placeholder="true">
      <template #left>
        <view class="u-nav-slot" style="width: 68vw;">
          <view class="flex items-center justify-between">
            <text style="padding-right: 20rpx;">
              智泊无忧
            </text>
            <u-search
              v-model="searchKeyword" search-icon="scan" :show-action="false" placeholder="搜搜附近的停车场"
              @search="handleSearch" @click-icon="handleScan"
            />
          </view>
        </view>
      </template>
    </u-navbar>

    <Card left-title="Pinia调试">
      <u-button @click="merchantStore.fetchAllInfo()">
        执行命令
      </u-button>
      <view class="mg-20">
        state数据: {{ merchantList }}
      </view>
      <slot class="mg-20" />
    </Card>

    <VehicleInfoCard class="width-100" />

    <view class="title-bar">
      <view class="text">
        附近的停车场
      </view>
      <view class="button" @click="navigateToMerchant">
        查看更多 >
      </view>
    </view>

    <MerchantCard class="width-100" />
    <MerchantCard class="width-100" />

    <!-- #ifdef MP-WEIXIN -->
    <!-- 隐私协议组件 -->
    <!-- <AgreePrivacy v-model="showAgreePrivacy" :disable-check-privacy="false" @agree="handleAgree" /> -->
    <!-- #endif -->

    <Tabbar />
  </view>
</template>

<script setup lang="ts">
import MerchantCard from './merchant-card.vue';
import VehicleInfoCard from './vehicle-info-card.vue';
import { useMerchantStore } from '@/store/index';

const merchantStore = useMerchantStore();
const merchantList = storeToRefs(merchantStore);

const title = ref<string>();
title.value = import.meta.env.VITE_APP_TITLE;

const searchKeyword = ref<string>();
function handleSearch() {
  console.log('搜索关键字：', searchKeyword.value);
  uni.$u.toast(`搜索关键字：${searchKeyword.value}`);
}
function handleScan() {
  uni.scanCode({
    onlyFromCamera: true,
    success: (res) => {
      console.log('扫描二维码成功,结果:', res.result);
      uni.$u.toast(`${res.result}`);
    },
    error: () => {
      console.log('扫描二维码出现错误');
    },
  });
}

const showAgreePrivacy = ref(false);
// 同意隐私协议
function handleAgree() {
  console.log('同意隐私政策');
}

function navigateToMerchant() {
  uni.navigateTo({
    url: '/pages/home/merchant/index',
  });
}
</script>

<style lang="scss">
.page-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx;
}

.width-100 {
  // margin-top: 30rpx;
  width: 100%;
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20rpx;
  margin: 0 20rpx;
  .text {
    font-size: 40rpx;
    font-weight: bold;
  }
  .button{
    font-size: 24rpx;
    color: #909399;
  }
}
</style>
