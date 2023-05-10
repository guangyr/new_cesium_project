<template>
  <div id="center">
    <button class="btn" @click="bufferAnaly()">摄像头覆盖范围分析</button>

    <div class="bg-color-black">
      <CesiumInit></CesiumInit>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CesiumInit from '@/components/CesiumInit';

export default {
  components: {
    CesiumInit,
  },
  data() {
    return {
      analysisResultLayer: null,
    };
  },
  mounted() {},
  methods: {
    bufferAnaly() {
      axios
        .get(
          'http://localhost:8089/igs/rest/services/igs-demo-plugin/ExtensionServer/demo?path=gdbp://MapGisLocal/CesiumDemo/sfcls/监控点位&path1=gdbp://MapGisLocal/CesiumDemo/sfcls/园区范围'
        )
        .then((res) => {
          console.log(res.data);
          this.analysisResultLayer = res.data;
          this.addAnalysisResult(this.analysisResultLayer);
        });
    },
    addAnalysisResult(url) {
      const options = {
        //服务基地址
        url: 'http://localhost:8089/igs/rest/mrms/layers',
        //gdbps地址数组
        gdbps: [this.analysisResultLayer],
      };
      options.tilingScheme = new Cesium.WebMercatorTilingScheme({
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 2,
      });
      viewer.imageryLayers.addImageryProvider(
        new Cesium.MapGISMapServerImageryProvider(options)
      );
    },
  },
};
</script>

<style scoped>
#center {
  position: relative;
  padding: 16px;
  height: 100%;
  min-width: 300px;
  border-radius: 2px;
}
#center .bg-color-black {
  height: 100%;
  border-radius: 5px;
}
.btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 99;
}
</style>
