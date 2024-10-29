<script setup lang="ts">
import { useRouter } from 'uni-mini-router'
import { useMerchantStore, useUserStore } from '@/store/index'

const router = useRouter()
const userStore = useUserStore()
const merchantStore = useMerchantStore()

const tabbarList = computed(() => getTabbarList())

onReady(() => {
// 隐藏原生TabBar
  uni.hideTabBar()
})

function getTabbarList() {
  const items = [
    {
      id: 'home',
      pagePath: '/pages/home/index',
      text: '首页',
      iconPath: 'home',
      selectedIconPath: '',
    },
    {
      id: 'driving',
      pagePath: '/pages/driving/index',
      text: '导航',
      iconPath: 'map',
      selectedIconPath: '',
    },
    {
      id: 'me',
      pagePath: '/pages/me/user/index', // 默认是用户中心
      text: '用户中心',
      iconPath: 'account',
      selectedIconPath: '',
    },
  ]

  if (merchantStore.isLoggedIn) {
    items[2].pagePath = '/pages/me/merchant/index'
    items[2].text = '商户中心'
  }

  return items
}

// 点击tabbar按钮
function handleTabbarItemClick(item: object, index: number) {
  if (userStore.tabValue !== index) {
    userStore.setTabValue(index)

    // 检查是否需要登录
    if (item.id === 'me' && !userStore.isLoggedIn && !merchantStore.isLoggedIn) {
      router.replace('/pages/me/index')
      return
    }

    router.pushTab(item.pagePath)
  }
}

// 图标的切换
function getTabbarIcon(item, index) {
  return userStore.activeTab === index ? item.selectedIconPath : item.iconPath
}
</script>

<template>
  <view>
    <u-tabbar :value="userStore.tabValue" :fixed="true" :placeholder="true" :safe-area-inset-bottom="true" active-color="#66CDAA">
      <u-tabbar-item
        v-for="(item, index) in tabbarList" :key="index" :icon="getTabbarIcon(item, index)"
        :text="item.text" @click="handleTabbarItemClick(item, index)"
      />
    </u-tabbar>
  </view>
</template>
