<template>
  <view class="card" :shadow="false">
    <!-- 车辆信息表单 -->
    <view class="vehicle-form">
      <view v-if="!vehicleStore.isLoading" class="form-group">
        <label for="license-plate">车牌号码:</label>
        <input id="license-plate" v-model="vehicleStore.vehicleData.licensePlate" placeholder="请输入车牌号码">
      </view>
      <view class="form-group">
        <label for="power-type">动力类型:</label>
        <select id="power-type" v-model="vehicleStore.vehicleData.powerType">
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
        <select id="vehicle-type" v-model="vehicleStore.vehicleData.vehicleType">
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
        <select id="vehicle-type" v-model="vehicleStore.vehicleData.etcInfo">
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
        <input id="model" v-model="vehicleStore.vehicleData.model" placeholder="请输入车型信息">
      </view>
      <!-- 提交按钮 -->
      <view class="form-group">
        <button :disabled="vehicleStore.isLoading" @click="submitVehicleData">
          保存
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useVehicleStore } from '@/store/modules/vehicle';

const vehicleStore = useVehicleStore();

async function submitVehicleData() {
  try {
    vehicleStore.isLoading = true;
    await vehicleStore.submitVehicleData();
    console.log('车辆数据已提交');
    // 提交成功
  }
  catch (error) {
    console.error('提交车辆数据失败:', error);
    vehicleStore.error = error instanceof Error ? error.message : '未知错误';
  }
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  background-color: white;
  box-shadow: none;
}

.vehicle-form {
  display: flex;
  flex-direction: column;

  .form-group {
    margin-bottom: 10px;

    label {
      margin-right: 10px;
    }

    input, select {
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 5px 15px;
      background-color: #5aa7e6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      opacity: 0.5;
    }

    button:enabled {
      opacity: 1;
    }
  }
}
</style>
