<script setup>
import { useUserStore } from '@/store/index'

const userStore = useUserStore()
const vehicles = userStore.getUserVehicles
</script>

<template>
  <Navbar title="我的车辆" />

  <view v-for="(vehicle, index) in vehicles" :key="index">
    <Card :shadow="false" @click="() => goToPage(vehicle.vehicleId)">
      <view class="car">
        <view class="info">
          <view class="sub-header">
            <span class="sub-title">我的车辆</span>
          </view>
          <view class="content">
            <span class="license-plate">{{ vehicle.licensePlate }}</span>
          </view>
        </view>
        <view v-if="vehicle.imageUrl" class="image-container">
          <img class="vehicle-image" :src="vehicle.imageUrl" alt="Vehicle Image">
        </view>
      </view>
    </Card>
  </view>
</template>

<style scoped>
.car {
  display: flex;
  align-items: flex-start;
  padding: 20px;

  .info {
    display: flex;
    flex-direction: column;
    flex: 1;

    .sub-header {
      margin-bottom: 20px;
      font-size: 18px;
      color: #666;
    }

    .content {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .image-container {
    margin-left: 10px;
    width: 100px;
    height: 100px;
  }

  .vehicle-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
}
</style>
