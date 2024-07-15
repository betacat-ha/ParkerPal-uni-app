<script setup lang="ts">
// import { mpUpdate } from '@/utils/index';

onLaunch(() => {
  console.log('App Launch');
  // #ifdef MP-WEIXIN
  // mpUpdate();

  // 隐藏原生标题栏
  uni.hideTabBar();
  // #endif
});
onShow(() => {
  console.log('App Show');
  // #ifdef MP-WEIXIN

  // 隐藏原生标题栏
  uni.hideTabBar();
  // #endif
});
onHide(() => {
  console.log('App Hide');
});
</script>

<style lang="scss">
/* 每个页面公共css */
@import 'uview-plus/index.scss';
@import '@/static/styles/common.scss';
</style>
