<template>
  <div class="layer-shift">
    <div class="vec-map" :class="flag ? 'active' : ''" @click="shiftVecLayer">
      <span class="layer-type">地图</span>
    </div>

    <div
      class="satellite-map"
      :class="flag ? '' : 'active'"
      @click="shiftSatelliteLayer"
    >
      <span class="layer-type">卫星</span>
    </div>
  </div>
</template>
<script>
let layer_type = null;
let vecLayer, cvaLayer, imgLayer, ciaLayer;
export default {
  name: 'LayerShift',
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    shiftVecLayer() {
      //  显示矢量底图
      this.flag = true;
      viewer.imageryLayers.removeall;
      layer_type = 'vec';
      vecLayer = viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider(
          this.layerOptions(layer_type)
        )
      );
      // 注记
      cvaLayer = viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider(this.layerOptions('cva'))
      );
    },
    shiftSatelliteLayer() {
      this.flag = false;
      // 切换图层前删除所有图层, 避免切换过程中图层列表原来越多, 暂时使用removeall(),后续如有必要可改为remove(vecLayer)
      viewer.imageryLayers.removeall;
      layer_type = 'img';
      imgLayer = viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider(
          this.layerOptions(layer_type)
        )
      );
      // 注记
      ciaLayer = viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider(this.layerOptions('cia'))
      );
    },

    layerOptions(type) {
      //天地图URL，开发token
      const options = {
        url:
          'http://t0.tianditu.gov.cn/' +
          type +
          '_w/wmts?tk=2157d3918ed04b66dc6db3b483f73197',
        layer: type, //瓦片样式
        style: 'default', //比例尺
        tileMatrixSetID: 'w', //请求格式s
        format: 'tiles',
      };
      return options;
    },
  },
  mounted() {
    this.shiftVecLayer();
  },
};
</script>
<style scoped>
.layer-shift {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-size: 12px;
  -webkit-user-select: none; /* Safari */
  user-select: none; /* Standard syntax */
  cursor: pointer;
}
div .layer-type {
  padding: 2px;
}
.layer-shift .vec-map {
  padding: 3px 6px;
  border: 1px solid #2e6099;
  border-radius: 15px 0 0 15px;
  background-color: #fff;
  color: black;
}

.layer-shift .satellite-map {
  padding: 3px 6px;
  border: 1px solid #2e6099;
  border-radius: 0 15px 15px 0;
  background-color: #fff;
  color: black;
}

.layer-shift .active {
  background-color: #2e6099;
  color: #fff;
  font-size: 14px;
}
</style>
