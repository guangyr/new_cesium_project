<template>
  <!-- 展开的面板中添加功能 -->
  <MenuInfoPanel>
    <!-- el-card 功能图标 -->
    <template #content>
      <i class="iconfont icon-map-ruler tooltip" @click="lengthMeasure()">
        <TipTool>长度测量</TipTool>
      </i>
      <i class="iconfont icon-mianjiceliang1 tooltip" @click="areaMeasure()">
        <TipTool>面积测量</TipTool></i
      >
      <i class="iconfont icon-poduceliang tooltip" @click="azimuth()">
        <TipTool>方位角测量</TipTool></i
      >
    </template>
  </MenuInfoPanel>
</template>
<script>
import MenuInfoPanel from '../MenuPanel/MenuInfoPanel';
import { measureToolsConfig } from '../../utils/measureToolConfig.js';
import TipTool from '../MenuPanel/TipTool';
let measureLengthTool = null;
let measureAreaTool = null;
let measureAngulationTool = null;
export default {
  name: 'MeasureTools',
  components: { MenuInfoPanel, TipTool },
  data() {
    return {};
  },
  methods: {
    /*距离测量*/
    lengthMeasure() {
      this.stopAllMeasureTool();
      if (measureLengthTool === null) {
        const options = measureToolsConfig('length');
        measureLengthTool = new Cesium.MeasureLengthTool(viewer, options);
      }
      measureLengthTool.startTool();
    },
    areaMeasure() {
      this.stopAllMeasureTool();
      if (measureAreaTool === null) {
        const options = measureToolsConfig('area');
        measureAreaTool = new Cesium.MeasureAreaTool(viewer, options);
      }
      measureAreaTool.startTool();
    },
    azimuth() {
      this.stopAllMeasureTool();
      if (measureAngulationTool === null) {
        const options = measureToolsConfig('azimuth');
        measureAngulationTool = new Cesium.AngulationTool(viewer, options);
      }
      measureAngulationTool.startTool();
    },
    stopAllMeasureTool() {
      if (measureLengthTool) {
        measureLengthTool.stopTool();
      }
      if (measureAreaTool) {
        measureAreaTool.stopTool();
      }
      if (measureAngulationTool) {
        measureAngulationTool.stopTool();
      }
    },
  },
  beforeDestroy() {
    this.stopAllMeasureTool();
  },
};
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}
</style>
