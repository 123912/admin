<template>
  <el-card>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select :disabled="scene == 0?false:true" placeholder="请选择"  v-model="categoryStore.c1Id" @change="handler">
          <el-option v-for="(c1,index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id" />
         
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select :disabled="scene == 0?false:true" placeholder="请选择"  v-model="categoryStore.c2Id" @change="handler1">
          <el-option v-for="(c2,index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id" />
          
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :disabled="scene == 0?false:true" placeholder="请选择" v-model="categoryStore.c3Id"  >
          <el-option v-for="(c3,index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"  />
         
        </el-select>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// 引入商品仓库
import useCategoryStore from '@/store/modules/category';
let categoryStore = useCategoryStore()



onMounted(() => {
  // 获取一级分类
  getC1()
})

const getC1 =  () => {
  // 通知商品仓库
  categoryStore.getC1()
}

// 一级分类选中后调用二级接口
const handler=() => {
  // 清空二级三级分类数据
  categoryStore.c2Id=''
  categoryStore.c3Arr=[]
  categoryStore.c3Id=''


  categoryStore.getC2()
}
// 二级分类选中后调用三级接口
const handler1=() => {
   // 清空三级分类数据
  categoryStore.c3Id=''

  categoryStore.getC3()
}

// 接收父组件传递的场景scene
defineProps(['scene'])

</script>

<style scoped lang="scss"></style>
