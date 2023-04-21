<template>
  <div class="camera-info" id="camera-info">
    <span>经度:{{ log }}</span>
    <span>纬度:{{ lat }}</span>
    <span>海拔:{{ alt }}</span>
    <span>摄像机高度:{{ height }}</span>
  </div>
</template>

<script>
export default {
  name: 'CameraInfo',
  data() {
    return {
      log: 0,
      lat: 0,
      alt: 0,
      height: 0,
    };
  },
  methods: {
    mounted() {
      console.log('mounted');
      this.get_carema_info();
    },

    get_carema_info() {
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      console.log(handler);
      handler.setInputAction(function (movement) {
        //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
        let ellipsoid = viewer.scene.globe.ellipsoid;
        let cartesian = viewer.camera.pickEllipsoid(
          movement.endPosition,
          ellipsoid
        );
        if (cartesian) {
          //将笛卡尔三维坐标转为地图坐标（弧度）
          let cartographic = ellipsoid.cartesianToCartographic(cartesian);
          //将地图坐标（弧度）转为十进制的度数
          //经度
          this.log = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
          //纬度
          this.lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
          //视高
          this.alt = (viewer.camera.positionCartographic.height / 1000).toFixed(
            2
          );
          //海拔
          this.height = (
            viewer.scene.globe.getHeight(cartographic) / 1000
          ).toFixed(2);
          console.log(log, lat, alt);
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },
  },
};
</script>

<style>
.camera-info {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.3);
}
.camera-info span {
  padding: 0 10px;
  color: rgba(0, 0, 0, 0.886);
  font-size: 15px;
  font-weight: 500;
}
</style>
