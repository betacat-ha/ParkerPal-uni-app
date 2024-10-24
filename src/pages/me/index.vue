<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useUserStore } from '@/store/index'

const userStore = useUserStore()
const loading = ref(true)

onMounted(() => {
  loading.value = false
})

watchEffect(() => {
  if (userStore.isLoggedIn) {
    navigateToUserCenter()
  }
})

function navigateToUserCenter() {
  uni.navigateTo({
    url: '/pages/me/user/index',
  })
}

function navigateToUserLogin() {
  uni.navigateTo({
    url: '/pages/me/user/login/index',
  })
}

const imges = reactive([
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
])
</script>

<template>
  <view class="container">
    <view class="swiper-container">
      <u-swiper :list="imges" key-name="image" :autoplay="true" circular show-title />
    </view>

    <div v-if="loading" class="loading">
      <u-icon name="loading" size="60" color="#primaryColor" />
      <text class="message">
        正在加载...
      </text>
    </div>

    <div v-else-if="!userStore.isLoggedIn" class="not-logged-in">
      <text class="message">
        请登录
      </text>
      <button class="action-button primary" @click="navigateToUserLogin">
        用户登录
      </button>
      <button class="action-button secondary">
        商家登录
      </button>
    </div>
  </view>
  <Tabbar />
</template>

<style lang="scss" scoped>
$primaryColor: #3572EF;
$secondaryColor: #FF6B6B;
$textColor: #333;
$buttonWidth: 240rpx;
$buttonHeight: 80rpx;
$buttonRadius: 10rpx;
$buttonFontSize: 28rpx;
$buttonShadow: 0 2rpx 4rpx rgb(0 0 0 / 10%);

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 20rpx;
  height: 100vh;
  background-color: #f8f8f8;
}

.swiper-container {
  overflow: hidden;
  margin-bottom: 20rpx;
  width: 100%;
  max-width: 750rpx; /* 可以根据需要调整 */
  height: 400rpx; /* 图片的高度 */
}

.loading,
.not-logged-in {
  text-align: center;
}

.message {
  margin: 20rpx 0;
  font-size: 30rpx;
  color: $textColor;
}

.action-button {
  margin: 20rpx 0;
  width: $buttonWidth;
  height: $buttonHeight;
  font-size: $buttonFontSize;
  line-height: $buttonHeight;
  color: #fff;
  border-radius: $buttonRadius;
  box-shadow: $buttonShadow;

  &:active {
    opacity: 0.8;
  }
}

.primary {
  background-color: $primaryColor;
}

.secondary {
  background-color: $secondaryColor;
}
</style>
