<template>
  <Card :shadow="false" @click="goToPage">
    <!-- 车辆信息展示 -->
    <view class="car">
      <view class="info">
        <view class="sub-header">
          <text class="sub-title">
            我的车辆
          </text>
        </view>
        <view class="content">
          <text class="license-plate">
            {{ vehicleInfo.licensePlate }}
          </text>
        </view>
      </view>
      <!-- 图片展示 -->
      <view class="image-container">
        <image class="vehicle-image" src="https://img.icons8.com/color/480/porsche.png" />
      </view>
    </view>
  </Card>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useVehicleStore } from '@/store/modules/vehicle';

const vehicleStore = useVehicleStore();
const vehicleInfo = computed(() => vehicleStore.vehicleData);

export default {
  name: 'VehicleInfoCard',
  setup() {
    const router = useRouter();

    // 定义 goToPage
    const goToPage = () => {
      router.push('/pages/me/VehicleManagement');
    };
    return {
      vehicleInfo,
      goToPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.car {
  display: flex;
  align-items: flex-start;
  padding: 20px;

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .header {
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: bold;
    }

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
    width: 110%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
}
</style>
