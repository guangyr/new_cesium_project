<template>
  <!--地图工具栏-->
  <div class="map_tool_outbox">
    <span class="map_tool" @Click="zoomFull()">
      <a class="map_tool_inner" title="全图"></a>
    </span>
    <span class="map_tool" @Click="zoomOut()">
      <a
        class="map_tool_inner"
        title="放大"
        style="background-position-x: -36px"
      ></a>
    </span>
    <span class="map_tool" @Click="zoomIn()">
      <a
        class="map_tool_inner"
        title="缩小"
        style="background-position-x: -72px"
      ></a>
    </span>
    <span class="map_tool" @Click="showHeatMap()">
      <a
        class="map_tool_inner"
        title="倒退视图"
        style="background-position-x: -108px"
      ></a>
    </span>
    <span class="map_tool">
      <a
        class="map_tool_inner"
        title="前进视图"
        style="background-position-x: -144px"
      ></a>
    </span>
    <span class="map_tool">
      <a
        class="map_tool_inner display_type_btn"
        title="专题地图"
        style="background-position-x: -180px"
      ></a>
    </span>
    <span class="map_tool">
      <a
        class="map_tool_inner city_chose_btn"
        title="城市定位"
        style="background-position-x: -432px"
      ></a>
    </span>
    <span class="map_tool" id="btnBuffer">
      <a
        class="map_tool_inner"
        title="缓冲区分析"
        style="background-position-x: -216px"
      ></a>
    </span>
    <span class="map_tool">
      <a
        class="map_tool_inner addition_check_btn check_btn"
        title="水质监测设备检索"
        style="background-position-x: -252px"
      ></a>
    </span>
    <span class="map_tool">
      <a
        class="map_tool_inner chemistry_check_btn check_btn"
        @Click="chemistryCheck()"
        title="流量监测设备检索"
        style="background-position-x: -288px"
      ></a>
    </span>
    <span class="map_tool">
      <a
        class="map_tool_inner enterprise_check_btn check_btn"
        @Click="enterpriseCheck()"
        title="水位监测设备检索"
        style="background-position-x: -324px"
      ></a>
    </span>
    <span class="map_tool">
      <a
        class="map_tool_inner car_check_btn check_btn"
        @Click="carCheck()"
        title="车辆监测设备检索"
        style="background-position-x: -360px"
      ></a>
    </span>
    <span class="map_tool">
      <a
        class="map_tool_inner"
        @Click="Search()"
        title="视频设备检索"
        style="background-position-x: -468px"
      ></a>
    </span>
    <span class="map_tool">
      <a
        class="map_tool_inner"
        @Click="cancel()"
        id="fresh_tool"
        title="清空"
        style="background-position-x: -396px"
      ></a>
    </span>
    <span class="map_tool">
      <input
        type="text"
        id="txtCoord"
        style="width: 150px; visibility: hidden"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: 'MapToolsBox',
  methods: {
    zoomFull() {},
    zoomOut() {},
    zoomIn() {},
    showHeatMap() {},
    chemistryCheck() {},
    enterpriseCheck() {},
    carCheck() {},
    Search() {},
    cancel() {},
  },
};
</script>

<style scoped>
.map_tool_outbox {
  width: 100%;
  /* background-image: url('../assets/images/mapToolBox/map_tool_bg.png'); */
  height: 50px;
  cursor: auto;
  background-repeat: repeat-x;
  position: absolute;
  bottom: 0px;
  border-radius: 0px 0px 5px 5px;
}
.map_tool {
  display: block;
  width: 30px;
  height: 80%;
  margin-left: 8px;
  cursor: pointer;
  float: left;
}
.map_tool:hover {
  background-image: url('../assets/images/mapToolBox/map_tool_re.png');
  background-repeat: repeat-x;
}
.map_tool_inner {
  display: block;
  width: 36px;
  height: 100%;
  background-image: url('../assets/images/mapToolBox/tool.png');
  background-repeat: no-repeat;
  margin-left: 2px;
  background-position-y: 7px;
}
</style>
