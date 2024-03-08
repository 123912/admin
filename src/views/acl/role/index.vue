<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请你输入搜索职位关键字" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">搜索</el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="default" icon="Plus" @click="addRole">添加职位</el-button>
    <el-table border style="margin: 10px 0px" :data="allRole">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
      <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="280px" align="center">
        <!-- row:已有的职位对象 -->
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="User" @click="setPermisstion(row)">
            分配权限
          </el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
          <el-popconfirm :title="`你确定要删除${row.roleName}?`" width="260px" @confirm="removeRole(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="getHasRole"
      @size-change="sizeChange" />
  </el-card>
  <!-- 添加职位与更新已有职位的结构:对话框 -->
  <el-dialog v-model="dialogVisite" :title="RoleParams.id ? '修改职位' : '添加职位'">
    <el-form :model="RoleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input placeholder="请你输入职位名称" v-model="RoleParams.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="dialogVisite = false">
        取消
      </el-button>
      <el-button type="primary" size="default" @click="save">确定</el-button>
    </template>
  </el-dialog>

  <el-drawer v-model="drawer">
    <!-- 头部标题:将来文字内容应该动态的 -->
    <template #header>
      <h4>分配权限</h4>
    </template>
    <!-- 身体部分 -->
    <template #default>
      <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" :default-checked-keys="selectArr" default-expand-all	
        :props="defaultProps" />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="handler" >确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermisstion } from '@/api/acl/role';
import type { MenuList, MenuResponseData, RoleData, RoleResponseData } from '@/api/acl/role/type';
import useLayOutSettingStore from '@/store/modules/setting';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref } from 'vue';
//获取模板setting仓库
let settingStore = useLayOutSettingStore()
//当前页码
let pageNo = ref<number>(1)
//一页展示几条数据
let pageSize = ref<number>(10)
//搜索职位关键字
let keyword = ref<string>('')
let total = ref<number>(0)
let allRole = ref<RoleData[]>([])

let dialogVisite = ref<boolean>(false)
let RoleParams = reactive<RoleData>({
  roleName: ''
})
let form = ref<any>()
let drawer = ref<boolean>(false)
//准备一个数组:数组用于存储勾选的节点的ID(四级的)
let selectArr = ref<number[]>([])
let menuArr=ref<MenuList>([])

let tree = ref<any>()


const defaultProps = {
  children: 'children',
  label: 'name',
}


//组件挂载完毕
onMounted(() => {
  //获取职位请求
  getHasRole()
})
//获取全部用户信息的方法|分页器当前页码发生变化的回调
const getHasRole = async (pager = 1) => {
  //修改当前页码
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    allRole.value = result.data.records
  }
}

//下拉菜单的回调
const sizeChange = () => {
  getHasRole()
}

//搜索按钮的回调
const search = () => {
  //再次发请求根据关键字
  getHasRole()
  keyword.value = ''
}

//重置按钮
const reset = () => {
  settingStore.refsh = !settingStore.refsh
}

//添加职位按钮的回调
const addRole = () => {
  //对话框显示出来
  dialogVisite.value = true
  //清空数据
  Object.assign(RoleParams, {
    roleName: '',
    id: 0
  })
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
//更新已有的职位按钮的回调
const updateRole = (row: RoleData) => {
  //显示出对话框
  dialogVisite.value = true
  //存储已有的职位----带有ID的
  Object.assign(RoleParams, row)
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}

//自定义校验规则的回调
const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('职位名称至少两位'))
  }
}
//职位校验规则
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}

//确定按钮的回调
const save = async () => {
  //表单校验结果,结果通过在发请求、结果没有通过不应该在发生请求
  await form.value.validate()
  //添加职位|更新职位的请求
  let result: any = await reqAddOrUpdateRole(RoleParams)
  if (result.code == 200) {
    //提示文字
    ElMessage({
      type: 'success',
      message: RoleParams.id ? '更新成功' : '添加成功',
    })
    //对话框显示
    dialogVisite.value = false
    //再次获取全部的已有的职位
    getHasRole(RoleParams.id ? pageNo.value : 1)
  }
}


//已有的职位的数据
const setPermisstion = async (row: RoleData) => {
  //抽屉显示出来
  drawer.value = true
  //收集当前要分类权限的职位的数据
  Object.assign(RoleParams, row)
  //根据职位获取权限的数据
  let result: MenuResponseData = await reqAllMenuList(RoleParams.id as number)
  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
    console.log(selectArr.value);
    
  }
}
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    // 只需要收集最后一层
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      // 递归
      filterSelectArr(item.children, initArr)
    }
  })

  return initArr
} 


// 分配权限确定按钮
const  handler= async() => {
  // 职位id
  const roleId=(RoleParams.id as number)
  // 选中的结点id √
  let arr=tree.value.getCheckedKeys()
  // 半选的id -
  let arr1=tree.value.getHalfCheckedKeys()
  // console.log(arr,arr1);
  let permissionId = arr.concat(arr1)
  //下发权限
  let result: any = await reqSetPermisstion(roleId, permissionId)
  if (result.code == 200) {
    //抽屉关闭
    drawer.value = false
    //提示信息
    ElMessage({ type: 'success', message: '分配权限成功' })
    //因为如果修改自己的权限时需要页面刷新
    window.location.reload()
  }
  
}

//删除已有的职位
const removeRole = async (id: number) => {
  let result: any = await reqRemoveRole(id)
  if (result.code == 200) {
    //提示信息
    ElMessage({ type: 'success', message: '删除成功' })
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
