<template>
  <div
    class="position-reset iconfont icon-dingwei"
    @click="logClickPosition()"
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
      console.log(
        `经度:${viewer.camera.positionCartographic.longitude},纬度:${viewer.camera.positionCartographic.latitude},高度:${viewer.camera.positionCartographic.height},方向角:${viewer.camera.positionCartographic.heading},俯仰角:${viewer.camera.positionCartographic.pitch}`
      );
      console.log(`${longitude},${latitude},${height}`, `${heading}  ${pitch}`);
    },
    logClickPosition() {
      // 打印当前点击的点信息
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (movement) {
        const position = viewer.scene.camera.pickEllipsoid(
          movement.position,
          viewer.scene.globe.ellipsoid
        );
        // console.log(position);
        const cartographic = Cesium.Cartographic.fromCartesian(position);
        // console.log(cartographic);
        const { longitude, latitude, height } = cartographic;
        const lon = Cesium.Math.toDegrees(longitude);
        const lat = Cesium.Math.toDegrees(latitude);
        const _height = Cesium.Math.toDegrees(height);
        // console.log(lon, lat, _height);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      console.log('aa');
    },
    // logClickPosition() {
    //   let handlers = new Cesium.ScreenSpaceEventHandler(
    //     viewer.scene._imageryLayerCollection
    //   );
    //   handlers.setInputAction(function (event) {
    //     console.log('event: ', event);
    //     //获取相机射线
    //     const ray = viewer.scene.camera.getPickRay(event.position);
    //     //根据射线和场景求出在球面中的笛卡尔坐标
    //     let position1 = viewer.scene.globe.pick(ray, viewer.scene);
    //     let lon;
    //     let lat;
    //     let MouseHeight;
    //     let cartographic1;
    //     //获取该浏览器坐标的顶部数据
    //     let feature = viewer.scene.pick(event.position);
    //     // console.log(feature);
    //     if (feature == undefined && position1) {
    //       cartographic1 =
    //         Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
    //       lon = Cesium.Math.toDegrees(cartographic1.longitude);
    //       lat = Cesium.Math.toDegrees(cartographic1.latitude);
    //       MouseHeight = 0;
    //     } else {
    //       let cartesian = viewer.scene.pickPosition(event.position);
    //       if (Cesium.defined(cartesian)) {
    //         //如果对象已定义，将度转为经纬度
    //         let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    //         lon = Cesium.Math.toDegrees(cartographic.longitude);
    //         lat = Cesium.Math.toDegrees(cartographic.latitude);
    //         MouseHeight = cartographic.height; //模型高度
    //       }
    //     }
    //     console.log({ lon, lat, MouseHeight });
    //   }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    // },
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
          pitch: Cesium.Math.toRadians(-8.116118823135237), // 俯仰角
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
