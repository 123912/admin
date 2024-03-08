<template>
  <el-card class="box-card">
    <!-- 卡片头部添加品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus" @click="addTradmark">添加品牌</el-button>
    <!-- 品牌表格 -->
    <el-table :data="trademarkArr" border style="width: 100%;margin: 10px 0;">
      <el-table-column prop="date" type="index" align="center" label="序号" width="80" />
      <el-table-column prop="tmName" align="center" label="品牌名称" />
      <el-table-column align="center" label="品牌LOGO">
        <template #="{ row }">
          <img style="width: 60px;height: 60px;" :src="row.logoUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" label="品牌操作">
        <template #="{ row }">
          <el-button type="primary" size="small" icon="Edit" @click="updateTradmark(row)"></el-button>


          <el-popconfirm :title="`您确认要删除${row.tmName}?`" width="250px" icon="Delete" @confirm="removeTradMark(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :small="small"
      :background="background" layout="prev, pager, next,jumper,-> ,sizes,total" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>

  <el-dialog v-model="dialogFormVisible" :title="trademarkParms.id ? '修改品牌' : '添加品牌'">
    <el-form :model="trademarkParms" :rules="rules" ref="formRef" style="width: 80%;">
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input v-model="trademarkParms.tmName" placeholder="请输入品牌名称" />
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="trademarkParms.logoUrl" :src="trademarkParms.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reqAddOrUpdateTradeMark, reqDeleteTrademark, reqHasTrademark } from '@/api/product/trademark/index';
import type { Recordes, TradeMark, TradeMarkResponseData } from '@/api/product/trademark/type';
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref } from 'vue';
const pageNo = ref<number>(1)
const limit = ref<number>(3)
const small = ref(true)
const background = ref(true)

// 品牌总数
let total = ref<number>(0);
// 品牌数据
let trademarkArr = ref<Recordes>([])

let dialogFormVisible = ref<boolean>(false)


let trademarkParms = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})

// 获取el-from组件
let formRef = ref()

// 获取品牌数据接口
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}

// 组件挂载完成
onMounted(() => {
  getHasTrademark()
})

// 每一页大小
const handleSizeChange = (val: number) => {
  // 每一页大小发生变化时，页码归1
  pageNo.value = 1
  console.log(`${val} items per page`)
  getHasTrademark()
}
// 当前页码发生变化回调
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  getHasTrademark(val)
}

// 添加品牌
const addTradmark = () => {
  dialogFormVisible.value = true;
  // 清空·表单
  trademarkParms.id = 0
  trademarkParms.tmName = ''
  trademarkParms.logoUrl = ''

  //清空规则的校验提示信息 第一种写法
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  // 第二种
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')

  })
}
// 修改品牌
const updateTradmark = (row: TradeMark) => {
  //清空规则的校验提示信息
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')

  })

  dialogFormVisible.value = true;

  // 展示修改品牌
  // trademarkParms.id=row.id
  // trademarkParms.tmName=row.tmName
  // trademarkParms.logoUrl=row.logoUrl

  // 简写合并
  Object.assign(trademarkParms, row)
}
// 点击弹框确定回调
const confirm = async () => {
  //调用这个方法进行全部表单相校验,如果校验全部通过，在执行后面的语法
  await formRef.value.validate()


  let result: any = await reqAddOrUpdateTradeMark(trademarkParms)
  console.log('result', result);

  // 添加/修改品牌
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      message: trademarkParms.id ? '修改品牌成功' : '添加品牌成功',
      type: 'success',
    })
    // 当前修改页
    getHasTrademark(trademarkParms.id ? pageNo.value : 1)
  } else {
    ElMessage({
      message: trademarkParms.id ? '修改品牌失败' : '添加品牌失败',
      type: 'error',
    })
  }
}

// 上传组件-上传成功前回调函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 > 4) {
      ElMessage.error('Avatar picture size can not exceed 2MB!')
      return false
    }
  } else {
    ElMessage.error('Avatar picture must be JPG|png|gif format!')
    return false
  }
}

// 上传组件-上传成功回调函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response) => {
  //  response 上传成功返回的数据
  trademarkParms.logoUrl = response.data

  // 图片上传生成，清除掉对应校验结果
  formRef.value.clearValidate('logoUrl')
}

// 校验规则方法
const validatorTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称位数大于等于两位'))
  }

}
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('LOGO的图片务必上传'))
  }



}
// 表单校验
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, trigger: 'change', validator: validatorLogoUrl },]
}

// 确认删除品牌
const removeTradMark = async (id: number) => {

  let result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage({
      message: '删除品牌成功',
      type: 'success',
    })
    // 再获取
    getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      message: '删除品牌失败',
      type: 'error',
    })
  }
}

</script>

<style scoped lang="scss"></style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
