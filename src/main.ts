import { createApp } from 'vue'

import App from './App.vue'
// svg插件
import 'virtual:svg-icons-register'
// 引入自定义插件到全局
import gloalComponent from '@/components'
// 全局样式
import '@/styles/index.scss'
// 引入路由
import router from './router'
// 引入pinia
import pinia from './store'
// 引入路由鉴权
import './permission'
// message样式
import 'element-plus/theme-chalk/dark/css-vars.css'
//暗黑模式
import 'element-plus/theme-chalk/el-message.css'
// 引入自定义指令
import { isHasButton } from '@/directive/has'
const app = createApp(App)
isHasButton(app)
app.use(gloalComponent)
app.use(router)
app.use(pinia)
app.mount('#app')

// 这样写注册自定义指令不成功，自定义指令应该在创建 Vue 应用实例之后进行注册。
// createApp(App).use(gloalComponent).use(router).use(pinia).mount('#app')

