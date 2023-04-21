<template>
  <div id="bottomRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-area" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">工单修复以及满意度统计图</span>
          <div class="decoration2">
            <dv-decoration-2 :reverse="true" style="width: 5px; height: 6rem" />
          </div>
        </div>
      </div>
      <div>
        <!-- <BottomRightChart /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import BottomRightChart from "@/components/echart/bottom/bottomRightChart";
export default {
  components: {
    // BottomRightChart
  },
};
</script>

<style class>
#bottomRight {
  padding: 14px 16px;
  height: 520px;
  width: 100%;
  border-radius: 5px;
}
#bottomRight .bg-color-black {
  height: 490px;
  border-radius: 10px;
}
#bottomRight .text {
  color: #c3cbde;
}
#bottomRight .decoration2 {
  position: absolute;
  right: 0.125rem;
}
#bottomRight .chart-box {
  margin-top: 16px;
  width: 170px;
  height: 170px;
}
#bottomRight .chart-box .active-ring-name {
  padding-top: 10px;
}
</style>
