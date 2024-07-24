// api/vehicle/types.ts

export interface VehicleData {
  licensePlate: string
  powerType: 'oil' | 'electric' | 'hybrid'
  vehicleType: 'non-pickup' | 'pickup'
  etcInfo: 'yes' | 'no'
  model: string
}
