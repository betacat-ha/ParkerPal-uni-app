<template>
  <view class="page-wrap">
    <u-navbar title="" placeholder left-icon="" right-icon="camera-fill" />
    <view class="flex items-center bg-white pb-30rpx pl-30rpx pr-20rpx">
      <view class="mr-10rpx">
        <u-avatar src="/static/images/logo.png" size="70" />
      </view>
      <view class="flex-1">
        <view class="pb-20rpx font-size-36rpx">
          智泊无忧
        </view>
        <view class="u-tips-color font-size-28rpx" @click="toCopy">
          微信号:Parkerpal
        </view>
      </view>
      <view class="ml-10rpx p-10rpx">
        <u-icon name="scan" color="#969799" />
      </view>
      <view class="ml-10rpx p-10rpx">
        <u-icon name="arrow-right" color="#969799" />
      </view>
    </view>

    <!-- <view class="mt-20rpx bg-white">
      <u-cell-group>
        <u-cell icon="rmb-circle" title="支付" is-link />
      </u-cell-group>
    </view>

    <view class="mt-20rpx bg-white">
      <u-cell-group>
        <u-cell icon="star" title="收藏" is-link />
        <u-cell icon="photo" title="相册" is-link />
        <u-cell icon="coupon" title="卡券" is-link />
        <u-cell icon="heart" title="关注" is-link />
      </u-cell-group>
    </view>

    <view class="mt-20rpx bg-white">
      <u-cell-group>
        <u-cell icon="setting" title="设置" is-link />
      </u-cell-group>
    </view>
  </view> -->
    <!-- <view>
      <u-grid
        :border="false"
        col="4"
      >
        <u-grid-item
          v-for="(listItem, listIndex) in list"
          :key="listIndex"
          bg-color="#F8F8FF"
        >
          <u-icon
            :custom-style="{ paddingTop: `${20}rpx` }"
            :name="listItem.name"
            :size="22"
          />
          <text class="grid-text">
            {{ listItem.title }}
          </text>
        </u-grid-item>
      </u-grid>
      <u-toast ref="uToastRef" />
    </view>

    <function-card /> -->
    <view class="center-container">
      <function-card />
    </view>

    <view class="mt-20rpx bg-white">
      <u-cell-group>
        <u-cell icon="star" title="收藏" is-link />
        <u-cell icon="heart" title="语音包" is-link />
        <u-cell icon="car" title="我的车辆" is-link />
        <u-cell icon="photo" title="历史导航记录" is-link />
      </u-cell-group>
    </view>
    <view class="mt-20rpx bg-white">
      <u-cell-group>
        <u-cell icon="setting" title="设置" is-link />
      </u-cell-group>
    </view>
    <view class="mt-20rpx bg-white">
      <u-swiper
        :list="list2"
        key-name="image"

        :autoplay="true"
        circular show-title
      />
    </view>
    <Tabbar />
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import functionCard from './function-card.vue';
import { useClipboard } from '@/hooks';

// 创建响应式数据
// const list = reactive([
//   {
//     name: 'photo',
//     title: '图片',
//   },
//   {
//     name: 'lock',
//     title: '锁头',
//   },
//   {
//     name: 'star',
//     title: '星星',
//   },
//   {
//     name: 'volume', // 注意：这里修改了 name 从 'star' 改为 'volume'，以避免列表中两个元素具有相同的 name
//     title: '音量',
//   },
// ]);

const list2 = reactive([
  {
    image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
    title: '昨夜星辰昨夜风，画楼西畔桂堂东',
  },
  {
    image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    title: '身无彩凤双飞翼，心有灵犀一点通',
  },
  {
    image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
    title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
  },
]);
// // 创建对子组件的引用
// const uToastRef = ref(null);

// // 定义方法
// const click = (name) => {
//   if (uToastRef.value) {
//     uToastRef.value.success(`点击了第${name + 1}个`); // 注意：这里加1是因为通常我们是从第1个开始计数的
//   }
// };
// const { setClipboardData, getClipboardData } = useClipboard();

// // 复制
// const toCopy = async () => {
//   await setClipboardData({ data: '1234567890' });
//   const data = await getClipboardData();
//   console.log('[ data ] >', data);
// };
</script>

<style lang="scss">
    .grid-text {
        font-size: 14px;
        color: #909399;
        padding: 10rpx 0 20rpx 0rpx;
        /* #ifndef APP-PLUS */
        box-sizing: border-box;
        /* #endif */
    }
    .page-wrap {
    padding: 20rpx;
  }

  .center-container {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    margin: 20rpx 0;
    padding: 20rpx;
  }

  .function-card {
    width: 90%; /* 或者使用固定宽度，如 300px */
  }

  .mt-20rpx {
    margin-top: 20rpx;
  }

  .bg-white {
    background-color: white;
  }

  .font-size-36rpx {
    font-size: 36rpx;
  }

  .font-size-28rpx {
    font-size: 28rpx;
  }

  .u-tips-color {
    color: #909399;
  }
</style>
