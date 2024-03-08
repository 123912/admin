<template>
  <el-form :model="SpuParams" label-width="100px">
    <el-form-item label="SPU名称">
      <el-input v-model="SpuParams.spuName" placeholder="请输入SPU名称" />
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId" placeholder="please select your zone">
        <el-option :label="item.tmName" :value="item.id" v-for="(item, index) in AllTradeMark" :key="item.id" />

      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input v-model="SpuParams.description" type="textarea" placeholder="请输入SPU描述" />
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;height: 100%;" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select v-model="saleAttrIdAndValueName"
        :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'">
        <el-option v-for="(item, index) in unSelectSaleAttr" :key="item.id" :label="item.name"
          :value="`${item.id}:${item.name}`" />
      </el-select>
      <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName ? false : true" type="primary" size="default"
        icon="Plus" style="margin-left: 10px;">添加属性</el-button>

      <el-table :data="saleAttr" border style="width: 100%;margin: 10px 0;">

        <el-table-column label="序号" type="index" width="80" align="center" />
        <el-table-column prop="saleAttrName" width="120" label="销售属性名称" />
        <el-table-column label="销售属性值">
          <template #="{ row }">
            <el-tag style="margin: 0 5px;" v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id" class="mx-1"
              closable @close="row.spuSaleAttrValueList.splice(index, 1)">
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input placeholder="请输入属性值" v-if="row.flag == true" ref="InputRef" v-model="row.saleAttrValue"
              style="width: 100px;" size="small" @blur="toLook(row)" />
            <el-button v-else icon="Plus" type="primary" size="small" @click="toEdit(row)">

            </el-button>
          </template>

        </el-table-column>

        <el-table-column width="120" label="操作">
          <template #="{ row, $index }">

            <el-popconfirm :title="`您确认要删除这个销售属性吗?`" width="250px" icon="Delete" @confirm="saleAttr.splice($index, 1)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save" :disabled="saleAttr.length > 0 ? false : true">保存</el-button>
      <el-button type="primary" size="default" style="margin-left: 10px;" @click="cancel">取消</el-button>
    </el-form-item>

  </el-form>
</template>

<script setup lang="ts">
let $emit = defineEmits(['changeScene'])
import { reqAddOrUpdateSpu, reqAllSaleAttr, reqAllTradeMark, reqSpuImageList, reqSpuSaleAttr } from '@/api/product/spu';
import type { AllTradeMark, HasSaleAttr, HasSaleAttrResponseData, SaleAttr, SaleAttrResponseData, SaleAttrValue, SpuData, SpuHasImg, SpuImg, Trademark } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';

const dialogImageUrl = ref<string>('')
const dialogVisible = ref<boolean>(false)

// 存储SPU的这些数据
let AllTradeMark = ref<Trademark[]>([])
let imgList = ref<SpuImg[]>([])
let saleAttr = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])
let SpuParams = ref<SpuData>({
  spuName: '',//SPU的名称
  description: '',//SPU的描述
  category3Id: '',//三级分类的ID
  tmId: '',//品牌的ID
  spuSaleAttrList: [],
  spuImageList: []
})
// 收集新增的销售属性的ID和属性的名字
let saleAttrIdAndValueName = ref<string>('')



// 取消按钮回调
const cancel = () => {
  $emit('changeScene', {flag:0,params:'update'})
}

const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu

  // 获取SPU所有品牌
  let result: AllTradeMark = await reqAllTradeMark()
  // 获取某个SPU下的全部售卖的图片
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  // 获取已有的的SPU销售属性的数据
  let result2: SaleAttrResponseData = await reqSpuSaleAttr(spu.id as number)
  // 获取整个项目的销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  console.log(result, result1, result2, result3);

  AllTradeMark.value = result.data
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  saleAttr.value = result2.data
  allSaleAttr.value = result3.data

}

// 照片墙点击预览的回调
const handlePictureCardPreview = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
// 照片墙删除回调
const handleRemove = () => {
  console.log(123)
}
// 上传成功前回调
const handlerUpload = (file: any) => {
  if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: "上传文件需小于3m"
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: "上传文件务必PNG|JPG|GIF"
    })
    return false
  }
}
// 计算属性 过滤出未添加的销售属性
let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName;
    })
  })
  return unSelectArr
})

// 添加属性按钮的回调
const addSaleAttr = () => {
  /*
   baseSaleAttrId: number,
  saleAttrName: string,
  spuSaleAttrValueList: spuSaleAttrValueList
  */
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  // 新增的销售属性对象
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  }
  // 追加
  saleAttr.value.push(newSaleAttr);
  saleAttrIdAndValueName.value = ''

}
// 属性值的按钮的回调
const toEdit = (row: SaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
}
// 表单元素失去焦点回调
const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: (saleAttrValue as string)
  }

  // 如果为空
  if ((saleAttrValue as string).trim() == '') {
    ElMessage({
      type: 'error',
      message: "属性值不能为空"
    })
    return
  }

  // 判断是否重复
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue

  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: "属性值重复"
    })
    return
  }

  // 追加属性值
  row.spuSaleAttrValueList.push(newSaleAttrValue)

  // 切换查看模式
  row.flag = false
}

// 保存按钮的回调
const save = async () => {
  // 整理参数
  // 照片数据
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url
    }
  })

  // 销售属性值数据
  SpuParams.value.spuSaleAttrList = saleAttr.value
  // console.log(SpuParams.value);
  let result: any = await reqAddOrUpdateSpu(SpuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功'
    })
    // 切换场景
    $emit('changeScene', {flag:0,params:SpuParams.value.id?'update':'add'})
  } else {
    ElMessage({
      type: 'error',
      message: SpuParams.value.id ? '更新失败' : '添加失败'
    })
  }
}

// 添加一个新的SPU的初始化方法
const initAddSpu = async (c3Id: number | string) => {
  // 清空数据
  Object.assign(SpuParams.value, {
    spuName: '',//SPU的名称
    description: '',//SPU的描述
    category3Id: '',//三级分类的ID
    tmId: '',//品牌的ID
    spuSaleAttrList: [],
    spuImageList: []
  })
  // 清空图片
  imgList.value=[]
  // 清空销售属性
  saleAttr.value=[]
  saleAttrIdAndValueName.value=''
  SpuParams.value.category3Id = c3Id
  // 获取SPU所有品牌
  let result: AllTradeMark = await reqAllTradeMark()
  AllTradeMark.value = result.data
  // 获取整个项目的销售属性
  let result1: HasSaleAttrResponseData = await reqAllSaleAttr()
  allSaleAttr.value = result1.data
}
// 对外暴露
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped lang="scss"></style>
