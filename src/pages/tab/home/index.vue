<template>
  <view class="flex flex-col items-center justify-center">
    <image class="mb-50rpx mt-200rpx h-200rpx w-200rpx" src="@/static/images/logo.png" width="200rpx" height="200rpx" />
    <view class="flex justify-center">
      <text class="font-size-36rpx color-gray-700">
        {{ title }}
      </text>
    </view>

    <VehicleInfoCardVue />

    <MerchantCard style="margin-top: 30rpx" />
    <MerchantCard style="margin-top: 30rpx" />

    <!-- #ifdef MP-WEIXIN -->
    <!-- 隐私协议组件 -->
    <agree-privacy v-model="showAgreePrivacy" :disable-check-privacy="false" @agree="handleAgree" />
    <!-- #endif -->

    <!-- 底部安全区 -->
    <!-- <view style="height: 84vh;" /> -->
  </view>
</template>

<script setup lang="ts">
import MerchantCard from '@/components/merchant-card/merchant-card.vue';
import { useUserStore } from '@/store';
import VehicleInfoCardVue from '@/components/vehicle-info-card/vehicle-info-card.vue';

const title = ref<string>();
title.value = import.meta.env.VITE_APP_TITLE;

const store = useUserStore();
console.log('store.user_name', store.user_name);

const showAgreePrivacy = ref(false);
// 同意隐私协议
function handleAgree() {
  console.log('同意隐私政策');
}
</script>

<style lang="scss">
.card {
  width: 90%;
  height: 100%;
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
  padding: 20rpx;

  .merchant {
    display: flex;
    justify-content: left;
    align-items: center;

    .logo {
      width: 150rpx;
      height: 150rpx;
      border-radius: 20rpx;
    }

    .info {
      // 垂直左对齐
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin-left: 20rpx;

      .name {
        font-size: 32rpx;
        color: #333;
      }

      .address {
        font-size: 24rpx;
        color: #999;
      }
    }
  }

  .plan {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info {
      display: flex;
      justify-content: left;
      align-items: center;

      .tag {
        border: 3rpx solid #fb7900;
        color: #fb7900;
        border-radius: 15rpx;
        padding: 2rpx 15rpx;
        font-size: smaller;
      }

      .name {
        margin-left: 15rpx;
      }
    }

    .price {
      color: #fb7900;
      font-size: 32rpx;
    }
  }
}
</style>
