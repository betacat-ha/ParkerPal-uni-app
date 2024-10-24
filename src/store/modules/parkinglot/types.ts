export interface TbParkingPackage {
  _id: string
  name: string
  description: string
  price: number
  status: number
}

export interface TbParkingLot {
  _id: string
  name: string
  address: string
  phone: string
  logo: string
  status: number // 0: 不可用, 1: 可用
  remainSpaces: number
  packages: string[]
}

export interface ParkingLotState {
  parkingLots: TbParkingLot[]
  parkingPackages: TbParkingPackage[]
}

export interface ParkingLotDetails extends Omit<TbParkingLot, 'packages'> {
  packages: TbParkingPackage[]
}
