<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/index'

const userStore = useUserStore()

const { tel, code, password, username, isPasswordLogin, showWechatLoginPrompt } = {
  tel: ref(''),
  code: ref(''),
  password: ref(''),
  username: ref(''),
  isPasswordLogin: ref(true),
  showWechatLoginPrompt: ref(true),
}

// 侦听登录状态
watchEffect(() => {
  if (userStore.isLoggedIn) {
    navigateToUserCenter()
  }
})

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

function navigateToUserCenter() {
  uni.navigateTo({
    url: '/pages/me/user/index',
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

function loginWithTel() {

}
</script>

<template>
  <view class="login-container">
    <view class="login-title">
      欢迎登录
    </view>

    <view v-if="isPasswordLogin" class="login-credentials">
      <input v-model="username" class="login-input" type="text" placeholder="请输入用户名">
      <input v-model="password" class="login-input" type="password" placeholder="请输入密码">
      <view class="login-options">
        <view @click="isPasswordLogin = false">
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
        <view @click="isPasswordLogin = true">
          账号密码登录
        </view>
        <view>遇到问题</view>
      </view>
      <button class="login-button" @click="loginWithTel">
        登录
      </button>
    </view>
  </view>

  <view class="login-hint">
    登录代表同意
    <text class="login-link">
      用户协议、隐私政策，
    </text>
    并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
  </view>
</template>

<style lang="scss" scoped>
.login-container {
  margin: 80rpx auto;
  width: 600rpx;

  .login-title {
    margin-bottom: 100rpx;
    font-size: 60rpx;
    font-weight: 500;
    text-align: center;
  }

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
    padding: 18rpx;
    width: 100%;
    font-size: 26rpx;
    color: #fff;
    background-color: #3572EF;
    border: none;
    border-radius: 8rpx;
  }

  .login-hint {
    margin-top: 20rpx;
    text-align: center;
    color: #666;
  }

  .login-link {
    color: #3572EF;
  }
}
</style>
