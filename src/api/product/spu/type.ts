// 服务器返回来全部数据的类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// SPU数据的ts类型
export interface SpuData {
  id?: number,
  spuName: string,
  description: string,
  category3Id: string | number,
  tmId: number | string,
  spuSaleAttrList: null | SaleAttr[],
  spuImageList: null | SpuImg[]
}

// 数组：所有的SPU数据类型
export type Recoeds = SpuData[]

// 定义获取已有SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Recoeds,
    searchCount: boolean,
    size: number,
    total: number,
    current: number,
    pages: number,
  }
}

// 品牌数据的ts类型
export interface Trademark {
  id: number,
  tmName: string,
  logoUrl: string
}

// 品牌接口返回数据的ts类型
export interface AllTradeMark extends ResponseData {
  data: Trademark[],
}

// 商品图片的ts类型
export interface SpuImg {
  id?: number,
  spuId?: number,
  createTime?: string,
  updateTime?: string,
  imgName?: string,
  imgUrl?: string,
  name?: string,
  url?: string
}
// 已有的SPU的返回的图片照片接口返回的数据的ts类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}

// 销售属性值对象的ts类型
export interface SaleAttrValue {
  id?: number,
  createTime?: null,
  updateTime?: null,
  spuId?: number,
  baseSaleAttrId: number | string,
  saleAttrValueName: string,
  saleAttrName?: string,
  isChecked?: null
}
// 销售属性值数组类型
export type spuSaleAttrValueList = SaleAttrValue[]

// 销售属性对象ts类型
export interface SaleAttr {
  id?: number,
  createTime?: null,
  updateTime?: null,
  spuId?: number,
  baseSaleAttrId: number | string,
  saleAttrName: string,
  spuSaleAttrValueList: spuSaleAttrValueList,
  flag?: boolean,
  saleAttrValue?: string
}
// SPU销售属性接口返回的数据的ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

// 已有的全部的销售属性的ts类型
export interface HasSaleAttr {
  id: number,
  name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}

export interface Attr {
  attrId: number | string,//属性的id
  valueId: number | string//属性值的id
}
export interface SaleArr {
  saleAttrId: number | string,//属性的id
  saleAttrValueId: number | string//属性值的id
}
export interface SkuData {
  category3Id: string | number,//三级id
  spuId: string | number,//spu的id
  tmId: string | number, //spu品牌的id
  skuName: string,//sku的名称
  price: string | number,//sku的价格
  weight: string | number,
  skuDesc: string,//sku的描述
  skuAttrValueList?: Attr[

  ],
  skuSaleAttrValueList?: SaleArr[

  ],
  skuDefaultImg: string,//sku的默认图片
}

//获取SKU数据接口的ts类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}