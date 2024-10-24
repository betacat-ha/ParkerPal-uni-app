<script setup>
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVehicleStore } from '@/store/modules/vehicle/index'

const router = useRouter()
const route = useRoute()
const vehicleStore = useVehicleStore()
const { vehicleInfo } = storeToRefs(vehicleStore)
const vehicleId = route.params.id
const vehicle = ref(null)

onBeforeMount(() => {
  vehicle.value = vehicleInfo.value.find(v => v.vehicleId === vehicleId)
})

function updateVehicle() {
  // 更新车辆信息逻辑
  vehicleStore.updateVehicle(vehicle.value)
  router.back()
}
</script>

<template>
  <div v-if="vehicle">
    <h2>车辆详情</h2>
    <div>
      <label for="licensePlate">车牌号:</label>
      <input id="licensePlate" v-model="vehicle.licensePlate" type="text">
    </div>
    <button @click="updateVehicle">
      保存更改
    </button>
  </div>
</template>
