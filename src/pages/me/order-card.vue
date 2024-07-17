<template>
  <Card :shadow="false">
    <!-- 图标按钮组 -->
    <view class="icon-buttons">
      <view
        v-for="(icon, index) in icons"
        :key="index"
        @click="navigateToPage(icon.pagePath)"
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
  },
  data() {
    return {
      icons: [
        {
          name: 'order',
          size: '50rpx',
          color: '#696969',
          text: '全部订单',
          pagePath: '/pages/home/index', // 首页路由路径
        },
        {
          name: 'clock',
          size: '50rpx',
          color: '#696969',
          text: '待付款',
          pagePath: '/pages/setting/index', // 设置路由路径
        },
        {
          name: 'reload',
          size: '50rpx',
          color: '#696969',
          text: '退款/取消',
          pagePath: '/pages/home/index', // 首页路由路径
        },
        {
          name: 'chat',
          size: '50rpx',
          color: '#696969',
          text: '待评价',
          pagePath: '/pages/setting/index', // 设置路由路径
        },
        {
          name: 'coupon',
          size: '50rpx',
          color: '#696969',
          text: '钱包卡卷',
          pagePath: '/pages/setting/index', // 设置路由路径
        },

      ],
    };
  },
  methods: {
    navigateToPage(pagePath) {
      uni.navigateTo({
        url: pagePath,
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
  gap: 10px; /* 调整图标按钮组之间的间距 */
}
</style>
