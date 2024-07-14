<template>
  <Card>
    <!-- 商户信息 -->
    <view class="merchant">
      <image :src="merchantData.logo" mode="aspectFill" class="logo" />
      <view class="info">
        <text class="name">
          {{ merchantData.name }}
        </text>
        <text class="address">
          {{ merchantData.address }}
        </text>
      </view>
    </view>

    <!-- 列出套餐 -->
    <view v-for="(item, index) in merchantData.plan" :key="index" class="plan">
      <view class="info">
        <view class="tag">
          {{ item.tag }}
        </view>
        <view class="name">
          {{ item.name }}
        </view>
      </view>
      <view>
        <text class="price">
          ￥{{ item.price }}
        </text>
      </view>
    </view>
  </Card>
</template>

<script>
export default {
  name: 'MerchantCard',
  props: {
    merchantData: {
      type: Object,
      default: () => ({
        name: '广东技术师范大学体育馆',
        address: '中山大道西293号',
        logo: 'https://s2.loli.net/2024/07/11/LaotOqrlU9ISvTw.jpg',
        plan: [
          {
            name: '夜间套餐（1月）',
            price: 100,
            tag: '夜间',
          },
          {
            name: '全天套餐（1月）',
            price: 200,
            tag: '全天',
          },
        ],
      }),
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.merchant {
    display: flex;
    justify-content: left;
    align-items: center;

    .logo {
        width: 150rpx;
        height: 150rpx;
        border-radius: 20rpx;
    }

    .info {
        // 垂直左对齐
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 20rpx;

        .name {
            font-size: 32rpx;
            color: #333;
        }

        .address {
            font-size: 24rpx;
            color: #999;
        }
    }
}

.plan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;

    .info {
        display: flex;
        justify-content: left;
        align-items: center;

        .tag {
            padding: 2rpx 15rpx;
            font-size: smaller;
            color: #fb7900;
            border: 3rpx solid #fb7900;
            border-radius: 15rpx;
        }

        .name {
            margin-left: 15rpx;
        }
    }

    .price {
        font-size: 32rpx;
        color: #fb7900;
    }
}
</style>
