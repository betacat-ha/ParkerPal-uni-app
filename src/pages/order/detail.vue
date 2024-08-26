<template>
  <view class="order-detail">
      <view class="page-wrap">
        <Card class="order-info-card">
          <view class="detail">
            <text>订单详情</text>
            <text>
              订单号：{{ OrderData?.orderNo }}
            </text>
            <text>
              实付金额：{{ OrderData?.amount }}
            </text>
            <text>
              订单金额：{{ OrderData?.actualPayment }}
            </text>
            <text>
              优惠金额：{{ OrderData?.discount }}
            </text>
            <!-- <text class="name">
              {{ OrderData?.createTime}}
              {{ OrderData?.merchantName}}
              {{ OrderData?.licensePlate}}
              {{ OrderData?.amount}}
              {{ OrderData?.discount}}
              {{ OrderData?.orderNo}}
              {{ OrderData?.orderstatus}}
              {{ OrderData?.payment}}
              {{ OrderData?.parkingDuration}}
              {{ OrderData?.actualPayment}}
            </text> -->
          </view>
          </Card>
          <Card class="order-info-card">
          <view class="detail">
            <text>订单信息</text>
            <text>
              车牌号码：{{ OrderData?.licensePlate }}
            </text>
            <text>
              交易时间：{{ OrderData?.createTime }}
            </text>
            <text>
              停车时长：{{ OrderData?.parkingDuration }}
            </text>
            <text>
              支付方式：{{ OrderData?.payment }}
            </text>
            <text>
              订单状态：{{ OrderData?.orderstatus }}
            </text>
          </view>
      </Card>
      </view>
    </view>
</template>

<script setup lang="ts">
import type { OrderInfo } from '@/store/modules/order/types'
import { getOrderById } from '@/api/order'

// 从路由获取订单ID
const id = ref('');

// 订单详情数据
const OrderData = ref<OrderInfo>()

// 页面状态控制
const showLoading = ref(true);
const showDetail = ref(false);
const showEmpty = ref(false);

enum PageType {
  Detail,
  Empty,
  Loading,
}

function switchPage(type) {
  showLoading.value = false;
  showDetail.value = false;
  showEmpty.value = false;

  switch (type) {
    case PageType.Detail:
      showDetail.value = true;
      break;
    case PageType.Empty:
      showEmpty.value = true;
      break;
    case PageType.Loading:
      showLoading.value = true;
      break;
  }
}


onLoad((option) => {
  id.value = option?.id
  if (!id.value) {
    switchPage(PageType.Empty)
    console.warn('请传入订单ID')
    return
  }
  console.log(`开始加载订单ID：${id.value}`)
  getOrderById(id.value, true).then((res) => {
      OrderData.value = res
  console.log(res)
   
    switchPage(PageType.Detail)
  }).catch(() => {
    switchPage(PageType.Empty)
  })
})

</script>

<style lang="scss" scoped>
.page-wrap {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
}

.order-info-card {
  .detail {
    display: flex;
    flex-direction: column;
    gap: 15rpx;

    // .name {
    //   font-size: 32rpx;
    //   font-weight: bold;
    // }
  }
}


</style>