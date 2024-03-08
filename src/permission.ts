// 路由鉴权
//@ts-ignore
import nprogress from 'nprogress';
import router from "./router";
import setting from './setting';
// 引入进度条样式
import 'nprogress/nprogress.css';
nprogress.configure({ showSpinner: false })
// 获取拥护放入小仓库
import pinia from './store';
import useUserStore from './store/modules/user';
let userStore = useUserStore(pinia)

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = setting.title + '-' + to.meta.title
  // to:将要访问 from:从哪个路由来 next:路由放行函数
  // 访问路由前守卫
  nprogress.start()

  // 获取token判断用户是否登录
  let token = userStore.token
  // 获取用户名字
  let username = userStore.username
  if (token) {
    // 用户登录
    // 登录成功，访问login不能访问，指向首页
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      // 有用户信息
      if (username) {
        next()
      } else {
        // 没有用户信息，获取
        try {
          await userStore.userInfo()
          // 放行
          // 万一：刷新的时候是异步路由，有可能获取到用户信息，异步路由还没有加载完毕，出现空白的效果
          next({ ...to })

        } catch (error) {
          // token过期获取不到用户信息
          // 用户手动修改了token
          // 退出登录
          await userStore.logout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }

  } else {
    // 用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }

})


// 全局后置守卫
router.afterEach((to: any, from: any) => {
  // 访问路由后守卫

  nprogress.done()
})

// 未登录：可以访问login
// 登录：不可以访问login(指向首页)