<script setup>
import Card from '@/components/card/index.vue'

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
})

const stateValue = storeToRefs(props.state)
</script>

<template>
  <Card left-title="Pinia调试">
    <u-button @click="props.callback">
      执行命令
    </u-button>
    <view class="mg-20">
      state数据: {{ stateValue }}
    </view>
    <slot class="mg-20" />
  </Card>
</template>

<style lang="scss" scoped>
.mg-20 {
    /* #ifdef MP-WEIXIN */
    padding: 20rpx;

    /* #endif */

    /* #ifndef MP-WEIXIN */
    margin: 20rpx;

    /* #endif */
  }
</style>
