<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch');
  // 隐藏原生标题栏
  // #ifdef MP-WEIXIN
  uni.hideTabBar();
  // #endif
});
onShow(() => {
  console.log('App Show');
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
