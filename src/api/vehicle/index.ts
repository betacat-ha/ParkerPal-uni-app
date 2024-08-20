/**
 * 车辆信息相关接口
 */
import type { VehicleData } from './types'
import { get, post } from '@/utils/request'

enum VehicleURL {
  getVehicle = '/vehicle/get', // 获取车辆信息
  submitVehicleData = '/vehicle/submit', // 提交车辆数据
}

// 获取车辆信息
export const getVehicleInfo = (): Promise<VehicleData> => get<VehicleData>({ url: VehicleURL.getVehicle })

// 提交车辆数据
export const submitVehicleData = (data: VehicleData): Promise<VehicleData> => post<VehicleData>({ url: VehicleURL.submitVehicleData, data })
