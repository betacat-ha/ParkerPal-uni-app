<template>
  <view class="page-wrap">
    <!-- <u-navbar title="" placeholder left-icon="" right-icon="camera-fill" /> -->
    <Card :shadow="false">
      <view class="flex items-center">
        <view class="mr-10rpx">
          <u-avatar src="/static/images/logo.png" size="70" />
        </view>
        <view class="ml-10rpx flex-1" @click="userInfo.name === '' ? doLogin() : doLogout();">
          <view class="pb-20rpx font-size-36rpx">
            {{ userInfo.name === '' ? '未登录' : userInfo.name }}
          </view>
          <view class="u-tips-color font-size-28rpx">
            {{ userInfo.name === '' ? '点这里可以登录' : `微信号：${userInfo.weixinId}` }}
          </view>
        </view>
        <view class="ml-10rpx p-10rpx">
          <u-icon name="scan" color="#969799" />
        </view>
        <view class="ml-10rpx p-10rpx">
          <u-icon name="arrow-right" color="#969799" />
        </view>
      </view>
    </Card>

    <order-card />
    <carCardVue />
    <view class="bg-white">
      <u-cell-group>
        <u-cell icon="star" title="收藏" is-link />
        <u-cell icon="heart" title="语音包" is-link />
        <u-cell icon="photo" title="历史导航记录" is-link />
      </u-cell-group>
    </view>
    <view class="bg-white">
      <u-cell-group>
        <u-cell icon="setting" title="设置" is-link />
      </u-cell-group>
    </view>

    <view class="bg-white">
      <u-swiper :list="list2" key-name="image" :autoplay="true" circular show-title />
    </view>

    <Tabbar />

    <u-action-sheet :actions="sheet.list" :title="sheet.title" :show="sheet.show" :safe-area="true" cancel-text="取消" @select="sheetOnSelect" @close="sheet.show = false" />
  </view>
</template>

<script setup lang="ts">
import orderCard from './order-card.vue';
import carCardVue from './car-card.vue';
import { useUserStore } from '@/store/index';

interface sheetListModel {
  name: string
  callback: () => void
}

const list2 = reactive([
  {
    image: 'https://s2.loli.net/2024/07/11/LaotOqrlU9ISvTw.jpg',
    title: '昨夜星辰昨夜风，画楼西畔桂堂东',
  },
  {
    image: 'https://s2.loli.net/2024/07/26/YEHWeTjDQZ7ploI.jpg',
    title: '身无彩凤双飞翼，心有灵犀一点通',
  },
  {
    image: 'https://s2.loli.net/2024/07/26/28CWvoisqSc7AYK.jpg',
    title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
  },
  {
    image: 'https://s2.loli.net/2024/07/26/maQ163oScPik4uI.jpg',
    title: '昨夜星辰昨夜风，画楼西畔桂堂东',
  },
  {
    image: 'https://s2.loli.net/2024/07/26/8R9uLCVAjBJ3D6i.jpg',
    title: '身无彩凤双飞翼，心有灵犀一点通',
  },
]);

const userStore = useUserStore();
const userInfo = storeToRefs(userStore).info;

const sheet = ref({
  show: false,
  title: '',
  list: [] as sheetListModel[],
});

const sheetOnSelect = (index: sheetListModel) => {
  index.callback();
};

function doLogin() {
  uni.navigateTo({
    url: '/pages/me/login/index',
  });
}

function doLogout() {
  console.log('doLogout');
  sheet.value.title = '';
  sheet.value.list = [{
    name: '退出登录',
    callback: () => {
      sheet.value.show = false;
      userStore.logout();
    },
  }];
  sheet.value.show = true;
}

function fetchUserInfo() {
  userStore.fetchInfo();
}

onMounted(() => {
  fetchUserInfo();
});
</script>

<style lang="scss">
.page-wrap {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
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
