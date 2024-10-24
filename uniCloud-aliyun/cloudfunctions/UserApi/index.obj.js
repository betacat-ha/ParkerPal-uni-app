// unicloud错误规范 https://doc.dcloud.net.cn/uniCloud/cf-functions.html
// 微信小程序错误码 https://developers.weixin.qq.com/miniprogram/dev/framework/usability/PublicErrno.html
module.exports = {

  // 用户登录
  async login(username, password) {
    const res = await uniCloud.database().collection('tb_user')
      .where({ username }, { password })
      .get()

    if (res.data && res.data.length > 0) {
      return {
        errCode: 0,
        errMsg: '成功',
        data: res.data,
      }
    }

    return {
      errCode: '1007',
      errMsg: '数据不存在',
    }
  },

  // 获取停车场
  async getParkingLots() {
    const res = await uniCloud.database().collection('tb_parking_lot')
      .where({ status: 1 })
      .get()

    if (res.data && res.data.length > 0) {
      return {
        errCode: 0,
        errMsg: '成功',
        data: res.data,
      }
    }

    return {
      errCode: '1007',
      errMsg: '数据不存在',
    }
  },

  // 获取套餐
  async getParkingPackages() {
    const res = await uniCloud.database().collection('tb_parking_package')
      .get()

    if (res.data && res.data.length > 0) {
      return {
        errCode: 0,
        errMsg: '成功',
        data: res.data,
      }
    }

    return {
      errCode: '1007',
      errMsg: '数据不存在',
    }
  },

  // 获取停车场对应套餐
  async getParkingLotPackages(packages) {
    const db = uniCloud.database()
    const res = await db.collection('tb_parking_package')
      .where({ _id: db.command.in(packages) })
      .get()

    if (res.data && res.data.length > 0) {
      return {
        errCode: 0,
        errMsg: '成功',
        data: res.data,
      }
    }

    return {
      errCode: '1007',
      errMsg: '数据不存在',
    }
  },

  // 获取订单
  async getOrdersByUserId(userId) {
    const res = await uniCloud.database().collection('tb_order')
      .where({ userId })
      .get()

    if (res.data && res.data.length > 0) {
      return {
        errCode: 0,
        errMsg: '成功',
        data: res.data,
      }
    }

    return {
      errCode: '1007',
      errMsg: '数据不存在',
    }
  },

  // (支付成功后)创建订单
  async createOrder(order) {
    const res = await uniCloud.database().collection('tb_order')
      .add(order)

    if (res.id) {
      return {
        errCode: 0,
        errMsg: '成功',
        data: res.id,
      }
    }

    return {
      errCode: '1006',
      errMsg: '添加数据失败',
    }
  },

  // 绑定车辆信息
  async bindVehicle(userId, vehicleData) {
    const db = uniCloud.database()
    const res = await db.collection('tb_user')
      .doc(userId)
      .update({ vehicles: db.command.push(vehicleData) })

    if (res.updated === 1) {
      return {
        errCode: 0,
        errMsg: '成功',
      }
    }

    return {
      errCode: 1008,
      errMeg: '更新数据失败',
    }
  },

  // 修改车辆信息
  async updateVehicle(userId, vehicleId, newData) {
    const res = await uniCloud.database().collection('tb_user')
      .where({ '_id': userId, 'vehicles.vehicleId': vehicleId })
      .update({ 'vehicles.$.licensePlate': newData })

    if (res.updated === 1) {
      return {
        errCode: 0,
        errMsg: '成功',
      }
    }

    return {
      errCode: 1008,
      errMeg: '更新数据失败',
    }
  },

  // 解绑车辆信息
  async unbindVehicle(userId, vehicleId) {
    const db = uniCloud.database()
    const res = await db.collection('tb_user')
      .where({ '_id': userId, 'vehicles.vehicleId': vehicleId })
      .update({ vehicles: db.command.pop() }) // 删除数组最后一个元素

    if (res.updated === 1) {
      return {
        errCode: 0,
        errMsg: '成功',
      }
    }

    return {
      errCode: 1008,
      errMeg: '更新数据失败',
    }
  },
}
