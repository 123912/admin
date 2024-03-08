<template>
  <div class="containerLogo" v-if="!setting.logoHidden">
    <img :src="setting.logo" alt="">
    <div class="title">{{ setting.title }}</div>
  </div>
</template>

<script setup lang="ts">
// 引入项目配置
import setting from '@/setting';

</script>
<script lang="ts">
export default {
  name:'Logo',
}
</script>

<style scoped lang="scss">
.containerLogo{
  display: flex;
  align-items: center;
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  img {
    width: 40px;
    height: 40px;
  }
  .title{
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
