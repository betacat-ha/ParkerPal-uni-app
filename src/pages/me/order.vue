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
    <view v-else-if="activeTab === '钱包卡卷'">
      <text>钱包卡卷</text>
    </view>
    <view v-else>
      <text>{{ activeTab.value }}</text>
      <OrderCard v-for="(order, index) in filteredOrders" :key="`filtered-${index}`" :order-data="order" />
    </view>
  </view>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';
import OrderCard from './OrderCard.vue';

const orders = ref([
  {
    time: '2023-02-18 19:30',
    title: '广东技术师范大学停车场',
    status: '待付款',
    amount: 39.99,
  },
  {
    time: '2024-06-18 21:30',
    title: '幸福花园地下停车场',
    status: '待使用',
    amount: 15.00,
  },
  {
    time: '2024-05-22 09:30',
    title: '棠下智慧停车场',
    status: '退款/取消',
    amount: 59.00,
  },
  {
    time: '2023-11-23 20:10',
    title: '棠下智慧停车场',
    status: '待评价',
    amount: 30.05,
  },
  {
    time: '2023-11-23 20:10',
    title: '广东技术师范大学停车场',
    status: '待付款',
    amount: 39.19,
  },
  {
    time: '2023-11-23 20:10',
    title: '棠下智慧停车场',
    status: '待使用',
    amount: 25.00,
  },
  {
    time: '2023-11-23 20:10',
    title: '幸福花园地下停车场',
    status: '退款/取消',
    amount: 59.00,
  },
  {
    id: 8,
    title: '广东技术师范大学停车场',
    status: '待评价',
    amount: 9.99,
  },
]);

const list1 = reactive([
  { name: '全部' },
  { name: '待付款' },
  { name: '待使用' },
  { name: '退款/取消' },
  { name: '待评价' },
  { name: '钱包卡卷' },
]);

const activeTab = ref('全部'); // 默认显示全部订单
const activeTabIndex = computed(() => list1.findIndex(item => item.name === activeTab.value)); // 计算当前激活的标签的索引

const type = ref('all');

// 根据当前激活的标签筛选订单
const filteredOrders = computed(() => {
  const status = activeTab.value;
  return status === '全部' || status === '钱包卡卷' ? orders.value : orders.value.filter(order => order.status === status);
});

function handleClick(item) {
  if (item.name === '全部') {
    activeTab.value = '全部';
  }
  else {
    activeTab.value = item.name;
  }
}

// 监听 type 变化
watch(type, (newType) => {
  if (newType) {
    activeTab.value = newType === 'all' ? '全部' : newType;
  }
});

// 初始页面加载时，设置 activeTab
if (type.value) {
  activeTab.value = type.value === 'all' ? '全部' : type.value;
}

onLoad((option) => {
  type.value = option?.type;
});
</script>
