<template>
  <view>
    <indoor-map />

    <Tabbar />
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/index';

onShow(() => {
  // 设置当前tab
  useUserStore().tabValue = 1;
});
</script>
