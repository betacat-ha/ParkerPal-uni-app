import { defineStore } from 'pinia'
import type { ParkingLotDetails, ParkingLotState, TbParkingLot } from './types'
import { userApi } from '@/api/index'

const useParkingLotStore = defineStore('parkinglot', {
  state: (): ParkingLotState => ({
    parkingLots: [],
    parkingPackages: [],
  }),
  actions: {
    async getParkingLots() {
      try {
        const res = await userApi.getParkingLots()
        this.parkingLots = res.data
      }
      catch (e) {
        console.error(e)
      }
    },
    async getParkingPakages() {
      try {
        const res = await userApi.getParkingPackages()
        this.parkingPackages = res.data
      }
      catch (e) {
        console.error(e)
      }
    },
    async getParkingLotDetails(parkingLotId: string) {
      try {
        // 这里得到的 parkingLot 不应该是响应式的，因为是即时操作
        const parkingLot: TbParkingLot = toRaw(this.parkingLots.filter(lot => lot._id === parkingLotId)[0])
        const res = await userApi.getParkingLotPackages(parkingLot.packages)
        return { ...parkingLot, packages: res.data } as ParkingLotDetails
      }
      catch (e) {
        console.error(e)
      }
    },
  },
})

export default useParkingLotStore
