<template>
  <view>
    <view v-if="showDetail">
      <view class="bg-white">
        <u-swiper :list="merchantData?.images" key-name="image" indicator :autoplay="true" radius="0" height="250" interval="5000" :loading="showLoading" />
      </view>
      <view class="page-wrap">
        <Card class="merchant-info-card">
          <view class="detail">
            <text class="title">
              {{ merchantData?.name }}
            </text>
            <text class="desc">
              {{ merchantData?.description }}
            </text>
          </view>
          <view style="padding: 15rpx 0rpx 15rpx 0rpx">
            <u-gap height="1" bg-color="#cdcdcd" />
          </view>
          <view class="address flex">
            <u-icon name="map-fill" color="#007AFF" size="24" @click="handleNavigation" />
            <text>
              {{ merchantData?.address }}
            </text>
          </view>
          <view class="phone flex">
            <u-icon name="phone-fill" color="#007AFF" size="24" @click="handleCall" />
            <text class="text">
              {{ merchantData?.phone }}
            </text>
          </view>
        </Card>

        <u-sticky bg-color="#f3f5f9">
          <u-tabs :list="tabList" :scrollable="false" />
        </u-sticky>

        <Card>
          <view class="plans-card">
            <view class="card-title">
              停车优惠套餐
            </view>
            <view v-for="plan in merchantData?.plans" :key="plan.id">
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

        <Card>
          <view class="flex items-center justify-between">
            <view class="card-title">
              车场位置
            </view>
            <view class="reserve" @click="handleReserve">
              不想排队？立即预约停车位
              <u-icon name="arrow-right" color="#000000" />
            </view>
          </view>

          <view class="location" @click="handleNavigation">
            <view>
              <u-image src="https://s2.loli.net/2024/07/29/V41L9MBqF2CbIsA.png" height="300rpx" width="100%" radius="15rpx" :fade="true">
                <template #loading>
                  <u-loading-icon />
                </template>
              </u-image>
            </view>
          </view>
        </Card>

        <Card>
          <view class="service-card">
            <view class="card-title">
              提供服务
            </view>
            <view class="service-cell">
              <view v-for="service, index in merchantData?.services" :key="index" class="service-item">
                <u-icon :name="service.icon" color="#007AFF" size="24" />
                <text class="service-name">
                  {{ service.name }}
                </text>
              </view>
            </view>
          </view>
        </Card>

        <!-- 底部安全区 -->
        <view class="safe-area-inset-bottom" />
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
const id = ref('');
const merchantData = ref<MerchantInfo>();

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

function navigateTo(path: string) {
  uni.navigateTo({
    url: path,
  });
}

function handleNavigation() {
  if (!merchantData.value) {
    return;
  }

  uni.openLocation({
    name: merchantData.value!.name,
    address: merchantData.value!.address,
    latitude: merchantData.value!.latitude,
    longitude: merchantData.value!.longitude,
  });
}

function handleCall() {
  console.log('handleCall');
}

function handleReserve() {
  uni.showToast({
    title: '预约成功',
    icon: 'none',
  });
}

onLoad((option) => {
  id.value = option?.id;
  if (!id.value) {
    switchPage(PageType.Empty);
    console.warn('请传入商户ID');
    return;
  }
  console.log(`开始加载商户ID：${id.value}`);
  getById(id.value, true).then((res) => {
    merchantData.value = res;

    uni.setNavigationBarTitle({
      title: merchantData.value.name,
    });

    switchPage(PageType.Detail);
  }).catch((res) => {
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

    .desc {
      font-size: 24rpx;
      line-height: 1.5;
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

.service-card {
  display: flex;
  flex-direction: column;
  gap: 10rpx;

  .service-cell{
    display: grid;
    grid-template-columns: repeat(auto-fill, 110px);
    grid-gap: 10px 13px;
    justify-content: space-between;
    .service-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10rpx;
    }
  }
}

.card-title {
  display: flex;
  align-items: center;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.reserve {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  margin-bottom: 8rpx;
}
</style>
