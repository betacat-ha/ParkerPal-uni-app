/**
 * @name ReplaceImageUrl
 * @description 替换图片地址
 */
import replaceImageUrl from 'vite-plugin-replace-image-url'

export function ReplaceUrlPlugin() {
  return replaceImageUrl({
    publicPath: 'https://photo.example.com/miniprogram',
    sourceDir: 'src/static',
    verbose: true,
  })
}
