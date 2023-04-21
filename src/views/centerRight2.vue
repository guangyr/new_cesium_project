<template>
  <div id="centerRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="align-left" class="text-icon"></icon>
        </span>
        <span class="fs-xl text mx-2">产品销售渠道分析</span>
      </div>
      <div class="d-flex ai-center flex-column body-box">
        <dv-capsule-chart class="dv-cap-chart" :config="config" />
        <!-- <centerRight2Chart1 /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import centerRight2Chart1 from '@/components/echart/centerRight/centerRightChart'

export default {
  data() {
    return {
      config: {
        data: [
          {
            name: '南阳',
            value: 167,
          },
          {
            name: '周口',
            value: 67,
          },
          {
            name: '漯河',
            value: 123,
          },
          {
            name: '郑州',
            value: 55,
          },
          {
            name: '西峡',
            value: 98,
          },
        ],
      },
    };
  },
  components: {
    //  centerRight2Chart1
  },
};
</script>

<style scoped>
#centerRight2 {
  padding: 5px;
  height: 410px;
  width: 340px;
  border-radius: 5px;
}
#centerRight2 .bg-color-black {
  padding: 5px;
  height: 410px;
  width: 340px;
  border-radius: 10px;
}
#centerRight2 .text {
  color: #c3cbde;
}
#centerRight2 .body-box {
  border-radius: 10px;
  overflow: hidden;
}
#centerRight2 .body-box .dv-cap-chart {
  width: 100%;
  height: 160px;
}
</style>
