import { defineStore } from 'pinia'
import type { AppState } from './types'

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    systemInfo: {} as UniApp.GetSystemInfoResult,
  }),
  getters: {
    // 获取系统信息
    getSystemInfo(): UniApp.GetSystemInfoResult {
      return this.systemInfo
    },
  },
  actions: {
    // 设置系统信息
    setSystemInfo(info: UniApp.GetSystemInfoResult) {
      this.systemInfo = info
    },

    // 初始化系统信息
    initSystemInfo() {
      uni.getSystemInfo({
        success: (res: UniApp.GetSystemInfoResult) => {
          this.setSystemInfo(res)
        },
        fail: (err: any) => {
          console.error('获取系统信息失败:', err)
        },
      })
    },

    // 检查更新
    checkUpdate() {
      const updateManager = uni.getUpdateManager()
      updateManager.onCheckForUpdate((res: UniApp.OnCheckForUpdateResult) => {
        console.log('检查更新结果:', res.hasUpdate)
      })

      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用?',
          success: (res) => {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          },
        })
      })

      updateManager.onUpdateFailed((res: any) => {
        console.error('更新失败:', res)
        uni.showToast({
          title: '更新失败',
          icon: 'error',
        })
      })
    },
  },
})

export default useAppStore
