<template>
  <!-- 展开的面板中添加功能 -->
  <MenuInfoPanel>
    <template #title>
      <!-- el-card 标题 -->
      <h3>{{ title }}</h3>
    </template>
    <!-- el-card 功能图标 -->
    <template #content>
      <i class="iconfont icon-map-ruler"></i
      ><i class="iconfont icon-mianjiceliang1"> </i>
      <i class="iconfont icon-poduceliang"></i>
    </template>
  </MenuInfoPanel>
</template>
<script>
import MenuInfoPanel from '../MenuPanel/MenuInfoPanel';

export default {
  name: 'MeasureTools',
  components: { MenuInfoPanel },
  data() {
    return {
      //测量参数
    };
  },
  methods: {
    /*距离测量*/
    lengthMeasure() {
      if (measureLengthTool == undefined) {
        //创建长度测量工具
        measureLengthTool = new Cesium.MeasureLengthTool(webGlobe.viewer);
      }
      //开始长度测量
      measureLengthTool.startTool();
    },

    /*停止测量*/
    stopLengthMeasure() {
      if (measureLengthTool != undefined) {
        //停止长度测量工具
        measureLengthTool.stopTool();
      }
    },
  },
  props: ['statu', 'id', 'title', 'action'],
};
</script>

<style>
.item i {
  padding: 0 5px;
}
.item i:hover {
  color: #409eff;
}
div.el-card__header > div > h3 {
  margin: 0;
}
</style>
