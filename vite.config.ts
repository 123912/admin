import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { ConfigEnv, UserConfigExport, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default (({ command, mode }: ConfigEnv): UserConfigExport => {
  // 获取各个环境下的变量
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),

      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: "./mock",
        localEnabled: command === 'serve',
      })
    ],
    base: './',	//不加打包后白屏
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 服务器地址
          target: env.VITE_SERVE,
          // 开启代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
})
