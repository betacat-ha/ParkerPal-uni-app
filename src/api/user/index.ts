import { get, post } from '@/utils/request'
import type { TbOrder } from '@/store/modules/order/types'
import type { TbVehicle } from '@/store/modules/user/types'

const userAPI = uniCloud.importObject('UserApi')

enum URL {
  login = '/user/login',
  logout = '/user/logout',
  parkinglots = '/parkinglots',
  parkingLotPackages = '/parkinglot/packages',
  parkingPackages = '/parking-packages',
  ordersByUserId = 'orders/user-id',
  createOrder = 'order/create',
  bindVehicle = '/vehicle/bind',
  unbindVehicle = '/vehicle/unbind',
  updateVehicle = '/vehicle/update',
}

const httpApi = {
  async login(username: string, password: string) {
    return await post({ url: URL.login, data: { username, password } })
  },

  async logout() {
    return await get({ url: URL.logout })
  },

  async getParkingLots() {
    return await get({ url: URL.parkinglots })
  },

  async getParkingPackages() {
    return await post({ url: URL.parkingPackages })
  },

  async getParkingLotPackages(packages: string[]) {
    return await post({ url: URL.parkingLotPackages, data: packages })
  },

  async getOrdersByUserId(userId: string) {
    return await post({ url: URL.ordersByUserId, data: { userId } })
  },

  async createOrder(order: TbOrder) {
    return await post({ url: URL.createOrder, data: order })
  },

  async bindVehicle(userId: string, vehicleData: TbVehicle) {
    return await post({ url: URL.bindVehicle, data: { userId, vehicleData } })
  },

  async updateVehicle(userId: string, vehicleId: string, newData: string) {
    return await post({ url: URL.updateVehicle, data: { userId, vehicleId, newData } })
  },

  async unbindVehicle(userId: string, vehicleId: string) {
    return await post({ url: URL.unbindVehicle, data: { userId, vehicleId } })
  },
}

const cloudApi = {
  async login(username: string, password: string) {
    return await userAPI.login(username, password)
  },

  async logout() {
    return null
  },

  async getParkingLots() {
    return await userAPI.getParkingLots()
  },

  async getParkingPackages() {
    return await userAPI.getParkingPackages()
  },

  async getParkingLotPackages(packages: string[]) {
    return await userAPI.getParkingLotPackages(packages)
  },

  async getOrdersByUserId(userId: string) {
    return await userAPI.getOrdersByUserId(userId)
  },

  async createOrder(order: TbOrder) {
    return await userAPI.createOrder(order)
  },

  async bindVehicle(userId: string, vehicleData: TbVehicle) {
    return await userAPI.bindVehicle(userId, vehicleData)
  },

  async updateVehicle(userId: string, vehicleId: string, newData: string) {
    return await userAPI.updateVehicle(userId, vehicleId, newData)
  },

  async unbindVehicle(userId: string, vehicleId: string) {
    return await userAPI.unbindVehicle(userId, vehicleId)
  },
}

export function createUserApi(requestMethod: 'http' | 'cloud') {
  if (requestMethod === 'http') {
    return httpApi
  }
  else if (requestMethod === 'cloud') {
    return cloudApi
  }
  else {
    throw new Error('Invalid requestMethod. Use "http" or "cloud".')
  }
}
