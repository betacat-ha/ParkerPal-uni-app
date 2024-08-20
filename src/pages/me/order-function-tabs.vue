<script>
export default {
  name: 'OrderCard',
  props: {
    orderData: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: 'all',
    },
  },
  data() {
    return {
      icons: [
        {
          name: 'order',
          size: '50rpx',
          color: '#696969',
          text: '全部订单',
          pagePath: '/pages/order/index',
          type: '全部',
        },
        {
          name: 'clock',
          size: '50rpx',
          color: '#696969',
          text: '进行中',
          pagePath: '/pages/order/index',
          type: '进行中',
        },
        {
          name: 'reload',
          size: '50rpx',
          color: '#696969',
          text: '退款/售后',
          pagePath: '/pages/order/index',
          type: '退款/售后',
        },
        {
          name: 'chat',
          size: '50rpx',
          color: '#696969',
          text: '待评价',
          pagePath: '/pages/order/index',
          type: '待评价',
        },
        {
          name: 'coupon',
          size: '50rpx',
          color: '#696969',
          text: '已完成',
          pagePath: '/pages/order/index',
          type: '已完成',
        },
      ],
    }
  },
  methods: {
    navigateToPage(pagePath, type) {
      console.log('Navigating to:', pagePath, 'with type:', type)
      uni.navigateTo({
        url: `${pagePath}?type=${type}`,
      })
    },
  },
}
</script>

<template>
  <Card :shadow="false">
    <!-- 图标按钮组 -->
    <view class="icon-buttons">
      <view
        v-for="(icon, index) in icons"
        :key="index"
        @click="navigateToPage(icon.pagePath, icon.type)"
      >
        <u-icon
          :label="icon.text"
          label-pos="bottom"
          :name="icon.name"
          :size="icon.size"
          :color="icon.color"
        />
      </view>
    </view>
  </Card>
</template>

<style lang="scss">
.icon-buttons {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
