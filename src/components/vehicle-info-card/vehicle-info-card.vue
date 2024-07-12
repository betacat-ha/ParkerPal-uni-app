<template>
  <Card :left-title="vehicleData.licensePlate" :right-title="vehicleData.orderInfo.orderStatus">
    <!-- 是否查询到订单信息 -->
    <view v-if="vehicleData.orderInfo">
      <view class="order-info">
        <view class="detail">
          <text class="merchant-name">
            {{ vehicleData.merchant.name }}
          </text>
          <text class="detail-gray">
            入场时间：{{ vehicleData.orderInfo.orderTime }}
          </text>
          <text class="detail-gray">
            停车位：{{ vehicleData.orderInfo.parkingSpace }}
          </text>
        </view>
        <view class="nav-btn">
          <up-icon name="map" size="50rpx" />
          <!-- <text>室内导航</text> -->
        </view>
      </view>
    </view>
  </Card>
</template>

<script>
import card from '@/components/common/card.vue';

export default {
  name: 'VehicleInfoCard',
  components: { Card: card },
  props: {
    vehicleData: {
      type: Object,
      default: () => ({
        licensePlate: '粤A·123456',
        orderInfo: {
          orderId: '123456789',
          orderTime: '2024-07-01 12:00:00',
          orderStatus: '已入场',
          orderPrice: '100',
          orderType: '月卡',
          parkingSpace: 'A13',
        },
        merchant: {
          name: '广东技术师范大学体育馆',
        },
      }),
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.order-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .merchant-name {
    font-size: 30rpx;
    font-weight: bold;
  }
  .detail {
    display: flex;
    flex-direction: column;
    .detail-gray {
      color: #999;
      margin-top: 5rpx;
    }
  }
}
</style>
