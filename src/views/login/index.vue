<template>
  <div class="container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24" class="loginBox">
        <el-form label-width="40px" :model="loginFrom"  :rules="rules"  ref ='loginForms' style="max-width: 460px" class="loginFrom">
          <h1>Hello</h1>
          <h2>欢迎来到商品管理系统</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User"  v-model="loginFrom.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password  :prefix-icon="Lock" v-model="loginFrom.password" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="loginBtn" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
// 引入数据类型
// import type {loginForm} from '@/api/user/type'
// 引入用户的小仓库
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()

// 获取表单组件
let loginForms = ref()

// 引入获取当前时间方法
import { getTime } from '@/utils/time';

// 获取路由
import { useRoute, useRouter } from 'vue-router';
// 获取路由器
let $router = useRouter()
// 获取路由对象
let $route = useRoute()

// 按钮加载
let loading = ref(false)

import { ElNotification } from 'element-plus';
import 'element-plus/es/components/notification/style/css';



const loginFrom = reactive({
  username: 'admin',
  password: '111111',
})
// 登录回调
const login =async () => {
  // 保证表单校验通过
  await loginForms.value.validate()
  // console.log('123',await loginForms.value.validate());
  

  loading.value = true
  try {
    await userStore.userLogin(loginFrom)
    // 编程式导航跳转首页
    // 判断登录的时候，路由路径是否有query参数
    let redirect:any = $route.query.redirect
    $router.push({path:redirect||'/'})
    // 登录成功提示信息
    ElNotification({
      type: 'success',
      message:'欢迎回来',
      title: `Hi,${getTime()}好`
    })
    loading.value =false
  } catch (error) {
    loading.value =false
    // 登录失败提示
    ElNotification({
      type: 'error',
      message:(error as Error).message
    })
  }

  
}

// 自定义校验规则
const validatorUserName= (_rule: any, value: any, callback: any) => {
  if (value.length >=5) {
    callback()
  } else {
    callback(new  Error('账号长度至少五位'))
  }

}
const validatorPassWord= (_rule: any, value: any, callback: any) => {
  if (value.length >=6) {
    callback()
  } else {
    callback(new  Error('密码长度至少六位'))
  }

}
// 表单校验
const rules  = {
  username:[
  // { required: true, min: 5, max: 10,  message: '账号长度至少五位', trigger: 'change' },
  { trigger: 'change',validator:validatorUserName}
  ],
  password :[
  // { required: true, min: 6, max: 15,  message: '密码长度至少六位', trigger: 'change' }
  { trigger: 'change',validator:validatorPassWord}
  ]
}

</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .loginBox {
    display: flex;
    justify-content: center;
    align-items: center;

    .loginFrom {
      width: 80%;
      background: url('@/assets/images/login_form.png');
      padding: 30px;
      h1 {
        color: white;
        font-size: 40px;
      }
      h2{
        color: white;
        font-size: 20px;
        margin: 20px 0;

      }
      .loginBtn{
         width: 100%;
      }
    }
  }

  .el-col{
    height: 100vh;
  }
 
}
</style>
