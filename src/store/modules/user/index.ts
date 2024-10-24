import { defineStore } from 'pinia'
import type { UserState } from './types'
import { userApi } from '@/api/index'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    weixinId: null,
    token: '',
    tabValue: 0,
  }),
  actions: {
    setTabValue(active: number) {
      this.tabValue = active
    },
    async login(username: string, password: string) {
      try {
        const res = await userApi.login(username, password)
        this.user = res.data[0]
      }
      catch (e) {
        console.error(e)
      }
    },
    async logout() {
      try {
        await userApi.logout()
      }
      catch (e) {
        console.error(e)
      }
      this.user = null
      this.token = ''
      // localStorage.removeItem('token')
      // 清除其他可能的认证信息
    },
    async bindVehicle(vehicleId: string, licensePlate: string) {
      if (!this.user)
        return
      try {
        const res = await userApi.bindVehicle(vehicleId, licensePlate)
        console.log(res)
      }
      catch (e) {
        console.error(e)
      }
    },
  },
  getters: {
    isLoggedIn: state => !!state.user,
    getUserVehicles: state => state.user?.vehicles,
    getUserId: state => state.user?._id,
  },
})

export default useUserStore
