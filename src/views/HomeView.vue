<template>
  <div class="map-container">
    <!-- <ToolsMenu> </ToolsMenu> -->
    <!-- <layer-tree></layer-tree> -->
    <!-- <HeaderInfo></HeaderInfo> -->
    <!-- <CesiumInit></CesiumInit> -->
  </div>
</template>
<script>
import CesiumInit from '@/components/CesiumInit';
// import HeaderInfo from '@/components/HeaderInfo';

import CameraInfo from '@/components/CameraInfo';
import LayerTree from '@/components/LayerTree';
import ToolsMenu from '@/components/ToolsMenu';
import IndexPanel from './IndexPanel';

export default {
  components: {
    LayerTree,
    CameraInfo,
    ToolsMenu,
    CesiumInit,
    IndexPanel,
    // HeaderInfo,
  },
  data() {
    return {};
  },
  methods: {
    mounted() {
      // console.log('aaaa');
      // console.log(viewer);
    },
  },
};
</script>
<style lang="css">
.map-container {
  position: relative;
  height: 100vh;
  width: 100vw;
}
.header-info {
  position: absolute;
  left: 0;
  top: 0;
}
.camera-info {
  position: absolute;
  bottom: 0;
}
.layer-tree {
  position: absolute;
  left: 0;
  top: 25%;
  /* width: 250px;
  height: 100%; */
}
.tools-menu {
  position: absolute;
  right: 10px;
  top: 10px;
}
.measure-3d-tool {
  position: absolute;
  right: 10px;
  top: 50px;
}
</style>
