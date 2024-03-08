// 对外暴露路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',//
    meta: {
      title: '登录',//菜单标题
      hidden: true//路由是否在菜单中隐藏
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    redirect: '/home',
    meta: {
      title: '',//菜单标题
      hidden: false,
      icon: ''//菜单左侧图标
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',//菜单标题
          hidden: false,
          icon: 'HomeFilled',
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',//菜单标题
      hidden: true
    }
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',//菜单标题
      hidden: false,
      icon: 'Platform'
    }
  },


]

// 异步路由
export const asnycRoute = [
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    redirect: '/acl/user',
    meta: {
      title: '权限管理',//菜单标题
      hidden: false,
      icon: 'Lock'
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'Acl',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        }
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Grid'
        }
      },
    ]
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    redirect: '/product/trademark',
    meta: {
      title: '商品管理',//菜单标题
      hidden: false,
      icon: 'Goods'
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Product',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCartFull'
        }
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'ChromeFilled'
        }
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Calendar'
        }
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Suitcase'
        }
      },
    ]
  },
]

// 任意路由
export const anyRoute = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'any',
  meta: {
    title: '任意',//菜单标题
    hidden: true
  }
}
