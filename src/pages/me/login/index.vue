<template>
  <view>
    <view class="login-form-wrap">
      <view class="title">
        欢迎登录
      </view>
      <input v-model="tel" class="u-border-bottom" type="number" placeholder="请输入手机号">
      <view class="u-border-bottom my-40rpx flex">
        <input v-model="code" class="flex-1" type="number" placeholder="请输入验证码">
        <view>
          <u-code ref="uCodeRef" keep-running @change="codeChange" />
          <u-button type="primary" :text="tips" size="mini" @click="getCode" />
        </view>
      </view>
      <button class="login-btn" :style="[inputStyle]" @tap="submit">
        登录 <text class="i-mdi-login" />
      </button>

      <view class="alternative">
        <view class="password">
          密码登录
        </view>
        <view class="issue flex items-center">
          遇到问题 <text class="i-mdi-help" />
        </view>
      </view>
    </view>
    <view class="login-type-wrap">
      <view class="item wechat" @click="userStore.authLogin">
        <view class="icon">
          <u-icon size="35" name="weixin-fill" color="rgb(83,194,64)" />
        </view>
        微信
      </view>
      <view class="item QQ">
        <view class="icon">
          <u-icon size="35" name="qq-fill" color="rgb(17,183,233)" />
        </view>
        QQ
      </view>
    </view>
    <view class="hint">
      登录代表同意
      <text class="link">
        用户协议、隐私政策，
      </text>
      并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
    </view>
  </view>
</template>

<script setup lang="ts">
import uCode from 'uview-plus/components/u-code/u-code.vue';
import type { CSSProperties } from 'vue';
import { useUserStore } from '@/store/index';

const userStore = useUserStore();

const tel = ref<string>('15012345678');
const code = ref<string>('4321');
const tips = ref<string>();
const uCodeRef = ref<InstanceType<typeof uCode> | null>(null);

const inputStyle = computed<CSSProperties>(() => {
  const style = {} as CSSProperties;
  if (tel.value && code.value) {
    style.color = '#fff';
    style.backgroundColor = '#3572EF';
  }
  return style;
});

// 返回首页
onNavigationBarButtonTap(() => {
  uni.reLaunch({ url: '/' });
});

function codeChange(text: string) {
  tips.value = text;
}

function getCode() {
  if (uCodeRef.value?.canGetCode) {
    uni.showLoading({
      title: '正在获取验证码',
    });

    userStore.getCodeByPhone(tel.value).then(() => {
      uni.hideLoading();
      uni.$u.toast('验证码已发送');
      uCodeRef.value?.start();
    }).catch(() => {
      uni.hideLoading();
      console.error('获取验证码失败');
    });
  }
  else {
    uni.$u.toast('倒计时结束后再发送');
  }
}
function submit() {
  if (uni.$u.test.mobile(tel.value)) {
    userStore.loginByPhone({
      phone: tel.value,
      code: code.value,
    }).then(async () => {
      // 获取用户信息
      await userStore.fetchInfo();
      uni.$u.toast('登录成功');
      uni.switchTab({ url: '/pages/me/index' });
    }).catch(() => {
    });
  }
}
</script>

<style lang="scss" scoped>
.login-form-wrap {
  @apply mt-80rpx mx-auto mb-0 w-600rpx;

  .title {
    @apply mb-100rpx text-60rpx text-left font-500;
  }

  input {
    @apply pb-6rpx mb-10rpx text-left;
  }

  .tips {
    @apply mt-8rpx mb-60rpx;

    color: $u-info;
  }

  .login-btn {
    @apply flex items-center justify-center py-12rpx px-0 text-30rpx bg-#9fbfff border-none;

    color: $u-tips-color;

    &::after {
      @apply border-none;
    }
  }

  .alternative {
    @apply flex justify-between mt-30rpx;

    color: $u-tips-color;
  }
}

.login-type-wrap {
  @apply flex justify-between pt-350rpx px-150rpx pb-150rpx;

  .item {
    @apply flex items-center flex-col text-28rpx;

    color: $u-content-color;
  }
}

.hint {
  @apply px-40rpx py-20rpx text-20rpx;

  color: $u-tips-color;

  .link {
    color: $u-warning;
  }
}
</style>
