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
            {{ vehicleData.licensePlate }}
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
export default {
  name: 'VehicleInfoCard',
  props: {
    vehicleData: {
      type: Object,
      default: () => ({
        licensePlate: '粤M***1N',
      }),
    },
  },
  methods: {
    goToPage() {
      // 替换下面的路径为你的路由路径
      this.$router.push('/pages/me/VehicleManagement');
    },
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
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .sub-header {
      font-size: 18px;
      color: #666;
      margin-bottom: 20px;
    }

    .content {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .image-container {
    width: 100px;
    height: 100px;
    margin-left: 10px;
  }

  .vehicle-image {
    width: 110%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
}
</style>
