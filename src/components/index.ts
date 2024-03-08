import Category from './Category/index.vue';
import SvgIcon from './SvgIcon/index.vue';
// 对外暴露插件对象
import type { App, Component } from 'vue';
//需要从 @element-plus/icons-vue 中导入所有图标并进行全局注册。
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const components: { [name: string]: Component } = { SvgIcon, Category };
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}