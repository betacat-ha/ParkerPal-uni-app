// 本文件中的内容将在云对象【运行】时解析为运行参数

getParkingLotPackages(['670e91b47ae7081fd91b065f'])

unbindVehicle('67068949b9fb2347e8058433', 'v1003')

updateVehicle('67068949b9fb2347e8058433', 'v1003', '粤C19145')

bindVehicle('67068949b9fb2347e8058433', {
  vehicleId: 'v1003',
  licensePlate: '粤C19145',
})

createOrder({
  orderNo: 'ORD132456',
  actualPayment: 30,
  discount: 0,
  parkingDuration: '3个小时',
  payment: '支付宝支付',
  position: 'A234',
  parkingLotName: '广东技术师范大学综合馆停车场',
  parkingLotId: '67068b48c3b5c9b7d20c6a3f"',
  packageId: '67068e0c3f1a4763731f7c9f',
  userId: '67068949b9fb2347e8058433',
  status: 'completed',
  createTime: '2024-10-09T22:02:00Z',
})

getOrdersByUserId('67068949b9fb2347e8058433')

getParkingLots()

login('testuser', '123456')
