<template>
  <div id="globel-container"></div>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'CesiumInit',
  mounted() {
    this.init();
  },

  methods: {
    init() {
      //构造三维视图类（视图容器div的id，三维视图设置参数）
      const viewer = new Cesium.Viewer('globel-container', {
        orderIndependentTranslucency: false,
        contextOptions: {
          webgl: {
            alpha: true,
          },
        },
      });
      // console.log('CesiumInit viewer: ', viewer);
      window.viewer = viewer;
      // console.log('CesiumInit window.viewer: ', window.viewer);
      // 不显示鼠标信息
      // viewer.hidePosition();
      // viewer.showPosition();
      //打开深度检测
      viewer.scene.globe.depthTestAgainstTerrain = true;
      // viewer绑在window对象上以成为全局变量
      // 是否显示天空盒，即地球背景的星空
      viewer.scene.skyBox.show = false;
      // 宇宙背景色
      viewer.scene.sun.show = false;
      viewer.scene.moon.show = false;
      viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0);
      // 结合css隐藏logo
      viewer._cesiumWidget._creditContainer.style.display = 'none';
      //飞到指定视角
      viewer.camera.setView({
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
      // 相机缩放的最远距离（米），默认为Number.POSITIVE_INFINITY
      viewer.scene.screenSpaceCameraController.maximumZoomDistance = 19000000;
      viewer.scene.layers.appendM3DLayer(
        'http://webclient.smaryun.com:8200/3DData/ModelCache/M3D//1.0/ZondyFaceModels/ZondyFaceModels.mcj',
        {
          loaded: function (layer) {
            // 模型压平需要使用到
            window.tileset = layer;
          },
        }
      );
    },
  },
};
</script>

<style>
/* .globel-container {
  background-color: rgba(0, 0, 0, 0);
} */
/*
.cesium-viewer-cesiumWidgetContainer {
  height: 100vh;
} */
#globel-container .cesium-widget-credits {
  display: none !important;
  visibility: hide !important;
}
#globel-container .cesium-credit-lightbox {
  display: none !important;
  visibility: hide !important;
}
</style>
