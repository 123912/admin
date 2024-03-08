<template>
  <div class="container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" >
      <!-- logo -->
      <logo></logo>

      <!-- 菜单 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu :collapse="LayOutSettingStore.fold?true:false" active-text-color="#ffd04b" background-color="#00152B" class="el-menu-vertical-demo" :default-active="$route.path"          text-color="#fff" @open="handleOpen" @close="handleClose">
        

          <Menu :menuList ='userStore.menuRoutes'></Menu>
        </el-menu>

      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{fold:LayOutSettingStore.fold?true:false}">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容区域 -->
    <div class="layout_main" :class="{fold:LayOutSettingStore.fold?true:false}">
      <div style="height: 1000px; padding: 20px;">
      <Main></Main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 获取路由对象
import { useRoute } from 'vue-router';
import Logo from './logo/index.vue';
import Main from './main/index.vue';
import Menu from './menu/index.vue';
import Tabbar from './tabbar/index.vue';

// 获取用户相关的小仓库
import useLayOutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()


// 获取lauout配置相关的仓库
let LayOutSettingStore =useLayOutSettingStore()

// 获取路由对象
let $route=useRoute()

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>
<script lang="ts">
export default {
  name:'Layout',
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;


  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      color: white;
      .el-menu {
        border-right: none;
      }
    }
    
  }

  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    position: fixed;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height ;
    overflow: auto;
    // transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
