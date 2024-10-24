import { post, upload } from '@/utils/request'

enum URL {
  upload = '/upload',
  sendCode = '/sendCode',
}

const httpApi = {
  async uploadFile(path: string) {
    return await upload({ url: URL.upload, filePath: path, name: 'file' })
  },

  async sendCode(tel: string) { // 发送验证码
    return await post({ url: URL.sendCode, data: { tel } })
  },
}

const cloudApi = {
  async uploadImage(path: string) {
    return path
  },

  async sendCode(tel: string) {
    return tel
  },
}

export function createCommonApi(requestMethod: 'http' | 'cloud') {
  if (requestMethod === 'http') {
    return httpApi
  }
  else if (requestMethod === 'cloud') {
    return cloudApi
  }
  else {
    throw new Error('Invalid requestMethod. Use "http" or "cloud".')
  }
}
