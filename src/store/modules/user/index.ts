import { defineStore } from 'pinia';
import type { UserState, providerType } from './types';
import {
  getTextCode,
  getUserProfile,
  loginByAuthCode,
  loginByPhone as userLoginByPhone,
  logout as userLogout,
} from '@/api/user/index';
import type { LoginByPhoneParams } from '@/api/user/types';
import { clearToken, setToken } from '@/utils/auth';

const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      info: {
        id: '0',
        name: '',
        avatar: '',
        weixinId: '',
      },
      token: '',
      tabValue: 0, // 默认选中的索引
    };
  },
  getters: {
    // userInfo: state => state.info,
  },
  actions: {
    // 设置用户的信息
    setUserInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    setTabValue(active: number) {
      this.tabValue = active;
    },
    async info() {
      console.log('开始获取信息');
      const result = await getUserProfile();
      this.setUserInfo(result);
    },
    // 异步登录并存储token
    loginByPhone(loginForm: LoginByPhoneParams) {
      return new Promise((resolve, reject) => {
        userLoginByPhone(loginForm).then((res) => {
          const token = res.token;
          if (token) {
            setToken(token);
          }
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    // 异步登录并存储token
    getCodeByPhone(phone: string) {
      return new Promise((resolve, reject) => {
        getTextCode({ phone }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    async logout() {
      await userLogout();
      this.$reset();
      clearToken();
    },
    // 小程序授权登录
    authLogin(provider: providerType = 'weixin') {
      return new Promise((resolve, reject) => {
        uni.login({
          provider,
          success: async (result: UniApp.LoginRes) => {
            if (result.code) {
              const res = await loginByAuthCode({ code: result.code });
              resolve(res);
            }
            else {
              reject(new Error(result.errMsg));
            }
          },
          fail: (err: any) => {
            console.error(`login error: ${err}`);
            reject(err);
          },
        });
      });
    },
  },
});

export default useUserStore;
