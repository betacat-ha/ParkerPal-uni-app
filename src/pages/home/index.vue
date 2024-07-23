<template>
  <view class="flex flex-col items-center justify-center">
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

    <VehicleInfoCard class="merchant-card" />
    <MerchantCard class="merchant-card" />
    <MerchantCard class="merchant-card" />

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
</script>

<style lang="scss">
.merchant-card {
  margin-top: 30rpx;
  width: 90vw;
}
</style>
