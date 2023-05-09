<template>
  <div
    id="pie-echart"
    class="pie-echart"
    style="width: 280px; height: 220px"
  ></div>
</template>

<script>
import tdTheme from '@/common/echart/theme.json';
import { getEnergyInfo } from '@/request/api';

export default {
  name: 'PieChart',
  data() {
    return {
      chart: null,
      waterInfo: [],
      electricInfo: [],
    };
  },
  mounted() {
    this.initChart();
    // getEnergyInfo().then((res) => {
    //   res.data.expense.forEach((item, index) => {
    //     if (index < 5) {
    //       this.electricInfo.push(item.electric);
    //       this.waterInfo.push(item.water);
    //     }
    //   });
    // });
  },
  methods: {
    initChart() {
      this.$echarts.registerTheme('tdTheme', tdTheme); // 覆盖默认主题
      this.chart = this.$echarts.init(
        document.getElementById('pie-echart'),
        'tdTheme'
      );
      this.chart.setOption({
        color: [
          '#37a2da',
          '#32c5e9',
          '#9fe6b8',
          '#ffdb5c',
          '#ff9f7f',
          '#fb7293',
          '#e7bcf3',
          '#8378ea',
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        toolbox: {
          show: true,
        },
        calculable: true,
        legend: {
          orient: 'horizontal',
          icon: 'circle',
          bottom: 0,
          x: 'center',
          data: ['电力', '消防', '治安', '电梯', '空调', '照明'],
          textStyle: {
            color: '#fff',
          },
        },
        series: [
          {
            name: '警报类型统计',
            type: 'pie',
            radius: [10, 50],
            roseType: 'area',
            center: ['50%', '40%'],
            data: [
              { value: 10, name: '电力' },
              { value: 5, name: '消防' },
              { value: 15, name: '治安' },
              { value: 25, name: '电梯' },
              { value: 20, name: '空调' },
              { value: 35, name: '照明' },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style scoped></style>
