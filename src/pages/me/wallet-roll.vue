<script setup lang="ts">
const coupons = ref([
  {
    id: 1,
    title: '折扣券',
    discount: '8折',
    description: '满100元可用',
    expiration: '2024-09-01',
  },
  {
    id: 2,
    title: '代金券',
    discount: '减20',
    description: '无门槛使用',
    expiration: '2024-10-01',
  },
  {
    id: 3,
    title: '折扣券',
    discount: '9折',
    description: '满50元可用',
    expiration: '2024-09-01',
  },
  {
    id: 4,
    title: '代金券',
    discount: '减50',
    description: '满200元可用',
    expiration: '2024-09-01',
  },
  {
    id: 5,
    title: '折扣券',
    discount: '8.8折',
    description: '满50元可用',
    expiration: '2024-09-01',
  },
  {
    id: 6,
    title: '限时优惠券',
    discount: '减20',
    description: '满50元可用',
    expiration: '2024-08-15',
  },
])

const bannerList = reactive([
  {
    image: 'https://img.mp.sohu.com/upload/20170723/bc16d820779a4bbaa558ccc02421f705_th.png',
    title: '走过路过不要错过，一小时只需1元！！',
  },
  {
    image: 'https://s2.loli.net/2024/07/11/LaotOqrlU9ISvTw.jpg',
    title: '广东技术师范大学停车场限时特价重磅来袭！！',
  },
])

const bannerList1 = reactive([
  {
    image: 'https://s2.loli.net/2024/07/26/maQ163oScPik4uI.jpg',
    title: '广东技术师范大学停车场限时特价重磅来袭！！',
  },
  {
    image: 'https://img.mp.sohu.com/upload/20170723/bc16d820779a4bbaa558ccc02421f705_th.png',
    title: '走过路过不要错过，一小时只需1元！！',
  },
])

function goToCouponDetail(coupon) {
  // 跳转到优惠券详情页面的逻辑
  console.log('Go to detail:', coupon)
}

// function useCoupon(couponId) {
//   // 使用优惠券的逻辑
//   console.log('Use coupon:', couponId)
// }
</script>

<template>
  <view class="page-wrap">
    <view class="coupon-container">
      <!-- 将优惠券卡片内容放置在 v-for 循环内部 -->
      <Card
        v-for="coupon in coupons"
        :key="coupon.id"
        :data-coupon-id="coupon.id"
        @click="goToCouponDetail(coupon)"
      >
        <view class="coupon-header">
          <text class="coupon-title">
            {{ coupon.title }}
          </text>
          <text class="coupon-discount">
            {{ coupon.discount }}
          </text>
        </view>
        <view class="coupon-body">
          <text class="coupon-description">
            {{ coupon.description }}
          </text>
        </view>
        <view class="coupon-body" />
        <text class="coupon-expiration">
          有效期至：{{ coupon.expiration }}
        </text>
      </Card>
    </view>

    <view class="bg-white">
      <u-swiper :list="bannerList" key-name="image" :autoplay="true" circular show-title />
    </view>

    <view class="bg-white">
      <u-swiper :list="bannerList1" key-name="image" :autoplay="true" circular show-title />
    </view>
  </view>
</template>

<style>
.coupon-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.coupon-title {
  font-size: 18px;
  font-weight: bold;
  color: #3a3a3a;
}

.coupon-discount {
  padding: 5px;
  font-size: 16px;
  color: #e75353;
  background-color: #fff6f6;
  border-radius: 5px;
}

.coupon-body {
  margin-top: 10px;
  width: 100%;
  text-align: center;
}

.coupon-description {
  font-size: 14px;
  color: #666;
}

.coupon-expiration {
  font-size: 12px;
  color: #999;
}

.coupon-footer {
  margin-top: 20px;
}

.use-coupon-btn {
  padding: 8px 20px;
  font-size: 16px;
  color: white;
  background-color: #ff6347;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.coupon-container {
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 10px;
  justify-content: space-between;
}

.coupon-card {
  margin-bottom: 10px;
  width: calc(49% - 10px);
  box-sizing: border-box;
}

.page-wrap {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
