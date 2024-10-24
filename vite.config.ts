import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './build/index'

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  // eslint-disable-next-line node/prefer-global/process
  const viteEnv = loadEnv(mode, process.cwd())

  return {
    plugins: [createVitePlugins(isBuild)],
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8080,
      host: true,
      open: true,
      proxy: {
        '/api': {
          target: viteEnv.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
          secure: true,
          // configure: (proxy, options: any) => {
          //   // 配置此项可在响应头中看到请求的真实地址
          //   proxy.on('proxyRes', (proxyRes, req) => {
          //     proxyRes.headers['x-real-url'] = new URL(req.url || '', options.target)?.href || ''
          //   })
          // },
          bypass(req, res, options: any) {
            const proxyURL = options.target + options.rewrite(req.url)
            req.headers['x-req-proxyURL'] = proxyURL // 设置未生效
            res.setHeader('x-req-proxyURL', proxyURL) // 设置响应头可以看到
          },
        },
      },
    },
    esbuild: {
      // drop: mode === 'production' ? ['console', 'debugger'] : []
    },
    build: {
      minify: 'esbuild',
      sourcemap: false, // 是否生成sourcemap
    },
  }
})
