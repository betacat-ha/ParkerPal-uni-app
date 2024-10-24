<script setup lang="ts">
import { useOrderStore, useParkingLotStore, useUserStore } from '@/store/index'
import type { TbOrder } from '@/store/modules/order/types'

const userStore = useUserStore()
const parkingLotStore = useParkingLotStore()
const orderStore = useOrderStore()
const { parkingLots } = storeToRefs(parkingLotStore)

const searchKeyword = ref('')
const showAgreePrivacy = ref(false)
const activeOrder = ref<TbOrder | null>(null)

onMounted(async () => {
  await parkingLotStore.getParkingLots()
  if (userStore.isLoggedIn) {
    await orderStore.getOrdersByUserId(userStore.getUserId!)
  }
  activeOrder.value = await orderStore.getActiveOrder()
})

onShow(() => {
  userStore.setTabValue(0)
})

const bannerList = reactive([
  {
    image: 'https://s2.loli.net/2024/07/28/BHxQ5yLgJ986KnA.png',
  },
  {
    image: 'https://s2.loli.net/2024/07/28/t3LIk8SRUnZ2miV.png',
  },
])

const filteredParkingLots = computed(() => {
  if (!searchKeyword.value)
    return parkingLots.value
  return parkingLots.value.filter(lot =>
    lot.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
    || lot.address.toLowerCase().includes(searchKeyword.value.toLowerCase()),
  )
})

function handleSearch(key: string) {
  searchKeyword.value = key
}

function handleScan() {
  uni.scanCode({
    onlyFromCamera: true,
    success: (res) => {
      console.log(res.result)
      uni.$u.toast(`${res.result}`)
    },
  })
}

function navigateToParkingLotDetail(parkingLotId: string) {
  uni.navigateTo({ url: `/pages/home/parkinglot/detail?parkingLotId=${parkingLotId}` })
}

function navigateToOrder(orderId: string) {
  uni.navigateTo({ url: `/pages/home/me/user/order?orderId=${orderId}` })
}

// 同意隐私协议
function handleAgree() {
  console.log('同意隐私政策')
}
</script>

<template>
  <view class="page-wrap">
    <u-navbar :safe-area-inset-top="true" :placeholder="true">
      <template #left>
        <view class="u-nav-slot" style="width: 68vw;">
          <view class="flex items-center justify-between">
            <text style="padding-right: 20rpx;">
              智泊无忧
            </text>
            <u-search
              v-model="searchKeyword"
              search-icon="scan"
              :show-action="false"
              placeholder="搜索停车场"
              :clearabled="true"
              @search="handleSearch"
              @click-icon="handleScan"
            />
          </view>
        </view>
      </template>
    </u-navbar>

    <view class="width-100 mb-20rpx">
      <u-swiper :list="bannerList" key-name="image" :autoplay="true" indicator height="200" radius="10" interval="5000" />
    </view>

    <view class="title-bar">
      <view class="text">
        正在进行的订单
      </view>
    </view>
    <view v-if="activeOrder">
      <Card :right-title="`订单号:${activeOrder.orderNo}`">
        <view class="active-order">
          <view>
            <view>
              <text class="parking-lot-name">
                {{ activeOrder.parkingLotName }}
              </text>
            </view>
            <view>
              <text class="item-gray">
                位置：{{ activeOrder.position }}
              </text>
            </view>
            <view>
              <text class="item-gray">
                创建时间：{{ activeOrder.createTime }}
              </text>
            </view>
          </view>
          <view class="nav-btn" @click="navigateToOrder(activeOrder._id)">
            <u-icon name="map" size="50rpx" />
          </view>
        </view>
      </Card>
    </view>
    <view v-else class="no-order">
      <text>快去使用服务</text>
    </view>

    <view class="title-bar">
      <view class="text">
        附近的停车场
      </view>
    </view>
    <view
      v-for="(lot, index) in filteredParkingLots"
      :key="index"
      class="width-100"
      @click="navigateToParkingLotDetail(lot._id)"
    >
      <Card>
        <view class="parking-lot">
          <image :src="lot.logo" mode="aspectFill" :fade="true" class="logo">
            <u-loading-icon />
          </image>
          <view class="info">
            <text class="name">
              {{ lot.name }}
            </text>
            <text class="address">
              {{ lot.address }}
            </text>
            <text>剩余空位： {{ lot.remainSpaces }}</text>
          </view>
        </view>
      </Card>
    </view>

    <!-- #ifdef MP-WEIXIN -->
    <!-- 隐私协议组件 -->
    <AgreePrivacy v-model="showAgreePrivacy" :disable-check-privacy="false" @agree="handleAgree" />
    <!-- #endif -->

    <Tabbar />
  </view>
</template>

<style lang="scss" scoped>
.page-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0rpx 20rpx;
  gap: 20rpx;
}

.width-100 {
  // margin-top: 30rpx;
  width: 100%;
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  margin: 0 20rpx;
  width: 100%;

  .text {
    font-size: 40rpx;
    font-weight: bold;
  }

  .button{
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #909399;
  }
}

.bg-white {
  background-color: white;
}

.parking-lot {
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
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
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

.active-order {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .parking-lot-name {
    font-size: 30rpx;
    font-weight: bold;
  }

  .item-gray {
    margin-top: 5rpx;
    color: #999;
  }
}

.nav-btn {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.no-order {
  padding: 20rpx;
  font-size: 32rpx;
  text-align: center;
  color: #999;
}
</style>
