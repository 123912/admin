<template>
  <div>
    <!-- 分类 -->
    <Category :scene="scene"></Category>

    <el-card style="margin: 10px 0;">
      <div v-show="scene == 0">
        <el-button @click="addSpu" type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true">添加SPU</el-button>

        <el-table :data="records" border style="width: 100%;margin: 10px 0;">

          <el-table-column label="序号" type="index" width="80" align="center" />
          <el-table-column prop="spuName" label="SPU名称" />
          <el-table-column prop="description" label="SPU描述" show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="address" label="SPU操作">
            <template #="{ row }">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU" @click="addSku(row)"></el-button>
              <el-button type="primary" size="small" icon="Edit" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="primary" size="small" icon="View" title="查看SPU列表" @click="findSku(row)"></el-button>


              <el-popconfirm :title="`您确认要删除${row.spuName}?`" width="250px" icon="Delete" @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]" :small="true"
          :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="changeSize"
          @current-change="getHasSpu" />
      </div>

      <!-- 添加SPU或者修改SPU -->
      <SpuForm ref="spu" v-show="scene == 1" @changeScene="changeScene"></SpuForm>
      <!-- 添加SKU -->
      <SkuForm ref="sku" v-show="scene == 2" @changeScene="changeScene"></SkuForm>


    </el-card>
  </div>
  <!-- dialog对话框:展示已有的SKU数据 -->
  <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row, $index }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
</template>

<script setup lang="ts">
import { reqHasSpu, reqRemoveSpu, reqSkuList } from '@/api/product/spu';
import type { HasSpuResponseData, Recoeds, SkuData, SkuInfoData, SpuData } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
import { onBeforeUnmount, ref, watch } from 'vue';
// 商品分类仓库
import useCategoryStore from '@/store/modules/category';
import SkuForm from './skuForm.vue';
import SpuForm from './spuForm.vue';
let categoryStore = useCategoryStore()

// 场景切换
let scene = ref<number>(0)//0显示已有的SPU，1：添加或者修改SPU,2:添加SKU

let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
// 存储已有的SPU数据
let records = ref<Recoeds>([])
let spu = ref<any>()
let sku = ref<any>()

//存储全部的SKU数据
let skuArr = ref<SkuData[]>([])
let show = ref<boolean>(false)

// 监听三级分类ID变化
watch(() => categoryStore.c3Id, () => {
  // 保证有三级分类ID
  if (!categoryStore.c3Id) return
  getHasSpu()
})

// 获取三级分类下所有的SPU
const getHasSpu = async (pager = 1) => {
  // 修改当前的页码
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
  if (result.code == 200) {
    records.value = result.data.records;
    total.value = result.data.total
  }

}

// 分页器每页大小发生变化
const changeSize = () => {
  getHasSpu()
}

// 添加SPU回调
const addSpu=() => {
  // 切换场景为添加或者修改SPU
  scene.value = 1

  // 调用子组件实例的方法
  spu.value.initAddSpu(categoryStore.c3Id)
}

// 子组件SpuForm绑定自定义事件：通知父组件切换场景为0
const changeScene=(obj:any) => {
  scene.value=obj.flag

  // 切换后重新获取
  if (obj.params == 'update') {
    // 留在当前页
    getHasSpu(pageNo.value)
  } else {
    getHasSpu()
  }

}

// 修改SPU按钮回调
const updateSpu=(row:SpuData) => {
  // 切换场景为添加或者修改SPU
  scene.value = 1

  // 获取组件实例
  spu.value.initHasSpuData(row)
}


// 添加SKU的回调
const addSku=(row: SpuData) => {
  // 切换场景2
  scene.value = 2
  // 调用子组件的方法
  sku.value.initSkuData(categoryStore.c1Id,categoryStore.c2Id ,row)
}
//查看SKU列表的数据
const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code == 200) {
    skuArr.value = result.data
    //对话框显示出来
    show.value = true
  }
}

//删除已有的SPU按钮的回调
const deleteSpu = async (row: SpuData) => {
  let result: any = await reqRemoveSpu(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    //获取剩余SPU数据
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
//路由组件销毁前，清空仓库关于分类的数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})

</script>

<style scoped lang="scss">
.demo-pagination-block+.demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
