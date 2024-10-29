<script setup lang="ts">
import { useRouter } from 'uni-mini-router'
import UserLoginCard from '@/components/login/user-login-card.vue'
import MerchantLoginCard from '@/components/login/merchant-login-card.vue'
import { useMerchantStore, useUserStore } from '@/store/index'

const router = useRouter()
const userStore = useUserStore()
const merchantStore = useMerchantStore()
const loginType = ref('user')

const isLoggedIn = computed(() => userStore.isLoggedIn || merchantStore.isLoggedIn)

function validateLogin() { // 登录成功则跳转
  if (isLoggedIn.value) {
    router.pushTab(`/pages/me/${loginType.value}/index`)
  }
}

function toggleLoginType(type: string) {
  loginType.value = type
}

onMounted(() => {
  validateLogin()
})

watch(isLoggedIn, () => {
  validateLogin()
})
</script>

<template>
  <Navbar title="登陆" />

  <view class="container">
    <view class="switch-bar">
      <view
        class="switch-item"
        :class="{ active: loginType === 'user' }"
        @click="toggleLoginType('user')"
      >
        用户登录
      </view>
      <view
        class="switch-item"
        :class="{ active: loginType === 'merchant' }"
        @click="toggleLoginType('merchant')"
      >
        商家登录
      </view>
    </view>

    <view v-if="loginType === 'user'">
      <UserLoginCard />
    </view>
    <view v-else-if="loginType === 'merchant'">
      <MerchantLoginCard />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}

.switch-bar {
  display: flex;
  justify-content: space-around;
  padding: 5px;
  margin-bottom: 10px;
  background-color: #f0f0f0;

  .switch-item {
    padding: 4px 8px;
    font-size: 16px;
    text-align: center;
    color: #666;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &.active {
      color: #fff;
      background-color: #007bff;
    }
  }
}
</style>
