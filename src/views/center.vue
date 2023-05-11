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
      <LightEffectsTools v-if="$store.state.current_action === 'lightEffect'">
      </LightEffectsTools>
      <ModelAnalysisTools
        v-if="$store.state.current_action === 'modelAnalysis'"
      ></ModelAnalysisTools>
      <GeneralizedAnalysisTools
        v-if="$store.state.current_action === 'generalizedAnalysis'"
      ></GeneralizedAnalysisTools>
      <LayerShift></LayerShift>
      <PositionReset></PositionReset>
      <MarkerInit> </MarkerInit>
      <div id="juanlian-analysis"></div>
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
import ModelAnalysisTools from '@/components/ToolBox/ModelAnalysisTools';
import LightEffectsTools from '@/components/ToolBox/LightEffectsTools';
import GeneralizedAnalysisTools from '@/components/ToolBox/GeneralizedAnalysisTools';
import MarkerInit from '@/components/MarkerInit';
export default {
  components: {
    CesiumInit,
    ToolsMenu,
    MeasureTools,
    LayerShift,
    PositionReset,
    VisualizationTools,
    LightEffectsTools,
    ModelAnalysisTools,
    GeneralizedAnalysisTools,
    MarkerInit,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
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
  position: absolute;
  top: 10%;
  display: flex;
  flex-direction: column;
  margin: 0 0 0 10px;
  padding: 0px 5px;
  width: 45px;
  background-color: rgba(19, 25, 47, 0.6);
}
/* .menu-info-panel-container {
  position: absolute;
  left: 15px;
  top: 40%;
} */
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
#juanlian-analysis {
  position: absolute;
  left: 50%;
  top: 16px;
  height: 92%;
  width: 8px;
  background-color: #f5f5f5;
  display: none;
}
#juanlian-analysis:hover {
  cursor: ew-resize;
}
</style>
