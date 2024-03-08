// SPU管理模块接口
import request from "@/utils/request"
import type { AllTradeMark, HasSaleAttrResponseData, HasSpuResponseData, SaleAttrResponseData, SkuData, SkuInfoData, SpuData, SpuHasImg } from "./type"
enum API {
  // 获取已有的SPU数据的地址
  HASSPU_URL = '/admin/product/',
  // 获取所有品牌的地址
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个SPU下的全部售卖的图片数据地址
  IMAGE_URL = '/admin/product/spuImageList/',
  // 获取SPU下的全部已有商品的销售属性地址
  SPUHASSALEATTR_URL = "/admin/product/spuSaleAttrList/",
  // 获取整个项目的销售属性
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 添加SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  // 更新SPU
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  // 追加一个新的sku地址
  ADDSKU_URL = '/admin/product/updateSkuInfo',

  //查看某一个已有的SPU下全部售卖的商品
  SKUINFO_URL = '/admin/product/findBySpuId/',

  //删除已有的SPU
  REMOVESPU_URL = '/admin/product/deleteSpu/',


}

// 取已有的SPU数据接口
export const reqHasSpu = (page: number, limit: number, category3Id: number | string) => request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)

// 获取SPU所有品牌
export const reqAllTradeMark = () => request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)

// 获取某个SPU下的全部售卖的图片数据
export const reqSpuImageList = (spuId: number) => request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)

// 获取SPU下的全部已有商品的销售属性
export const reqSpuSaleAttr = (spuId: string | number) => request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)

// 获取整个项目的销售属性
export const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)


// 添加或者修改SPU
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data);
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data);
  }
}

// 追加一个新的sku
export const reqAddSku = (data: SkuData) => request.post<any, any>(API.ADDSKU_URL, data)

//获取SKU数据
export const reqSkuList = (spuId: number | string) => {
  return request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)
}

//删除已有的SPU
export const reqRemoveSpu = (spuId: number | string) => {
  return request.delete<any, any>(API.REMOVESPU_URL + spuId)
}