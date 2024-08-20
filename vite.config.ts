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
          secure: false,
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
