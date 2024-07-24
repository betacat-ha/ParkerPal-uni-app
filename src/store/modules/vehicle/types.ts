// store/modules/vehicle/types.ts

export interface VehicleData {
  id?: string
  licensePlate: string
  powerType: 'oil' | 'electric' | 'hybrid'
  vehicleType: 'non-pickup' | 'pickup'
  etcInfo: 'yes' | 'no'
  model: string
}

// 定义获取车辆信息的响应类型
export interface GetVehicleInfoResponse {
  data: VehicleData
  success: boolean
  message?: string
}

// 定义提交车辆数据的响应类型
export interface SubmitVehicleDataResponse {
  data: VehicleData
  success: boolean
  message?: string
}

// 定义获取车辆信息的 API 调用类型
export type GetVehicleInfo = (id: string) => Promise<VehicleData>;

// 定义提交车辆数据的 API 调用类型
export type SubmitVehicleData = (data: VehicleData) => Promise<VehicleData>;
