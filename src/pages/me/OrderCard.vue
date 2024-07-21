<template>
  <view class="order-card">
    <view class="order-info">
      <text class="order-title">
        {{ orderData.title }}
      </text>
      <text class="order-id">
        订单编号: {{ orderData.id }}
      </text>
    </view>
    <view class="order-status">
      <text :class="{ 'status-pending': orderData.status === '待付款', 'status-used': orderData.status === '待使用', 'status-refund': orderData.status === '退款/取消', 'status-review': orderData.status === '待评价' }">
        {{ orderData.status }}
      </text>
    </view>
    <view class="order-amount">
      <text>￥{{ orderData.amount }}</text>
    </view>
    <view class="order-actions">
      <!-- 根据订单状态显示不同的操作 -->
      <button v-if="orderData.status === '待付款'" @click="goToPayment(orderData.id)">
        去付款
      </button>
      <button v-if="orderData.status === '待使用'" @click="goToUse(orderData.id)">
        去使用
      </button>
      <button v-if="orderData.status === '退款/取消'" @click="viewDetails(orderData.id)">
        查看详情
      </button>
      <button v-if="orderData.status === '待评价'" @click="goToReview(orderData.id)">
        去评价
      </button>
    </view>
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

<style scoped>
.order-card {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.order-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-title {
  font-size: 16px;
  font-weight: bold;
}

.order-id {
  font-size: 14px;
  color: #666;
}

.order-status {
  margin-top: 10px;
}

.status-pending {
  color: #f50;
}

.status-used {
  color: #06f;
}

.status-refund {
  color: #f90;
}

.status-review {
  color: #0b3;
}

.order-amount {
  margin-top: 10px;
  font-size: 18px;
}

.order-actions {
  margin-top: 10px;
  display: flex;
}

button {
  margin-right: 10px;
  padding: 5px 15px;
  border: none;
  border-radius: 4px;
  background-color: #8cd4f3;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #97f0cc;
}
</style>
