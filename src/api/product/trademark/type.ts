export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// 品牌的ts数据类型
export interface TradeMark {
  id?: number,
  tmName: string,
  logoUrl: string
}

// 包含所有品牌数据的ts类型
export type Recordes = TradeMark[]

// 获取的已有全部品牌的数据ts类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Recordes,
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number
  }
}