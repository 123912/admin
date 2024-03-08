// 属性相关的接口
import request from '@/utils/request'
import type { Attr, AttrResponseData, CategoryResponseData } from './type'

// 属性管理模块的接口地址
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',

  // 获取分类下的属性地址
  ATTR_URL = '/admin/product/attrInfoList/',

  // 添加或者修改属性的地址
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',

  // 删除属性地址
  DELETEATTR_URL = '/admin/product/deleteAttr/'

}

// 获取一级分类的接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
// 获取二级分类的接口方法
export const reqC2 = (category1Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
// 获取三级分类的接口方法
export const reqC3 = (category2Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + category2Id)

// 获取分类下的属性
export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => request.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id} `)


// 添加或者修改属性
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATEATTR_URL, data)

// 删除属性
export const reqRemoveAttr = (attrId: number) => request.delete<any, any>(API.DELETEATTR_URL + attrId)

