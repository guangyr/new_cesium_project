<template>
  <div id="bottomLeft">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">数据统计图</span>
        </div>
      </div>
      <div>
        <!-- <BottomLeftChart /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import BottomLeftChart from '@/components/echart/bottom/bottomLeftChart'
export default {
  components: {
    // BottomLeftChart
  },
};
</script>

<style scoped>
#bottomLeft {
  padding: 20px 16px;
  height: 520px;
  width: 100%;
  border-radius: 5px;
}
#bottomLeft .bg-color-black {
  height: 485px;
  border-radius: 10px;
}
#bottomLeft .text {
  color: #c3cbde;
}
#bottomLeft .chart-box {
  margin-top: 16px;
  width: 170px;
  height: 170px;
}
#bottomLeft .chart-box .active-ring-name {
  padding-top: 10px;
}
</style>
