<script setup lang="ts">
import { useParkingLotStore } from '@/store/index'
import type { ParkingLotDetails } from '@/store/modules/parkinglot/types'

const parkingLotStore = useParkingLotStore()

const parkingLotDetails = ref<ParkingLotDetails | null>(null)

onLoad(async (query) => {
  if (query && query.parkingLotId) {
    parkingLotDetails.value = await parkingLotStore.getParkingLotDetails(query.parkingLotId)
  }
})

watch(parkingLotDetails, (newVal) => {
  if (newVal) {
    console.log('Parking Lot Details updated:', newVal) // 调试日志
    // 确保 DOM 更新
    nextTick(() => {
      console.log('DOM updated after parkingLotDetails change')
    })
  }
})
</script>

<template>
  <div v-if="parkingLotDetails" class="parking-lot-detail">
    <h2>{{ parkingLotDetails.name }}</h2>
    <p><strong>地址:</strong> {{ parkingLotDetails.address }}</p>
    <p><strong>电话:</strong> {{ parkingLotDetails.phone }}</p>
    <p><strong>状态:</strong> {{ parkingLotDetails.status === 0 ? '不可用' : '可用' }}</p>
    <p><strong>剩余车位:</strong> {{ parkingLotDetails.remainSpaces }}</p>
    <p><strong>套餐信息:</strong></p>
    <ul>
      <li v-for="pkg in parkingLotDetails.packages" :key="pkg._id">
        <strong>{{ pkg.name }}:</strong> {{ pkg.description }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.parking-lot-detail {
  padding: 20px;
  margin-top: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.parking-lot-detail h2 {
  margin-top: 0;
}

.parking-lot-detail ul {
  margin-left: 20px;
  list-style: disc;
}
</style>
