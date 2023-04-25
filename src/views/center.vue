<template>
  <div id="center">
    <div class="bg-color-black">
      <CesiumInit></CesiumInit>
      <ToolsMenu></ToolsMenu>
      <MeasureTools
        v-if="$store.state.current_action === 'measure'"
      ></MeasureTools>
      <VisualizationTools
        v-if="$store.state.current_action === 'visualization'"
      ></VisualizationTools>
      <GeneralizedAnalysisTools
        v-if="$store.state.current_action === 'generalizedAnalysis'"
      ></GeneralizedAnalysisTools>
      <LayerShift></LayerShift>
      <PositionReset></PositionReset>
    </div>
  </div>
</template>

<script>
import CesiumInit from '@/components/CesiumInit';
import ToolsMenu from '@/components/ToolsMenu';
import LayerShift from '@/components/LayerShift';
import PositionReset from '@/components/PositionReset';
import MeasureTools from '@/components/ToolBox/MesureTools';
import VisualizationTools from '@/components/ToolBox/VisualizationTools';
import GeneralizedAnalysisTools from '@/components/ToolBox/GeneralizedAnalysisTools';
export default {
  components: {
    CesiumInit,
    ToolsMenu,
    MeasureTools,
    LayerShift,
    PositionReset,
    VisualizationTools,
    GeneralizedAnalysisTools,
  },
  mounted() {
    // console.log('center组件中viewer:', window.viewer);
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
.tools-menu {
  position: absolute;
  bottom: 7px;
  left: 50%;
  transform: translate(-50%);
}
#menu-info-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  left: 15px;
  top: 40%;
}
.layer-shift {
  position: absolute;
  top: 30px;
  right: 40px;
}
.position-reset {
  position: absolute;
  bottom: 80px;
  right: 40px;
}
</style>
