<template>
  <!-- 分类全局组件Category -->
  <Category :scene="scene" />

  <el-card style="margin: 10px 0;">
    <div v-show="scene == 0">
      <el-button @click="addAttr" type="primary" size="default" icon="Plus"
        :disabled="categoryStore.c3Id ? false : true">添加属性</el-button>

      <el-table :data="attrArr" border style="width: 100%;margin: 10px 0;">
        <el-table-column label="序号" type="index" width="80" align="center" />
        <el-table-column prop="attrName" width="120" label="属性名称" />
        <el-table-column prop="address" label="属性值名称">
          <template #="{ row, $index }">
            <el-tag style="margin: 5px;" v-for="(item, index) in row.attrValueList" :key="item.id">{{ item.valueName
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" width="120" label="操作">
          <template #="{ row }">
            <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>


            <el-popconfirm :title="`您确认要删除${row.attrName}?`" width="250px" icon="Delete" @confirm="deleteAttr(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete" ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene == 1">
      <!-- 添加属性和修改属性的场景 -->
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>

        </el-form-item>

      </el-form>
      <el-button :disabled="attrParams.attrName ? false : true" type="primary" size="default" icon="Plus"
        @click="addAttrValue">添加属性值</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <!-- ref可以是字符串或者函数 -->
            <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag" @blur="toLook(row, $index)" size="samll"
              placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
            <div @click="toEdit(row, $index)" v-else>{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" @click="attrParams.attrValueList.splice($index, 1)"
              icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button :disabled="attrParams.attrValueList.length > 0 ? false : true" type="primary" size="default"
        @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
// 组合式API函数watch
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr';
import type { Attr, AttrResponseData, AttrValue } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue';
// 存储已有的属性值
let attrArr = ref<Attr[]>([])

// 定义card组件内容切换变量
let scene = ref<number>(0)

// 存储el-input的组件实例数组
let inputArr = ref<any>([])

// 收集新增属性的数据
let attrParams = reactive<Attr>({
  attrName: '',//新增属性名称
  attrValueList: [],//新增的属性值数组
  categoryId: '',//三级分类的id
  categoryLevel: 3//三级
})

import useCategoryStore from '@/store/modules/category';
let categoryStore = useCategoryStore()

watch(() => categoryStore.c3Id, () => {
  // 清空表格
  attrArr.value = []
  // 保证三级id有
  if (!categoryStore.c3Id) return
  getAttr()
})

// 获取已有的属性的方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }

}

// 添加按钮的回调
const addAttr = () => {
  // 每次点击清空数据
  Object.assign(attrParams, {//合并
    attrName: '',//新增属性名称
    attrValueList: [],//新增的属性值数组
    categoryId: '',//三级分类的id
    categoryLevel: 3//三级
  })
  // 切换为添加和修改场景
  scene.value = 1

  // 收集新增属性的三级分类的id
  attrParams.categoryId = categoryStore.c3Id
}
// 修改按钮的回调
const updateAttr = (row: Attr) => {
  // 切换为添加和修改场景
  scene.value = 1
  // 将已有的属性对象给attrParams对象
  // ES6-Object.assign进行对象合并,浅拷贝,JSON深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))


}
// 删除按钮回调
const deleteAttr = async (attrId: number) => {
  const result: any = await reqRemoveAttr(attrId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    // 重新获取
    getAttr()
  
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

// 取消按钮的回调
const cancel = () => {
  scene.value = 0
}

// 添加属性值
const addAttrValue = () => {
  // 点击按钮向数组追加一个对象
  attrParams.attrValueList.push({
    valueName: "",
    flag: true//控制编辑和查看
  })

  // 获取最后一个input聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })

}

// 保存按钮回调
const save = async () => {
  let result: any = await reqAddOrUpdateAttr(attrParams)
  if (result.code == 200) {
    // 切换场景
    scene.value = 0
    // 提示
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功'
    })
    // 重新请求数据
    getAttr();

  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败'
    })
  }

}

// 属性值表单失去焦点回调
const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() == '') {
    // 删除属性值为空的元素
    attrParams.attrValueList.splice($index, 1)

    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return
  }

  let repeat = attrParams.attrValueList.find((item) => {
    // 切记把当前失去焦点的属性值对象从当前数据扣除判断
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    // 删除重复属性值的对象
    attrParams.attrValueList.splice($index, 1)
    // 提示
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
    return
  }


  row.flag = false
}

// 点击属性值表单回调
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true

  // 切换后需要时间渲染获取不到
  nextTick(() => {
    inputArr.value[$index].focus()
  })

}

// 路由组件销毁前，把仓库分类相关的数据清空
onBeforeUnmount(() => {
  // 清空商品仓库数据
  categoryStore.$reset()
})




</script>

<style scoped lang="scss"></style>
