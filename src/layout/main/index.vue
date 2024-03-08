<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
import { nextTick, ref, watch } from 'vue';
let LayOutSettingStore = useLayOutSettingStore()

// 控住当前组件是否销毁
let flag = ref(true)
// 监听仓库数据是否发生变化，用户刷新
watch(() => LayOutSettingStore.refsh,() => {
  flag.value = false
  // 下次更新DOM后触发
  nextTick(() => {
    flag.value = true
  })
})

</script>
<script lang="ts">
export default {
  name:'Main',
}
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform:scale(0)
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
   transform:scale(1)
}
</style>
