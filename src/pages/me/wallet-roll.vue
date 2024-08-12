<template>
  <view class="coupon-container">
    <!-- 将优惠券卡片内容放置在 v-for 循环内部 -->
    <view
      v-for="(coupon, index) in coupons"
      :key="coupon.id"
      class="coupon-card"
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
    </view>
  </view>

  <view class="bg-white">
    <u-swiper :list="bannerList" key-name="image" :autoplay="true" circular show-title />
  </view>

  <Card />

  <view class="bg-white">
    <u-swiper :list="bannerList1" key-name="image" :autoplay="true" circular show-title />
  </view>
</template>

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
]);

const bannerList = reactive([
  {
    image: 'https://img.mp.sohu.com/upload/20170723/bc16d820779a4bbaa558ccc02421f705_th.png',
    title: '走过路过不要错过，一小时只需1元！！',
  },
  {
    image: 'https://s2.loli.net/2024/07/11/LaotOqrlU9ISvTw.jpg',
    title: '广东技术师范大学停车场限时特价重磅来袭！！',
  },
]);

const bannerList1 = reactive([
  {
    image: 'https://s2.loli.net/2024/07/26/maQ163oScPik4uI.jpg',
    title: '广东技术师范大学停车场限时特价重磅来袭！！',
  },
  {
    image: 'https://img.mp.sohu.com/upload/20170723/bc16d820779a4bbaa558ccc02421f705_th.png',
    title: '走过路过不要错过，一小时只需1元！！',
  },
]);

function goToCouponDetail(coupon) {
  // 跳转到优惠券详情页面的逻辑
  console.log('Go to detail:', coupon);
}

function useCoupon(couponId) {
  // 使用优惠券的逻辑
  console.log('Use coupon:', couponId);
}
</script>

<style>
.coupon-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(48, 48, 48, 0.1);
  margin: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.coupon-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.coupon-title {
  font-size: 18px;
  font-weight: bold;
  color: #3a3a3a;
}

.coupon-discount {
  background-color: #fff6f6;
  color: #e75353;
  border-radius: 10px;
  padding: 5px 5px;
  font-size: 16px;
}

.coupon-body {
  margin-top: 10px;
  width: 100%;
  text-align: center;
}

.coupon-description {
  color: #666666;
  font-size: 14px;
}

.coupon-expiration {
  color: #999999;
  font-size: 12px;
}

.coupon-footer {
  margin-top: 20px;
}

.use-coupon-btn {
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 16px;
  cursor: pointer;
}
.coupon-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.coupon-card {
  margin-bottom: 10px;
  width: calc(49% - 10px);
  box-sizing: border-box;
}
</style>
