<template>
    <!-- 左侧 -->
    <el-icon style="margin-right: 10px;" @click="changeIcon">
      <component :is="LayOutSettingStore.fold?'Fold':'Expand'"></component>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item  v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
      <!-- 面包屑图标 -->
      <el-icon >
        <component :is="item.meta.icon"/>
      </el-icon>
      <!-- 面包屑标题 -->
      <span style="margin: 0 5px;">{{item.meta.title}}</span>
    </el-breadcrumb-item>
 
   
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
import { useRoute } from 'vue-router';
// 获取lauout配置相关的仓库
let LayOutSettingStore =useLayOutSettingStore() 
// 获取路由对象
let $route = useRoute()
// 切换的方法
const changeIcon=() => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}


</script>
<script lang="ts">
export default {
  name:'Breadcrumb',
}
</script>

<style scoped lang="scss">

</style>
