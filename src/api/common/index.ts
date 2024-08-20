/**
 * 通用接口
 */
import type { SendCodeParams, SendCodeResult, UploadImageResult } from './types'
import { post, upload } from '@/utils/request'

enum URL {
  upload = '/common/upload',
  sendCode = '/sendCode',
}

// 图片上传
export function uploadImage(imagePath: string) {
  return upload<UploadImageResult>({ url: URL.upload, filePath: imagePath, name: 'file' })
}

// 发送验证码
export const sendCode = (data: SendCodeParams) => post<SendCodeResult>({ url: URL.sendCode, data })
