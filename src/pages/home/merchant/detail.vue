<template>
  <view>
    <view v-if="showDetail">
      <view class="bg-white">
        <u-swiper :list="merchantData.images" key-name="image" indicator :autoplay="true" radius="0" height="250" interval="5000" />
      </view>
      <view class="page-wrap">
        <Card class="merchant-info-card">
          <view class="detail">
            <text class="title">
              {{ merchantData.name }}
            </text>
            <view class="address flex">
              <u-icon name="map-fill" color="#007AFF" size="24" @click="hanleCall" />
              <text>
                {{ merchantData.address }}
              </text>
            </view>
          </view>
          <view style="padding: 15rpx 0rpx 15rpx 0rpx">
            <u-gap height="1" bg-color="#cdcdcd" />
          </view>
          <view class="phone flex">
            <u-icon name="phone-fill" color="#007AFF" size="24" @click="hanleCall" />
            <text class="text">
              {{ merchantData.phone }}
            </text>
          </view>
        </Card>

        <u-sticky bg-color="#f3f5f9">
          <u-tabs :list="tabList" :scrollable="false" />
        </u-sticky>

        <Card>
          <view class="plans-card">
            <view class="plans-title">
              停车优惠套餐
            </view>
            <view v-for="plan in plans" :key="plan.id">
              <u-gap height="1" bg-color="#cdcdcd" />
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

const showLoading = ref(true);
const showDetail = ref(false);
const showEmpty = ref(false);

enum PageType {
  Detail,
  Empty,
  Loading,
}

function switchPage(type: PageType) {
  showLoading.value = false;
  showDetail.value = false;
  showEmpty.value = false;

  switch (type) {
    case PageType.Detail:
      showDetail.value = true;
      break;
    case PageType.Empty:
      showEmpty.value = true;
      break;
    case PageType.Loading:
      showLoading.value = true;
      break;
  }
}

onLoad((option) => {
  id.value = option.id;
  if (!id.value) {
    switchPage(PageType.Empty);
    console.warn('请传入商户ID');
    return;
  }
  console.log(`开始加载商户ID：${id.value}`);
  getById(id.value).then((res) => {
    merchantData.value = res;
    plans.value = res.plans;

    uni.setNavigationBarTitle({
      title: merchantData.value.name,
    });

    switchPage(PageType.Detail);
  }).catch(() => {
    switchPage(PageType.Empty);
  });
});

const tabList = reactive([
  { name: '套餐' },
  { name: '位置' },
  { name: '服务' },
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

  .phone {
      .text {
        font-size: 24rpx;
      }
    }
}

.plans-card {
  display: flex;
  flex-direction: column;
  gap: 10rpx;

  .plans-title {
    font-size: 32rpx;
    font-weight: bold;
  }

  .plan-cell{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10rpx;

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
