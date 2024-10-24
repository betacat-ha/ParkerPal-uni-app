<script setup lang="ts">
import { useOrderStore, useUserStore } from '@/store/index'
import type { TbOrder } from '@/store/modules/order/types'

interface Tab {
  name: string
  status: OrderStatus
}

enum OrderStatus {
  ALL = 'ALL',
  IN_PROGRESS = 'IN_PROGRESS',
  REFUND_AFTER_SALE = 'REFUND_AFTER_SALE',
  PENDING_REVIEW = 'PENDING_REVIEW',
  COMPLETED = 'COMPLETED',
}

const orderStore = useOrderStore()
const userStore = useUserStore()
const { orders } = storeToRefs(orderStore)

const activeTab = ref(0)
const filteredOrders = ref<TbOrder[]>([])

const tabs: Tab[] = [
  { name: '全部', status: OrderStatus.ALL },
  { name: '进行中', status: OrderStatus.IN_PROGRESS },
  { name: '退款/售后', status: OrderStatus.REFUND_AFTER_SALE },
  { name: '待评价', status: OrderStatus.PENDING_REVIEW },
  { name: '已完成', status: OrderStatus.COMPLETED },
]

onMounted(async () => {
  if (!orders.value?.length) {
    await orderStore.getOrdersByUserId(userStore.getUserId!)
    updateFilteredOrders(tabs[activeTab.value].status)
  }
})

function statusToTabName(status: string) {
  return tabs.find(tab => tab.status === status)?.name || '未知'
}

function handleTabChange(item: Tab) {
  activeTab.value = tabs.findIndex(tab => tab.status === item.status)
  updateFilteredOrders(tabs[activeTab.value].status)
}

function updateFilteredOrders(status: OrderStatus) {
  filteredOrders.value = orders.value.filter(order => status === OrderStatus.ALL || order.status === status)
}

function navigateToOrderDetail(orderId: string) {
  uni.navigateTo({
    url: `/pages/me/user/order/index?orderId=${orderId}`,
  })
}
</script>

<template>
  <view class="container">
    <!-- 标签栏 -->
    <u-sticky bg-color="#ffffff">
      <u-tabs :list="tabs" :current="activeTab" @change="handleTabChange" />
    </u-sticky>

    <!-- 订单列表 -->
    <view v-for="order in filteredOrders" :key="order._id" class="order-card" @click="navigateToOrderDetail(order._id)">
      <view class="order-info">
        <view class="title">
          <text>{{ order.parkingLotName }}</text>
        </view>
        <view class="button-divider" />
        <view class="license">
          订单号：<text>{{ order.orderNo }}</text>
        </view>
        <view class="time">
          停车时长：<text>{{ order.parkingDuration }}</text>
        </view>
      </view>
      <view class="status">
        <text>
          {{ statusToTabName(order.status) }}
        </text>
      </view>
      <view class="button-divider" />
      <view class="amount">
        <text>费用：￥{{ order.payment }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
$primaryColor: #3572EF;
$warningColor: #FF6B6B;
$warningLightColor: #FFA500;
$successColor: #66BB6A;

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.order-card {
  padding: 20rpx;
  margin: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 4rpx rgb(0 0 0 / 10%);
}

.order-info {
  display: flex;
  flex-direction: column;
}

.title {
  margin-bottom: 10rpx;
  font-size: 30rpx;
  font-weight: bold;
}

.button-divider {
  margin: 10rpx 0;
  height: 1rpx;
  background-color: #e0e0e0;
}

.license,
.time {
  margin-bottom: 10rpx;
  font-size: 26rpx;
}

.status {
  margin-top: 10rpx;
  font-size: 26rpx;
}

.amount {
  margin-top: 10rpx;
  font-size: 26rpx;
}
</style>
