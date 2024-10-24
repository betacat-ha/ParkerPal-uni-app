<script setup lang="ts">
import { useUserStore } from '@/store/index'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

function navigateToOrder() {
  uni.navigateTo({
    url: '/pages/me/user/order/index',
  })
}

function navigateToVehicle() {
  uni.navigateTo({
    url: '/pages/me/user/vehicle/index',
  })
}

function dologout() {

}

onMounted(async () => {
  await userStore.login('testuser', '123456')
})
</script>

<template>
  <view class="user-center">
    <view class="top-bar">
      <view class="back-button">
        <icon type="left" size="22" />
      </view>
      <text class="title">
        个人中心
      </text>
      <view class="help-button">
        <icon type="question" size="22" />
      </view>
    </view>
    <view class="user-info">
      <image :src="user?.avatar" mode="aspectFill" />
      <view class="info">
        <text class="name">
          {{ user?.name }}
        </text>
        <text class="vip-expire">
          VIP有效期：2024-06-20
        </text>
      </view>
    </view>
    <view class="quick-links">
      <view class="link" @click="navigateToVehicle">
        <!-- <image src="@/static/icons/update.png" mode="aspectFit" /> -->
        <text>我的车辆</text>
      </view>
      <view class="link" @click="navigateToOrder">
        <!-- <image src="@/static/icons/shop.png" mode="aspectFit" /> -->
        <text>我的订单</text>
      </view>
      <view class="link">
        <!-- <image src="@/static/icons/messages.png" mode="aspectFit" /> -->
        <text>消息中心</text>
      </view>
      <view class="link">
        <!-- <image src="@/static/icons/collection.png" mode="aspectFit" /> -->
        <text>我的收藏</text>
      </view>
    </view>
    <view class="menu">
      <!-- 其他菜单项... -->
      <!-- 关于团队、改进意见等 -->
    </view>
    <view class="logout">
      <button @click="dologout">
        退出登录
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.user-center {
  padding: 20px;
  background-color: #F5F5F5;

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    color: #FFF;
    background-color: #2C8DFD;

    .back-button,
    .help-button {
      flex: 1;
      text-align: center;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #FFF;
    border-radius: 10px;

    image {
      margin-right: 20px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .info {
      .name {
        margin-bottom: 10px;
        font-size: 32px;
      }

      .vip-expire {
        font-size: 24px;
        color: #666;
      }
    }
  }

  .quick-links {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #FFF;
    border-radius: 10px;

    .link {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 10px;

      image {
        margin-bottom: 10px;
        width: 60px;
        height: 60px;
      }
    }
  }

  .menu {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      margin-bottom: 20px;
      background-color: #FFF;
      border-radius: 10px;

      text {
        font-size: 30px;
      }
    }
  }

  .logout {
    button {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
