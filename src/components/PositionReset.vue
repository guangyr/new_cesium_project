<template>
  <div
    class="position-reset iconfont icon-dingwei"
    @click="flyToDefaultPositon()"
  ></div>
</template>
<script>
export default {
  name: 'PositionReset',
  methods: {
    logCurrentCaremaInfo() {
      // 打印当前相机信息, 方便调试
      let longitude = Cesium.Math.toDegrees(
        viewer.camera.positionCartographic.longitude
      ); // 经度
      let latitude = Cesium.Math.toDegrees(
        viewer.camera.positionCartographic.latitude
      ); // 纬度
      let height = viewer.camera.positionCartographic.height; // 高度
      let heading = Cesium.Math.toDegrees(viewer.camera.heading); // 方向角
      let pitch = Cesium.Math.toDegrees(viewer.camera.pitch); // 俯仰角
      console.log(
        `经度:${longitude},纬度:${latitude},高度:${height},方向角:${heading},俯仰角:${pitch}`
      );
      console.log(`${longitude},${latitude},${height}`, `${heading}  ${pitch}`);
    },
    flyToDefaultPositon() {
      // 回到默认相机视角
      viewer.camera.flyTo({
        destination: new Cesium.Cartesian3.fromDegrees(
          114.40407071516431,
          30.464447653829566,
          103.35218625745591
        ),
        orientation: {
          heading: Cesium.Math.toRadians(317.3107228765656), // 方向角
          pitch: Cesium.Math.toRadians(-11.116118823135237), // 俯仰角
          roll: Cesium.Math.toRadians(0.0), // 翻滚角
        },
      });
    },
  },
};
</script>
<style scoped>
.iconfont {
  font-size: 22px;
  color: #fff;
}
</style>
