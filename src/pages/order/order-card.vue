<template>
  <view class="order-card">
    <Card class="order-info-card">
      <view class="info">
        <view class="title">
          <text> {{ orderData.merchantName }} </text>
        </view>
        <view class="status">
        <!-- <text :class="{ 'status-pending': orderData.status === '待付款', 'status-used': orderData.status === '待使用', 'status-refund': orderData.status === '退款/售后', 'status-review': orderData.status === '待评价' }"> -->
        <text>
          {{ orderData.orderstatus }}
        </text>
      </view>
        <view class="button-divider" /> <!-- 分界线 -->
        
        <view class="createTime">
          <text>{{ orderData.createTime }}</text>
        </view>
        <view class="time">
          停车时长：<text>{{ orderData.parkingDuration }}</text>
        </view>
      </view>
      
      <view class="button-divider" /> <!-- 分界线 -->
      <view class="amount">
        <text>费用：￥{{ orderData.amount }}</text>
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
      default: () => ({
        merchantName: '广东技术师范大学体育馆',
        licensePlate: '粤M·1234N',
        parkingDuration: '2小时45分06秒',
        status: '待付款',
        amount: '25.02',
      }),
    },
  },
  methods: {
    // goToPage() {
    //   uni.navigateTo({
    //     url: `/pages/order/detail?id=${id}`,
    //   });
    // },
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
    color: #0f0f0f;
  }
  .license {
    font-size: 28rpx;
    color: #6f6d6d;
  }
  .createTime {
    font-size: 28rpx;
    color: #6f6d6d;
  }
  .time {
    font-size: 28rpx;
    color: #6f6d6d;
  }

  .status {
    font-size: 28rpx;
    font-weight: bold;
    color: #6f6d6d;
  }

  .amount {
    font-size: 28rpx;
    font-weight: bold;
    color: #fb7900;
  }
  }
  .button-divider {
    border-top: 1px solid #E8E8E8; /* 分界线样式 */
    margin-top: 10rpx;
  }
</style>
