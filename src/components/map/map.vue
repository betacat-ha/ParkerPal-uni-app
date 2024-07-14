<template>
  <view style="height: 100%;">
    <!-- 绘制3D地图所用的canvas -->
    <canvas id="ooomap" type="webgl" style="width: 100%; height: 100%;" disable-scroll @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" />
    <!-- 创建2d平面图像画布 -->
    <canvas id="canvas2d" type="2d" style="pointer-events: none;position: absolute;left:-1000px" />
  </view>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue';

/**
 * 踩坑
 * 1. import * as om from xx 不行
 * 2. vite-plugin-commonjs 不行
 * 3. vite-plugin-require 没有正确配置插件，还不知道
 */
const om = await import('@/static/js/ooomap.xcx.min.js');

// ooomap map 实例
let map = null;
let canvas2d, canvas3d;

// 封装在微信小程序中得到domElement的方法
function getElement(id, callback) {
  uni.createSelectorQuery().select(`#${id}`).node().exec((res) => {
    const node = res[0].node;

    if (callback) {
      callback(node);
    }
  });
}

onMounted(async () => {
  getElement('ooomap', (node) => {
    canvas3d = node;
    getElement('canvas2d', (node) => {
      canvas2d = node;

      createOMMap(canvas3d, canvas2d);
    });
  });
});

// 在离开页面时销毁地图对象
onBeforeUnmount(() => {
  if (map) {
    map.dispose();
  }
});

function createOMMap(canvas3d, canvas2d) {
  // 创建 ooomap 地图对象
  map = new om.Map({

    container: canvas3d, // canvas type: webgl
    canvas2d, // canvas type: 2d

    // 在ooomap编辑器中生成，或由官方提供
    verifyUrl: 'https://www.ooomap.com/ooomap-verify/check/50689bb01e0ac2a9d93bb18f1e1260f8',
    appID: '87ae6a00e5ca4e33dd7e858a66b73475',

  });

  console.log('ooomap instance:', map);
}

// 必要的几个canvas3d事件
function touchStart(e) {
  canvas3d.dispatchTouchEvent({
    ...e,
    type: 'touchstart',
  });
}
function touchMove(e) {
  canvas3d.dispatchTouchEvent({
    ...e,
    type: 'touchmove',
  });
}
function touchEnd(e) {
  canvas3d.dispatchTouchEvent({
    ...e,
    type: 'touchend',
  });
}
</script>
