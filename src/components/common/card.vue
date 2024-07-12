<template>
  <view class="card">
    <!-- 如果有标题，则显示 -->
    <view v-if="leftTitle || rightTitle || desc" class="card-header">
      <view class="card-header-title">
        <text class="card-header-title-text">
          {{ leftTitle }}
        </text>
        <text class="card-header-title-text">
          {{ rightTitle }}
        </text>
      </view>
      <view v-if="desc" class="card-header-desc">
        <text class="card-header-desc-text">
          {{ desc }}
        </text>
      </view>
    </view>

    <view class="slot">
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  name: 'Card',
  props: {
    leftTitle: {
      type: String,
      default: '',
    },
    rightTitle: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 90vw;
  height: 100%;
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
  padding: 0 !important;

  .card-header {
    display: flex;
    flex-direction: column;
    background: #a7e6ff;
    border-radius: 20rpx 20rpx 0 0;
    .card-header-title {
      padding: 10rpx 15rpx 10rpx 15rpx;
      display: flex;
      justify-content: space-between;
    }
    .card-header-desc {
      padding: 10rpx 15rpx 10rpx 15rpx;
      color: #999;
    }
  }

  .slot {
    // 就微信**搞特殊
    /* #ifdef MP-WEIXIN */
    padding: 20rpx;
    /* #endif */

    /* #ifndef MP-WEIXIN */
    margin: 20rpx;
    /* #endif */

  }
}
</style>
