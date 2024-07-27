<template>
  <view class="page-wrap">
    <Card class="vehicle-form">
      <!-- 车辆信息表单 -->
      <view v-if="!vehicleStore.isLoading" class="form-group">
        <label for="license-plate">车牌号码:</label>
        <input id="license-plate" model:value="{{vehicleInfo.licensePlate}}" placeholder="请输入车牌号码">
      </view>
      <view class="form-group">
        <label for="power-type">动力类型:</label>
        <select id="power-type" model:value="{{vehicleInfo.powerType}}">
          <option value="oil">
            油车
          </option>
          <option value="electric">
            纯电
          </option>
          <option value="hybrid">
            混动
          </option>
        </select>
      </view>
      <view class="form-group">
        <label for="vehicle-type">车辆类型:</label>
        <select id="vehicle-type" model:value="{{vehicleInfo.vehicleType}}">
          <option value="non-pickup">
            非皮卡
          </option>
          <option value="pickup">
            皮卡
          </option>
        </select>
      </view>
      <view class="form-group">
        <label for="vehicle-type">ETC信息:</label>
        <select id="vehicle-type" model:value="{{vehicleInfo.etcInfo}}">
          <option value="yes">
            有ETC
          </option>
          <option value="no">
            无ETC
          </option>
        </select>
      </view>
      <view class="form-group">
        <label for="model">车型信息:</label>
        <input id="model" model:value="{{vehicleInfo.model}}" placeholder="请输入车型信息">
      </view>
      <view class="form-group">
        <u-button @click="submitVehicleData">
          保存
        </u-button>
      </view>
    </Card>
  </view>
</template>

<script setup>
import { useVehicleStore } from '@/store/modules/vehicle/index';

const vehicleStore = useVehicleStore();
const vehicleInfo = storeToRefs(vehicleStore);

onLoad(() => {
  vehicleStore.fetchVehicleInfo();
});

// 提交车辆数据的方法
const submitVehicleData = async () => {
  try {
    vehicleStore.isLoading = true;
    await vehicleStore.submitVehicleData();
  }
  catch (error) {
    console.error('Failed to submit vehicle data:', error);
  }
  finally {
    vehicleStore.isLoading = false;
  }
};
</script>

<style lang="scss" scoped>
.page-wrap {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 30rpx;
}
.vehicle-form {
  padding: 30rpx;
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15rpx;

    label {
      font-size: 24rpx;
      margin-bottom: 5rpx;
    }

    input, select {
      padding: 10rpx;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 30rpx;
    }

    button {
      margin-top: 20rpx;
      padding: 10rpx 15rpx;
      background-color: #5aa7e6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
