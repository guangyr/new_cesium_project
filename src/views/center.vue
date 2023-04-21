<template>
  <div id="center">
    <div class="bg-color-black">
      <CesiumInit></CesiumInit>
      <ToolsMenu></ToolsMenu>
      <MeasureTools
        v-if="$store.state.current_action === 'measure'"
      ></MeasureTools>
    </div>
  </div>
</template>

<script>
import CesiumInit from '@/components/CesiumInit';
import ToolsMenu from '@/components/ToolsMenu';
import MeasureTools from '../components/ToolBox/MesureTools';
export default {
  components: {
    CesiumInit,
    ToolsMenu,
    MeasureTools,
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
}
#menu-info-panel {
  position: absolute;
  left: 7px;
  top: 40%;
}
</style>
