<script setup>
import { useVehicleStore } from '@/store/modules/vehicle/index'

const vehicleStore = useVehicleStore()
const { vehicleInfo } = storeToRefs(vehicleStore)
const vehicleId = route.params.id
const vehicle = ref(null)

onMounted(() => {
  vehicle.value = vehicleInfo.value.find(v => v.vehicleId === vehicleId)
})

function updateVehicle() {
  // 更新车辆信息逻辑
  vehicleStore.updateVehicle(vehicle.value)
  router.back()
}
</script>

<template>
  <Navbar />

  <view v-if="vehicle">
    <h2>车辆详情</h2>
    <view>
      <label for="licensePlate">车牌号:</label>
      <input id="licensePlate" v-model="vehicle.licensePlate" type="text">
    </view>
    <button @click="updateVehicle">
      保存更改
    </button>
  </view>
</template>
