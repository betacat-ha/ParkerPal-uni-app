<template>
  <u-tabs :list="list1" @click="click" />
</template>

<script setup>
import { reactive } from 'vue';

// 创建响应式数据
const list1 = reactive([
  { name: '全部' },
  { name: '待付款' },
  { name: '待使用' },
  { name: '退款/取消' },
  { name: '待评价' },
  { name: '钱包卡卷' },
]);

// 定义方法
function click(item) {
  console.log('item', item);
}
</script>
