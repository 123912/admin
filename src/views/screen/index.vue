<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"/> 
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">
          <Map class="map"/>
          <Line class="line"/>
        </div>
        <div class="right">
          <Rank class="rank"/>
          <Year class="year"/>
          <Couter class="couter"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
//获取数据大屏展示内容盒子的DOM元素
//引入顶部的子组件
import Age from '@/views/screen/components/age/index.vue';
import Couter from '@/views/screen/components/couter/index.vue';
import Line from '@/views/screen/components/line/index.vue';
import Map from '@/views/screen/components/map/index.vue';
import Rank from '@/views/screen/components/rank/index.vue';
import Sex from '@/views/screen/components/sex/index.vue';
import Top from '@/views/screen/components/top/index.vue';
import Tourist from '@/views/screen/components/tourist1/index.vue';
import Year from '@/views/screen/components/year/index.vue';
let screen = ref()
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
//定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
//监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;

    // 缩放基点
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        // margin-left: 40px;
       .rank{
        flex: 1.5;
       }
       .year{
        flex: 1;
       }
       .couter{
        flex: 1;
       }
      }

      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
      

        .tourist {
          flex: 1.2;
        }

        .sex {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        .map {
          flex: 3;
          background-color: rebeccapurple;
        }
        .line{
          flex:1;
        }
      }
    }
  }
}
</style>
