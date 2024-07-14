import { defineStore } from 'pinia';
import type { UserState, providerType } from './types';
import {
  getUserProfile,
  loginByCode,
  login as userLogin,
  logout as userLogout,
} from '@/api/user/index';
import type { LoginParams } from '@/api/user/types';
import { clearToken, setToken } from '@/utils/auth';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    info: {
      id: '',
      name: '',
      avatar: '',
    },
    token: '',
    tabValue: 0, // 默认选中的索引
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    // 设置用户的信息
    setUserInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    setTabValue(active) {
      this.activeTab = active;
    },
    async info() {
      const result = await getUserProfile();
      this.setUserInfo(result);
    },
    // 异步登录并存储token
    login(loginForm: LoginParams) {
      return new Promise((resolve, reject) => {
        userLogin(loginForm).then((res) => {
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
              const res = await loginByCode({ code: result.code });
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
