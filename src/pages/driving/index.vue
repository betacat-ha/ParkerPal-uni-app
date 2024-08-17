<template>
  <view>
    <map
      id="map" class="map"
      :latitude="lat"
      :longitude="lng"
      :scale="scale"
      :show-location="true"
      :show-compass="true"
      :enable-rotate="true"
      :enable-overlooking="true"
      :enable-3D="true"
      :enable-indoorMap="true"
      @markertap="handleMarkerClick"
    />

    <Tabbar />
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/index';

// const apiKey = 'PYFBZ-Z4TLJ-JFXFI-DPTWK-FED6K-P7FPL';
const imgUrl = '../../static/images/mark.png';

const lat = ref(23.131);
const lng = ref(113.372);
const scale = ref(17);

onShow(() => {
  // 设置当前tab
  useUserStore().tabValue = 1;
});

const mapContext = uni.createMapContext('map', this);
addMarkers();
// addGroundOverlay();
console.log(mapContext);
mapContext.on('markerClusterCreate', (e) => {
  console.log('markerClusterCreate', e);
});

function addMarkers() {
  const positions = [
    {
      latitude: 23.133,
      longitude: 113.361,
    },
    {
      latitude: 23.132,
      longitude: 113.371,
    },
    {
      latitude: 23.131,
      longitude: 113.372,
    },
    {
      latitude: 23.131,
      longitude: 113.373,
    },
  ];

  const markers: any[] = [];

  positions.forEach((p, i) => {
    markers.push(
      Object.assign({}, {
        id: i + 1,
        iconPath: `${imgUrl}/mark.png`,
        width: 50,
        height: 50,
        joinCluster: true, // 指定了该参数才会参与聚合
        label: {
          width: 50,
          height: 30,
          borderWidth: 1,
          borderRadius: 10,
          bgColor: '#ffffff',
          content: `停车场 ${i + 1}`,
        },
      }, p),
    );
  });

  mapContext.addMarkers({
    markers,
    clear: false,
  });
}

// TODO
// function addGroundOverlay() {
//   // 获取当前地图的范围
//   let region = null;
//   mapContext.getRegion({
//     success: (res) => {
//       region = res;
//       console.log(res);
//     },
//   });

//   // 计算图层放置的坐标
//   // gcj02ToWgs84()

//   const layer = {
//     id: 1,
//     src: `${imgUrl}/layer1.jpg`,
//     visible: true,
//     zindex: 1, // 图层绘制顺序
//     opacity: 0.6, // 图层透明度
//     bounds: { // 图片覆盖的经纬度范围
//       northeast: region.northeast, // 东北角经纬度
//       southwest: region.southwest, // 西南角经纬度
//     },
//   };
//   console.log(layer);
//   mapContext.addGroundOverlay(layer);
// }

// TODO 点击标记平滑移动地图 translateMarker
function handleMarkerClick(e) {
  // moveToLocation
  console.log(e);
}
</script>

<style lang="scss">
.map{
  width: 100vw;
  height: 100vh;
}
</style>
