<template>
  <view>
    <u-tabbar :value="userStore.tabValue" :fixed="true" :placeholder="true" :safe-area-inset-bottom="true">
      <u-tabbar-item
        v-for="(item, index) in tabbarList" :key="index" :icon="getTabbarIcon(item, index)"
        :text="item.text" @click="handleTabbarItemClick(item, index)"
      />
    </u-tabbar>
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import { useUserStore } from '@/store/index.ts';

const userStore = useUserStore();
const tabbarList = reactive([
  {
    pagePath: '/pages/home/index',
    text: '首页',
    iconPath: '',
    selectedIconPath: '',
  },
  {
    pagePath: '/pages/driving/index',
    text: '导航',
    iconPath: '',
    selectedIconPath: '',
  },
  {
    pagePath: '/pages/me/index',
    text: '我的',
    iconPath: '',
    selectedIconPath: '',
  },
]);

// 点击tabbar按钮
const handleTabbarItemClick = (item, index) => {
  if (userStore.tabValue !== index) {
    userStore.setTabValue(index);
    const path = item.pagePath;
    uni.switchTab({
      url: path,
    });
  }
};
// 图标的切换
const getTabbarIcon = (item, index) => {
  return userStore.activeTab === index ? item.selectedIconPath : item.iconPath;
};
</script>
