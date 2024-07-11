<template>
  <view class="card">
    <slot />
  </view>
</template>

<script>
export default {
  name: 'Card',
  props: {
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.card {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 20rpx;
    box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
    padding: 20rpx;
}
</style>
