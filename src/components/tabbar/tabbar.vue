<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/store/index.ts'

// 隐藏原生TabBar
uni.hideTabBar()

const userStore = useUserStore()
const tabbarList = reactive([
  {
    pagePath: '/pages/home/index',
    text: '首页',
    iconPath: 'home',
    selectedIconPath: '',
  },
  {
    pagePath: '/pages/driving/index',
    text: '导航',
    iconPath: 'map',
    selectedIconPath: '',
  },
  {
    pagePath: '/pages/me/index',
    text: '我的',
    iconPath: 'account',
    selectedIconPath: '',
  },
])

// 点击tabbar按钮
function handleTabbarItemClick(item, index) {
  if (userStore.tabValue !== index) {
    userStore.setTabValue(index)
    const path = item.pagePath
    uni.switchTab({
      url: path,
    })
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
