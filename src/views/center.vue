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
      <ModelAnalysisTools
        v-if="$store.state.current_action === 'modelAnalysis'"
      ></ModelAnalysisTools>
      <GeneralizedAnalysisTools
        v-if="$store.state.current_action === 'generalizedAnalysis'"
      ></GeneralizedAnalysisTools>
      <LayerShift></LayerShift>
      <PositionReset></PositionReset>
      <MarkerInit :position="position" :imgUrl="imgUrl"> </MarkerInit>
      <!-- <div id="juanlian-analysis"></div> -->
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
import ModelAnalysisTools from '@/components/ToolBox/ModelAnalysisTools.vue';
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
    ModelAnalysisTools,
    GeneralizedAnalysisTools,
    MarkerInit,
  },
  data() {
    return {
      position: {
        longitude: 114.40126017378023,
        latidude: 30.466008983758886,
        height: 61.9967540070942,
      },
      imgUrl: 'http://localhost:8021/枪机.svg',
    };
  },
  mounted() {
    // console.log('center组件中viewer:', window.viewer);
    this.pickMarker();
  },
  methods: {
    pickMarker() {
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (event) {
        // 设置左键点击事件
        let pick = viewer.scene.pick(event.position); // 获取 pick 拾取对象
        console.log('pick object:', pick, pick.id);
        let entity = viewer.entities.getById(pick.id);
        console.log(entity);
        // // 判断是否获取到了 pick
        // // pick.id.billboard.image = '......'; // 修改拾取到的entity的样式
        if (pick && pick.id) {
          // console.log(
          //   'pick object:',
          //   pick.primitive._height,
          //   pick.primitive._imageId
          // );
          // pick.collection._billboards[0]._height = 128;
          // pick.collection._billboards[0]._imageId =
          //   'http://localhost:8021/球机.svg';
        } else {
          return;
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
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
.menu-info-panel-container {
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
#juanlian-analysis {
  position: absolute;
  left: 50%;
  top: 16px;
  height: 92%;
  width: 8px;
  background-color: #f5f5f5;
}
#juanlian-analysis:hover {
  cursor: ew-resize;
}
</style>
