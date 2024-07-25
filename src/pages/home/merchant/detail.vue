<template>
  <view>
    <view v-if="showDetail">
      <view class="bg-white">
        <u-swiper :list="list2" key-name="image" :autoplay="true" />
      </view>
      <view class="page-wrap">
        <Card class="merchant-info-card">
          <view class="detail">
            <text class="title">
              {{ merchantData.name }}
            </text>
            <text class="address">
              {{ merchantData.address }}
            </text>
          </view>
          <u-gap height="1" bg-color="#cdcdcd" />
          <view>
            <text class="desc">
              {{ merchantData.desc }}
            </text>
          </view>
        </Card>

        <Card left-title="停车优惠套餐" title-color="#FFFFFF">
          <view class="plans-card">
            <view v-for="plan in plans" :key="plan.id">
              <view class="plan-cell">
                <view class="plan-info">
                  <text class="plan-name">
                    {{ plan.name }}
                  </text>
                  <text class="plan-desc">
                    {{ plan.description }}
                  </text>
                </view>

                <text class="plan-price">
                  ¥{{ plan.price }}
                </text>
              </view>

              <u-gap height="2" bg-color="#cdcdcd" />
            </view>
          </view>
        </Card>
      </view>
    </view>
    <view v-if="showEmpty">
      <view class="empty-wrap">
        <u-empty text="暂无车场信息" mode="list" />
      </view>
    </view>
    <u-loading-page :loading="showLoading" />
  </view>
</template>

<script setup lang="ts">
import type { MerchantInfo } from '@/store/modules/merchant/types';
import { getById } from '@/api/merchant';

// 从路由获取id
const id = ref(0);
const merchantData = ref<MerchantInfo>();
const plans = ref([]);

const showLoading = ref(false);
const showDetail = ref(true);
const showEmpty = computed(() => !showDetail.value && !showLoading.value);

onLoad((option) => {
  id.value = option.id;
  if (!id.value) {
    showLoading.value = false;
    showDetail.value = false;
    console.warn('请传入商户ID');
    return;
  }
  console.log(`开始加载商户ID：${id.value}`);
  getById(id.value).then((res) => {
    merchantData.value = res;
    plans.value = res.plans;
    showLoading.value = false;
    showDetail.value = true;
  }).catch(() => {
    showLoading.value = false;
    showEmpty.value = true;
  });
});

const list2 = reactive([
  {
    image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
  },
  {
    image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
  },
  {
    image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
  },
]);
</script>

<style lang="scss" scoped>
.page-wrap {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
}

.merchant-info-card {
  .detail {
    display: flex;
    flex-direction: column;
    gap: 15rpx;

    .title {
      font-size: 32rpx;
      font-weight: bold;
    }

    .address {
      font-size: 24rpx;
      color: #696969;
    }
  }
}

.plans-card {
  display: flex;
  flex-direction: column;
  gap: 10rpx;

  .plan-cell{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10rpx;

    .plan-info{
      display: flex;
      flex-direction: column;
      gap: 5rpx;

      .plan-name{
      font-size: 28rpx;
      }

      .plan-desc{
        font-size: 24rpx;
        color: #696969;
      }
    }

    .plan-price{
      font-size: 28rpx;
      color: #fb5c00;
    }
  }
}
</style>
