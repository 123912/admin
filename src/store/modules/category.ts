// 小仓库：商品分类相关配置仓库
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import { defineStore } from 'pinia'
import type { CategoryState } from './types/types'

let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      // 一级分类数据
      c1Arr: [],
      // 一级分类id
      c1Id: '',
      // 二级分类数据
      c2Arr: [],
      // 二级分类id
      c2Id: '',
      // 三级分类数据
      c3Arr: [],
      // 三级分类id
      c3Id: '',
    }
  },
  actions: {
    // 获取一级分类
    async getC1() {
      let result: CategoryResponseData = await reqC1()
      if (result.code == 200) {
        this.c1Arr = result.data
      }

    },
    // 获取一级分类下的二级
    async getC2() {
      let result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code == 200) {
        this.c2Arr = result.data
      }

    },
    // 获取二级分类下的三级
    async getC3() {
      let result: CategoryResponseData = await reqC3(this.c2Id)
      if (result.code == 200) {
        this.c3Arr = result.data
      }

    }
  },
  getters: {

  }
})
export default useCategoryStore