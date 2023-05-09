<template>
  <div
    :id="id"
    :options="options"
    class="rate-echart"
    style="width: 100px; height: 100px"
  ></div>
</template>

<script>
import tdTheme from '@/common/echart/theme.json';

export default {
  data() {
    return {
      // chart: null,
      options: {},
    };
  },
  mounted() {
    this.initChart();
  },
  props: {
    id: {
      type: String,
      required: true,
      default: 'chartRate',
    },
    tips: {
      type: Number,
      required: true,
      default: 95,
    },
    colorObj: {
      type: Object,
      default: function () {
        return {
          textStyle: '#3fc0fb',
          series: {
            color: ['#00bcd44a', 'transparent'],
            dataColor: {
              normal: '#03a9f4',
              shadowColor: '#97e2f5',
            },
          },
        };
      },
    },
  },
  methods: {
    initChart() {
      this.$echarts.registerTheme('tdTheme', tdTheme); // 覆盖默认主题
      this.chart = this.$echarts.init(
        document.getElementById(this.id),
        'tdTheme'
      );
      this.chart.setOption({
        title: {
          text: this.tips + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            color: this.colorObj.textStyle,
            fontSize: 16,
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['75%', '80%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            color: this.colorObj.series.color,
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: this.tips,
                itemStyle: {
                  normal: {
                    color: this.colorObj.series.dataColor.normal,
                    shadowBlur: 10,
                    shadowColor: this.colorObj.series.dataColor.shadowColor,
                  },
                },
              },
              {
                value: 100 - this.tips,
              },
            ],
          },
        ],
      });
    },
  },
  watch: {},
};
</script>

<style scoped>
.percent {
  width: 40%;
  display: flex;
  flex-wrap: wrap;
}
.percent .item {
  width: 50%;
  height: 120px;
}
.percent .item span {
  margin-top: 8px;
  font-size: 14px;
  display: flex;
  justify-content: center;
}
</style>
