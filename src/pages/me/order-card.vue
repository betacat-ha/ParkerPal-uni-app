<template>
  <Card :shadow="false">
    <!-- 图标按钮组 -->
    <view class="icon-buttons">
      <view
        v-for="(icon, index) in icons"
        :key="index"
        class="icon-wrapper"
        @click="navigateToPage(icon.pagePath)"
      >
        <u-icon
          :name="icon.name"
          :size="icon.size"
          :color="icon.color"
          class="icon-button"
        />
        <span class="icon-text">
          {{ icon.text }}
        </span>
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
          name: 'home',
          size: '48rpx',
          color: '#696969',
          text: '全部订单',
          pagePath: '/pages/home/index', // 首页路由路径
        },
        {
          name: 'setting',
          size: '48rpx',
          color: '#696969',
          text: '待付款',
          pagePath: '/pages/setting/index', // 设置路由路径
        },
        {
          name: 'home',
          size: '48rpx',
          color: '#696969',
          text: '退款/取消',
          pagePath: '/pages/home/index', // 首页路由路径
        },
        {
          name: 'setting',
          size: '48rpx',
          color: '#696969',
          text: '待评价',
          pagePath: '/pages/setting/index', // 设置路由路径
        },
        {
          name: 'setting',
          size: '48rpx',
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
.function-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px; /* 调整图标之间的间距 */
}

.icon-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px; /* 调整图标按钮组之间的间距 */
}

.icon-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #007aff;
  transition: transform 0.3s;
}

.icon-button:hover .icon {
  transform: scale(1.1);
}

.icon-text {
  font-size: 14px;
  margin-top: 5px;
}
</style>
