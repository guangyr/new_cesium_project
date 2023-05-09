<template>
  <div
    id="base-echart"
    class="base-echart"
    style="width: 100%; height: 320px"
  ></div>
</template>

<script>
import tdTheme from '@/common/echart/theme.json';
import { getEnergyInfo } from '@/request/api';

export default {
  data() {
    return {
      chart: null,
      waterInfo: [],
      electricInfo: [2913.83, 2928.05, 1300.82, 2127.23, 1492.14],
    };
  },
  mounted() {
    this.initChart();
    setInterval(() => {
      this.electricInfo = [];
      getEnergyInfo().then((res) => {
        res.data.expense.forEach((item, index) => {
          if (index < 5) {
            this.electricInfo.push(item.electric);
            this.waterInfo.push(item.water);
          }
        });
      });
    }, 3000);
  },
  methods: {
    initChart() {
      this.$echarts.registerTheme('tdTheme', tdTheme); // 覆盖默认主题
      this.chart = this.$echarts.init(
        document.getElementById('base-echart'),
        'tdTheme'
      );
      this.chart.setOption({
        xAxis: {
          type: 'category',
          position: 'bottom',
          axisLine: true,
          axisLabel: {
            color: 'rgba(255,255,255,.8)',
            fontSize: 12,
          },
          data: ['4/1', '4/2', '4/3', '4/4', '4/5'],
        },
        yAxis: {
          name: '用电量',
          nameLocation: 'end',
          nameGap: 24,
          nameTextStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: 14,
          },
          max: 3500,
          min: 600,
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              opacity: 0,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#fff',
              opacity: 0.1,
            },
          },
          axisLabel: {
            color: 'rgba(255,255,255,.8)',
            fontSize: 12,
          },
          type: 'value',
        },
        series: [
          {
            name: '',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#fff',
              },
            },
            lineStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#1c98e8',
                    },
                    {
                      offset: 1,
                      color: '#28f8de',
                    },
                  ],
                },
                width: 3,
              },
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(35,184,210,.2)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(35,184,210,0)',
                    },
                  ],
                },
              },
            },
            data: [2913.83, 2928.05, 1300.82, 2127.23, 1492.14],
            lineSmooth: true,
          },
        ],
        tooltip: {
          trigger: 'item',
          position: 'top',
          formatter: '{c} 度',
          backgroundColor: 'rgba(28,152,232,.2)',
          padding: 6,
        },
        grid: {
          left: 45,
          // right: 80,
          bottom: 40,
          top: '20%',
        },
      });
    },
  },
  // watch: {
  //   electricInfo(oldVal, newVal) {
  //     console.log(newVal);
  //   },
  // },
};
</script>

<style scoped></style>
