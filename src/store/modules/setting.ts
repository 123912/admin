// 小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,//控制菜单折叠展开
      refsh: false,//控制刷新
    }
  }
})
export default useLayOutSettingStore
