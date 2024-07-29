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
          pagePath: '/pages/me/order',
          type: '全部',
        },
        {
          name: 'clock',
          size: '50rpx',
          color: '#696969',
          text: '待付款',
          pagePath: '/pages/me/order',
          type: '待付款',
        },
        {
          name: 'reload',
          size: '50rpx',
          color: '#696969',
          text: '退款/取消',
          pagePath: '/pages/me/order',
          type: '退款/取消',
        },
        {
          name: 'chat',
          size: '50rpx',
          color: '#696969',
          text: '待评价',
          pagePath: '/pages/me/order',
          type: '待评价',
        },
        {
          name: 'coupon',
          size: '50rpx',
          color: '#696969',
          text: '钱包卡卷',
          pagePath: '/pages/me/order',
          type: '钱包卡卷',
        },
      ],
    };
  },
  methods: {
    navigateToPage(pagePath, type) {
      console.log('Navigating to:', pagePath, 'with type:', type);
      uni.navigateTo({
        url: `${pagePath}?type=${type}`,
      });
    },
  },
};
</script>

<style lang="scss">
.icon-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}
</style>
