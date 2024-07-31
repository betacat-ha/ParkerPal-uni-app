<template>
  <view class="order-card" @click="goToPage(orderData.id)">
    <Card class="order-info-card">
      <view class="info">
        <view class="title">
          <text> {{ orderData.title }} </text>
        </view>
        <view class="button-divider" /> <!-- 分界线 -->
        <view class="time">
          <text>{{ orderData.time }}</text>
        </view>
      </view>
      <view class="status">
        <text :class="{ 'status-pending': orderData.status === '待付款', 'status-used': orderData.status === '待使用', 'status-refund': orderData.status === '退款/取消', 'status-review': orderData.status === '待评价' }">
          {{ orderData.status }}
        </text>
      </view>
      <view class="amount">
        <text>￥{{ orderData.amount }}</text>
      </view>
    </card>
  </view>
</template>

<script>
export default {
  name: 'OrderCard',
  props: {
    orderData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToPage(orderId) {
      uni.navigateTo({
        url: `/pages/me/order-detail?orderId=${orderId}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.order-card {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
  position: relative;
}

.order-info-card {
  display: flex;
  flex-direction: column;
  gap: 15rpx;

  .info {
    flex: 1;
  }

  .title {
    font-size: 32rpx;
    font-weight: bold;
  }

  .time {
    font-size: 24rpx;
    color: #888;
  }

  .status {
    font-size: 24rpx;
    line-height: 1.5;
    color: #ff6347;
  }

  .amount {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
  }

  // .actions {
  //   position: absolute;
  //   bottom: 30rpx; /* 距离底部的距离 */
  //   right: 30rpx; /* 距离右侧的距离 */
  //   display: flex;
  //   flex-direction: column;
  //   align-items: flex-end;

  //   button {
  //     padding: 5rpx 20rpx;
  //     margin-top: 10rpx;
  //     background-color: transparent;
  //     color: #1E90FF;
  //     border: 2rpx solid  #1E90FF;
  //     border-radius: 8rpx;
  //     box-shadow: none;
  //     cursor: pointer;
  //     font-size: 24rpx;
  //     transition: all 0.3s ease;
  //   }
  // }
  // .button-divider {
  //   border-top: 1px solid #E8E8E8; /* 分界线样式 */
  //   margin-top: 10rpx;
  // }
}
</style>
