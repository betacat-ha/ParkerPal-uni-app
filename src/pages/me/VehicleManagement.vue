<template>
  <view class="vehicle-info">
    <view class="card">
      <h2>车辆信息展示</h2>
      <view class="info-group">
        <label>车牌号码:</label>
        <span>{{ vehicleInfo.licensePlate }}</span>
      </view>
      <view class="info-group">
        <label>动力类型:</label>
        <span>{{ powerTypeDescriptions[vehicleInfo.powerType] }}</span>
      </view>
      <view class="info-group">
        <label>车辆类型:</label>
        <span>{{ vehicleInfo.vehicleType === 'non-pickup' ? '非皮卡' : '皮卡' }}</span>
      </view>
      <view class="info-group">
        <label>ETC信息:</label>
        <span>{{ vehicleInfo.etcInfo === 'yes' ? '有ETC' : '无ETC' }}</span>
      </view>
      <view class="info-group">
        <label>车型信息:</label>
        <span>{{ vehicleInfo.model }}</span>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import { useVehicleStore } from '@/store/modules/vehicle';

const vehicleStore = useVehicleStore();
const vehicleInfo = computed(() => vehicleStore.vehicleData);

const powerTypeDescriptions = {
  oil: '油车',
  electric: '纯电',
  hybrid: '混动',
};
</script>

<style lang="scss" scoped>
.vehicle-info {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  background-color: white;

  h2 {
    margin-bottom: 20px;
  }

  .info-group {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      font-weight: bold;
    }

    span {
      flex-grow: 1;
      text-align: right;
    }
  }
}
</style>
