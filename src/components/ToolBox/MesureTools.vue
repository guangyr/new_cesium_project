<template>
  <!-- 展开的面板中添加功能 -->
  <MenuInfoPanel>
    <template #title>
      <!-- el-card 标题 -->
      <h3>{{ title }}</h3>
    </template>
    <!-- el-card 功能图标 -->
    <template #content>
      <i class="iconfont icon-map-ruler" @click="lengthMeasure()"> </i>
      <i class="iconfont icon-mianjiceliang1" @click="areaMeasure()"> </i>
      <i class="iconfont icon-poduceliang" @click="azimuth()"></i>
    </template>
  </MenuInfoPanel>
</template>
<script>
import MenuInfoPanel from '../MenuPanel/MenuInfoPanel';
import { measureToolsConfig } from '../../utils/measureToolConfig.js'; // 定义功能图标配置项列表，可以是模板或组件的
let measureLengthTool = null;
let measureAreaTool = null;
let measureAngulationTool = null;
export default {
  name: 'MeasureTools',
  components: { MenuInfoPanel },
  data() {
    return {};
  },
  methods: {
    /*距离测量*/
    lengthMeasure() {
      stopAllMeasureTool();
      if (measureLengthTool === null) {
        const options = measureToolsConfig('length');
        measureLengthTool = new Cesium.MeasureLengthTool(viewer, options);
      }
      measureLengthTool.startTool();
    },
    areaMeasure() {
      stopAllMeasureTool();
      if (measureAreaTool === null) {
        const options = measureToolsConfig('area');
        measureAreaTool = new Cesium.MeasureAreaTool(viewer, options);
      }
      measureAreaTool.startTool();
    },
    azimuth() {
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
};
</script>

<style>
.item i {
  padding: 10px 0;
  color: #00c2ff;
  font-size: 22px;
}
.item i:hover {
  color: #409eff;
}
</style>
