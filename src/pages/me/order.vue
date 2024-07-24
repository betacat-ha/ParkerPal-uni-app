<template>
  <view>
    <!-- 标签栏 -->
    <u-tabs :list="list1" @change="handleClick" />
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
import { computed, reactive, ref } from 'vue';
import OrderCard from './OrderCard.vue';

const orders = ref([
  {
    id: 1,
    title: '广东技术师范大学停车场',
    status: '待付款',
    amount: 39.99,
  },
  {
    id: 2,
    title: '幸福花园地下停车场',
    status: '待使用',
    amount: 15.00,
  },
  {
    id: 3,
    title: '棠下智慧停车场',
    status: '退款/取消',
    amount: 59.00,
  },
  {
    id: 4,
    title: '棠下智慧停车场',
    status: '待评价',
    amount: 30.05,
  },
  {
    id: 5,
    title: '广东技术师范大学停车场',
    status: '待付款',
    amount: 39.19,
  },
  {
    id: 6,
    title: '棠下智慧停车场',
    status: '待使用',
    amount: 25.00,
  },
  {
    id: 7,
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

// 当前激活的标签
const activeTab = ref('全部');

// 根据当前激活的标签筛选订单
const filteredOrders = computed(() => {
  if (activeTab.value === '全部')
    return [];// 如果选择全部，则不筛选
  const status = activeTab.value;
  return orders.value.filter(order => order.status === status);
});

function handleClick(item) {
  if (item.name === '全部') {
    activeTab.value = '全部';
  }
  else {
    activeTab.value = item.name;
  }
}
</script>
