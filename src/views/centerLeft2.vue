<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">地图数据</span>
          <dv-decoration-1 class="dv-dec-1" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <!-- <CenterLeft2Chart /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import CenterLeft2Chart from "@/components/echart/centerLeft/centerLeft2Chart";
export default {
  components: {
    // CenterLeft2Chart
  },
};
</script>

<style scoped>
#centerLeft1 {
  padding: 16px;
  height: 410px;
  min-width: 300px;
  border-radius: 5px;
}
#centerLeft1 .bg-color-black {
  height: 380px;
  border-radius: 10px;
}
#centerLeft1 .text {
  color: #c3cbde;
}
#centerLeft1 .dv-dec-1 {
  position: relative;
  width: 100px;
  height: 20px;
  top: -3px;
}
#centerLeft1 .chart-box {
  margin-top: 16px;
  width: 170px;
  height: 170px;
}
#centerLeft1 .chart-box .active-ring-name {
  padding-top: 10px;
}
</style>
