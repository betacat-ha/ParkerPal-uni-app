<template>
  <Card left-title="Pinia调试">
    <u-button @click="props.callback">
      执行命令
    </u-button>
    <view class="card-content">
      state数据: {{ stateValue }}
    </view>
    <slot class="slot" />
  </Card>
</template>

<script setup>
import Card from '@/components/card/index.vue';

// 接收父组件传过来的数据，包括state
const props = defineProps({
  state: {
    type: Object,
    default: () => ({}),
  },
  // 回调函数
  callback: {
    type: Function,
    default: () => {},
  },
});

const stateValue = storeToRefs(props.state);
</script>

<style lang="scss" scoped>
.card {
  padding: 0 !important;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 20rpx;

  .card-header {
    display: flex;
    flex-direction: column;
    background: v-bind(titleColor);
    border-radius: 20rpx 20rpx 0 0;

    .card-header-title {
      display: flex;
      justify-content: space-between;
      padding: 10rpx 15rpx;
    }

    .card-header-desc {
      padding: 10rpx 15rpx;
      color: #999;
    }
  }
}
.slot {
    /* #ifdef MP-WEIXIN */
    padding: 20rpx;
    /* #endif */

    /* #ifndef MP-WEIXIN */
    margin: 20rpx;
    /* #endif */
  }
</style>
