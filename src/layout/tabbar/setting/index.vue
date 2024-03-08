<template>
  <el-button size="small" icon="Refresh" @click="updateRefsh" circle />
  <el-button size="small" icon="FullScreen" @click="fullScreen" circle />

  <el-popover placement="bottom" title="主题设置" :width="300" trigger="click">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="setColor"  />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch v-model="dark"  @change='changeDark' size="small" active-icon="Moonnight" inactive-icon="Sunny" class="mt-2"
          style="margin-left: 24px" inline-prompt />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle />
    </template>
  </el-popover>
  <img :src="userStore.avatar" style="width: 24px;height: 24px;margin: 0 10px;border-radius: 50%;">
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>

      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// 获取骨架的小仓库
import useLayOutSettingStore from '@/store/modules/setting';
// 获取用户的小仓库
import useUserStore from '@/store/modules/user';
let LayOutSettingStore = useLayOutSettingStore()
let userStore = useUserStore();
// 获取路由器对象
let $router = useRouter()
// 获取路由对象
let $route = useRoute()
let color = ref('rgba(255, 69, 0, 0.68)')
let predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
let dark = ref<boolean>(false)

// 刷新回调
const updateRefsh = () => {
  LayOutSettingStore.refsh = !LayOutSettingStore.refsh
}

// 全屏回调
const fullScreen = () => {
  console.log(document.fullscreenElement);
  // DOM对象的一个属性，可以用来判断当前是否是全屏，true全屏，null不是全屏
  let full = document.fullscreenElement
  if (!full) {
    // 全屏requestFullscreen()
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏exitFullscreen()
    document.exitFullscreen();
  }

}

// 退出登录
const logout = async () => {
  // 1.向服务器发请求，退出登录接口
  // 2.清空用户的相关数据
  // 3.跳转登录页面
  await userStore.logout()
  // 跳转登录
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

// 暗黑模式回调
const changeDark=() => {
  // 获取html根节点
  let html=document.documentElement
  dark.value?html.className='dark':html.className=''
}

//主题颜色的设置
const setColor = () => {
  //通知js修改根节点的样式对象的属性与属性值
  const  html = document.documentElement
  // 获取 css 变量
 getComputedStyle(html).getPropertyValue(`--el-color-primary`)
  html.style.setProperty('--el-color-primary', color.value)
  console.log(  html.style);
  
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>


<style scoped lang="scss"></style>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

:focus-visible {
  outline: 0;
}
</style>
