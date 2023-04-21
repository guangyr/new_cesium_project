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
      const viewer = new Cesium.Viewer('globel-container', {});
      viewer.showPosition();
      //打开深度检测
      viewer.scene.globe.depthTestAgainstTerrain = true;

      window.viewer = viewer;
    },
  },
};
</script>

<style>
.globel-container {
  height: 100vh;
  width: 100vw;
}
.cesium-viewer-cesiumWidgetContainer {
  height: 100vh;
}
</style>
