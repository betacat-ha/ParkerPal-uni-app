<script setup lang="ts">
import ActivedOrderCard from './actived-order-card.vue'
import MerchantCard from '@/pages/me/merchant-card.vue'
import { useMerchantStore, useUserStore } from '@/store/index'

const merchantStore = useMerchantStore()
const merchantList = storeToRefs(merchantStore).list

const title = ref<string>()
title.value = import.meta.env.VITE_APP_TITLE

onLoad(() => {
  getLocation();
})

onShow(() => {
  merchantStore.fetchInfo({
    page: 0,
    limit: 3,
  })

  // 设置当前tab
  useUserStore().tabValue = 0
})

const bannerList = reactive([
  {
    image: 'https://s2.loli.net/2024/07/28/BHxQ5yLgJ986KnA.png',
  },
  {
    image: 'https://s2.loli.net/2024/07/28/t3LIk8SRUnZ2miV.png',
  },
])

const searchKeyword = ref<string>('')

function handleSearch() {
  uni.navigateTo({ url: `/pages/merchant/index?keyword=${searchKeyword.value}` })
}

function handleScan() {
  uni.scanCode({
    onlyFromCamera: true,
    success: (res) => {
      console.log('扫描二维码成功,结果:', res.result)
      uni.$u.toast(`${res.result}`)
    },
    error: () => {
      console.log('扫描二维码出现错误')
    },
  })
}

const showAgreePrivacy = ref(false)
// 同意隐私协议
function handleAgree() {
  console.log('同意隐私政策')
}

// 点击查看更多
function navigateToMerchant() {
  uni.navigateTo({
    url: '/pages/merchant/index',
  })
}

// 点击商户卡片
function navigateToMerchantByID(id: string) {
  uni.navigateTo({
    url: `/pages/merchant/detail?id=${id}`,
  })
}

// 获取位置
function getLocation() {
  uni.getFuzzyLocation({
    success: function (res) {
      console.log('获取模糊位置成功,结果:', res)
      previewTips()
    },
    fail: () => {
      console.log('获取模糊位置失败')
      previewTips()
    },
  });

  // uni.getLocation({
  //   type: 'wgs84',
  //   success: (res) => {
  //     console.log('获取位置成功,结果:', res)
  //     // uni.$u.toast(`${res.latitude},${res.longitude}`)
  //     previewTips()
  //   },
  //   fail: () => {
  //     console.log('获取位置失败')
  //     previewTips()
  //   },
  // })
}

// 体验版提示
function previewTips() {
  if (uni.getStorageSync("previewMode") == 1) {
    uni.$u.toast("您处于体验模式中，任何操作均不会被保存。")
    return
  }

  uni.showModal({
    title: '即将进入体验模式',
    content: '您所在的区域未开通服务，本次体验不会收集您的数据。',
    showCancel: false,
    success: (res) => {
      if (res.confirm) {
        console.log('用户点击确定')
        uni.setStorageSync("previewMode", 1)
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}
</script>

<template>
  <view class="page-wrap">
    <u-navbar :safe-area-inset-top="true" :placeholder="true">
      <template #left>
        <view class="u-nav-slot" style="width: 68vw;">
          <view class="flex items-center justify-between">
            <text style="padding-right: 20rpx;">
              智泊无忧
            </text>
            <u-search v-model="searchKeyword" search-icon="scan" :show-action="false" placeholder="搜搜附近的停车场"
              :clearabled="true" @search="handleSearch" @click-icon="handleScan" />
          </view>
        </view>
      </template>
    </u-navbar>

    <view class="width-100 mb-20rpx">
      <u-swiper :list="bannerList" key-name="image" :autoplay="true" indicator height="200" radius="10"
        interval="5000" />
    </view>

    <view class="title-bar">
      <view class="text">
        正在进行的订单
      </view>
    </view>
    <ActivedOrderCard class="width-100 mb-20rpx" />

    <view class="title-bar">
      <view class="text">
        附近的停车场
      </view>
      <view class="button" @click="navigateToMerchant">
        查看更多
        <u-icon name="arrow-right" color="#909399" />
      </view>
    </view>
    <view v-for="(item, index) in merchantList" :key="index" class="width-100" @click="navigateToMerchantByID(item.id)">
      <MerchantCard :merchant-data="item" />
    </view>

    <!-- #ifdef MP-WEIXIN -->
    <!-- 隐私协议组件 -->
    <AgreePrivacy v-model="showAgreePrivacy" :disable-check-privacy="false" @agree="handleAgree" />
    <!-- #endif -->

    <Tabbar />
  </view>
</template>

<style lang="scss">
.page-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0rpx 20rpx;
  gap: 20rpx;
}

.width-100 {
  // margin-top: 30rpx;
  width: 100%;
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  margin: 0 20rpx;
  width: 100%;

  .text {
    font-size: 40rpx;
    font-weight: bold;
  }

  .button {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #909399;
  }
}

.bg-white {
  background-color: white;
}
</style>
