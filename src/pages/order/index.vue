<script setup>
import { computed, reactive, ref, watch } from 'vue'
import walletRollVue from '../me/wallet-roll.vue'
import OrderCard from './order-card.vue'

const orders = ref([
  {
    id: 1,
    licensePlate: '粤M·1234N',
    createtime: '2023-02-18 19:30',
    parkingLotName: '广东技术师范大学综合楼停车场',
    parkingDuration: '0天2时52分27秒',
    status: '进行中',
    amount: 39.99,
  },
  {
    id: 2,
    licensePlate: '粤M·1234N',
    createtime: '2024-08-11 21:30',
    parkingLotName: '大舜丽池国际酒店停车场',
    parkingDuration: '0天0时40分27秒',
    status: '进行中',
    amount: 15.00,
  },
  {
    id: 3,
    licensePlate: '粤M·1234N',
    createtime: '2024-05-22 09:30',
    parkingLotName: '同创石牌田圃小桔充电站停车场',
    parkingDuration: '0天3时52分27秒',
    status: '退款/售后',
    amount: 59.00,
  },
  {
    id: 4,
    licensePlate: '粤M·1234N',
    createtime: '2023-11-23 20:10',
    parkingLotName: '泊寓棠下店停车场',
    parkingDuration: '0天1时22分07秒',
    status: '待评价',
    amount: 30.05,
  },
  {
    id: 5,
    licensePlate: '粤M·1234N',
    createtime: '2023-11-23 20:10',
    parkingLotName: '广东技术师范大学综合楼停车场',
    parkingDuration: '0天1时52分27秒',
    status: '进行中',
    amount: 39.19,
  },
  {
    id: 6,
    licensePlate: '粤M·1234N',
    createtime: '2024-08-12 08:10',
    parkingLotName: '创新基地停车场',
    parkingDuration: '0天1时02分27秒',
    status: '进行中',
    amount: 25.00,
  },
  {
    id: 7,
    licensePlate: '粤M·1234N',
    createtime: '2023-11-23 20:10',
    parkingLotName: '广东技术师范大学篮球场停车场',
    parkingDuration: '0天2时52分27秒',
    status: '退款/售后',
    amount: 59.00,
  },
  {
    id: 8,
    licensePlate: '粤M·1234N',
    createtime: '2023-10-23 20:10',
    parkingLotName: '广东技术师范大学停车场',
    parkingDuration: '0天0时52分27秒',
    status: '已完成',
    amount: 19.99,
  },
  {
    id: 9,
    licensePlate: '粤M·1234N',
    createtime: '2023-12-20 18:10',
    parkingLotName: '科学城商业广场停车场',
    parkingDuration: '0天0时30分27秒',
    status: '已完成',
    amount: 9.99,
  },
  {
    id: 9,
    licensePlate: '粤M·1234N',
    createtime: '2023-12-20 18:10',
    parkingLotName: '科学城商业广场停车场',
    parkingDuration: '0天0时30分27秒',
    status: '已完成',
    amount: 9.99,
  },

])

const list1 = reactive([
  { name: '全部' },
  { name: '进行中' },
  { name: '退款/售后' },
  { name: '待评价' },
  { name: '已完成' },
  { name: '钱包卡券' },
])

const activeTab = ref('全部') // 默认显示全部订单
const activeTabIndex = computed(() => list1.findIndex(item => item.name === activeTab.value)) // 计算当前激活的标签的索引

const type = ref('all')

// 根据当前激活的标签筛选订单
const filteredOrders = computed(() => {
  const status = activeTab.value
  return status === '全部' || status === '钱包卡券' ? orders.value : orders.value.filter(order => order.status === status)
})

function handleClick(item) {
  if (item.name === '全部') {
    activeTab.value = '全部'
  }
  else {
    activeTab.value = item.name
  }
}

// 监听 type 变化
watch(type, (newType) => {
  if (newType) {
    activeTab.value = newType === 'all' ? '全部' : newType
  }
})

// 初始页面加载时，设置 activeTab
if (type.value) {
  activeTab.value = type.value === 'all' ? '全部' : type.value
}

onLoad((option) => {
  type.value = option?.type
})
</script>

<template>
  <view>
    <!-- 标签栏 -->
    <u-sticky bg-color="#ffffff">
      <u-tabs :list="list1" :current="activeTabIndex" @change="handleClick" />
    </u-sticky>
    <!-- 内容展示 -->
    <view v-if="activeTab === '全部'">
      <OrderCard v-for="order in orders" :key="order.id" :order-data="order" />
    </view>
    <view v-else-if="activeTab === '钱包卡券'">
      <walletRollVue />
    </view>
    <view v-else>
      <text>{{ activeTab.value }}</text>
      <OrderCard v-for="(order, index) in filteredOrders" :key="`filtered-${index}`" :order-data="order" />
    </view>
  </view>
</template>
