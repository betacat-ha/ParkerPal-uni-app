<template>
  <view class="order-card">
    <Card class="order-info-card">
      <view class="info">
        <view class="title">
          <text> {{ orderData.title }} </text>
        </view>
        <view class="time">
          <text>订单时间: {{ orderData.time }}</text>
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
      <view class="actions">
        <button v-if="orderData.status === '待付款'" @click="goToPayment(orderData.id)">
          去付款
        </button>
        <button v-if="orderData.status === '待使用'" @click="goToUse(orderData.id)">
          去使用
        </button>
        <button v-if="orderData.status === '退款/取消'" @click="viewDetails(orderData.id)">
          去查看
        </button>
        <button v-if="orderData.status === '待评价'" @click="goToReview(orderData.id)">
          去评价
        </button>
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
    goToPayment(orderId) {
      console.log('Go to payment for order:', orderId);
    },
    goToUse(orderId) {
      console.log('Go to use for order:', orderId);
    },
    viewDetails(orderId) {
      console.log('View details for order:', orderId);
    },
    goToReview(orderId) {
      console.log('Go to review for order:', orderId);
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

  .actions {
    position: absolute;
    bottom: 30rpx; /* 距离底部的距离 */
    right: 30rpx; /* 距离右侧的距离 */
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    button {
      padding: 5rpx 20rpx;
      margin-top: 10rpx;
      background-color: transparent;
      color: #1E90FF;
      border: 2rpx solid  #1E90FF;
      border-radius: 8rpx;
      box-shadow: none;
      cursor: pointer;
      font-size: 24rpx;
      transition: all 0.3s ease;
    }
  }
}
</style>
