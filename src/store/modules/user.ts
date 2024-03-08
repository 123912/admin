// 创建用户的小仓库
import { defineStore } from 'pinia';
// 登录接口api
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user';
// 引入数据类型
import type { loginFormData, loginResponseData, userInfoResponseData } from "@/api/user/type";
import type { UserState } from './types/types';
// 引入操作存储本地数据工具方法
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token';
// 引入路由(常量路由)
import router from '@/router';
// 引入深拷贝的方法
//@ts-ignore
import { anyRoute, asnycRoute, constantRoute } from '@/router/routers';
import { cloneDeep } from 'lodash';

//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //硅谷333账号:product\trademark\attr\sku
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}


let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),//用户token
      menuRoutes: constantRoute,//仓库存储生成菜单的路由数组
      username: '',
      avatar: '',
      //存储当前用户是否包含某一个按钮
      buttons: [],
    }
  },
  // 异步处理
  actions: {
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      console.log("user login", data)
      if (result.code == 200) {
        console.log(result);

        // pinia保存token
        // pinia|vuex存储数据其实是利用js对象
        this.token = (result.data as string)
        // 本地存储持久化
        // localStorage.setItem("TOKEN", (result.data.token as string))
        SET_TOKEN((result.data as string));

        // 能保证当前async函数返回一个成功的
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息方法
    async userInfo() {
      // 获取用户信息并存储
      let result: userInfoResponseData = await reqUserInfo()
      console.log('userInfo', result);
      if (result.code == 200) {

        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(cloneDeep(asnycRoute), result.data.routes)
        //菜单需要的数据整理完毕
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
          //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
          ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
            router.addRoute(route)
          })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }

    },

    // 退出登录
    async logout() {
      let result: any = await reqLogout()
      console.log(result);
      if (result.code == 200) {
        // 目前没有mock接口，退出登录接口
        this.token = '',
          this.username = '',
          this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }




    }
  },
  getters: {

  }
})
// 对外暴露
export default useUserStore;