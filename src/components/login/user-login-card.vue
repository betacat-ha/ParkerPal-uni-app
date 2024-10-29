<script setup lang="ts">
import { useUserStore } from '@/store/index'

/**
 * 这里没有传递事件，大部分情况能依赖监听`userStore`中的状态变化来完成操作就不要写得更复杂
 */

const userStore = useUserStore()

const { tel, code, password, username, isPasswordLogin, showWechatLoginPrompt } = {
  tel: ref(''),
  code: ref(''),
  password: ref(''),
  username: ref(''),
  isPasswordLogin: ref(true),
  showWechatLoginPrompt: ref(true),
}

onMounted(() => {
  promptWechatLogin()
})

async function wechatLogin() {
  try {
    await uni.login({
      provider: 'weixin',
      success: async (loginRes) => {
        if (loginRes.code) {
          const openid = await getUserOpenId(loginRes.code)
          await userStore.loginWithWeixin(openid)
        }
      },
    })
  }
  catch (error) {
    console.error('WeChat quick login exception:', error)
  }
}

async function getUserOpenId(code: string) {
  const res = await fetch(`https://api.weixin.qq.com/sns/jscode2session?appid=YOUR_APP_ID&secret=YOUR_APP_SECRET&js_code=${code}&grant_type=authorization_code`)
  const json = await res.json()
  if (json.errcode) {
    throw new Error(json.errmsg)
  }
  return json.openid
}

function promptWechatLogin() {
  showWechatLoginPrompt.value = true
  uni.showModal({
    title: '微信快捷登录',
    content: '是否使用微信快捷登录？',
    confirmText: '确认',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        wechatLogin()
      }
      else {
        showWechatLoginPrompt.value = false // 关闭微信登录提示
      }
    },
  })
}

async function loginWithPassword() {
  try {
    await userStore.login(username.value, password.value)
  }
  catch (err) {
    console.error('Login Failed:', err)
  }
}

function toggleLoginMethod(usePassword: boolean) {
  isPasswordLogin.value = usePassword
}

function loginWithTel() {
  // 这里可以实现手机号登录的逻辑
  console.log('手机号登录')
}
</script>

<template>
  <Card>
    <view v-if="isPasswordLogin" class="login-credentials">
      <input v-model="username" class="login-input" type="text" placeholder="请输入用户名">
      <input v-model="password" class="login-input" type="password" placeholder="请输入密码">
      <view class="login-options">
        <view @click="toggleLoginMethod(false)">
          手机号登录
        </view>
        <view>遇到问题</view>
      </view>
      <button class="login-button" @click="loginWithPassword">
        登录
      </button>
    </view>
    <view v-else class="login-credentials">
      <input v-model="tel" class="login-input" type="text" placeholder="请输入手机号">
      <input v-model="code" class="login-input" type="text" placeholder="请输入验证码">
      <view class="login-options">
        <view @click="toggleLoginMethod(true)">
          账号密码登录
        </view>
        <view>遇到问题</view>
      </view>
      <button class="login-button" @click="loginWithTel">
        登录
      </button>
    </view>

    <!-- <view v-if="showWechatLoginPrompt" class="wechat-login-prompt">
      <view class="wechat-login-message">
        是否使用微信快捷登录？
      </view>
      <view class="wechat-login-buttons">
        <button @click="wechatLogin">
          确认
        </button>
        <button @click="showWechatLoginPrompt = false">
          取消
        </button>
      </view>
    </view> -->
  </Card>
</template>

<style lang="scss" scoped>
.login-credentials {
  .login-input {
    padding: 20rpx 10rpx;
    margin-bottom: 20rpx;
    border-bottom: 2rpx solid #ccc;
    font-size: 30rpx;
  }

  .login-options {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;
    color: #666;
  }
}

.login-button {
  padding: 12rpx;
  width: 100%;
  font-size: 26rpx;
  color: #fff;
  background-color: #3572EF;
  border: none;
  border-radius: 8rpx;
}

.wechat-login-prompt {
  margin-top: 20rpx;
  text-align: center;

  .wechat-login-message {
    font-size: 30rpx;
    color: #333;
  }

  .wechat-login-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20rpx;

    button {
      padding: 10rpx 20rpx;
      margin: 0 10rpx;
      font-size: 24rpx;
      color: #3572EF;
      border: 1rpx solid #3572EF;
      border-radius: 4rpx;
    }
  }
}
</style>
