<template>
  <div class="center-bottom-echart">
    <div class="center-bottom-right-chart percent">
      <dv-border-box-12>
        <div class="d-flex card-header">
          <span class="fs-xl text mx-2">服务满意度</span>
          <div class="card-header-decoration">
            <dv-decoration-3 class="dv-dec-3" />
          </div>
        </div>
        <div class="d-flex jc-center rate-echart-container">
          <div class="item">
            <span>本周服务满意度</span>
            <RateChart
              :id="rate[0].id"
              :tips="rate[0].tips"
              :colorObj="rate[0].colorData"
            ></RateChart>
          </div>
          <div class="item">
            <span>上月服务满意度</span>
            <RateChart
              :id="rate[1].id"
              :tips="rate[1].tips"
              :colorObj="rate[1].colorData"
            ></RateChart>
          </div>
        </div>
        <div class="water">
          <dv-water-level-pond class="dv-wa-le-po" :config="water" />
        </div>
      </dv-border-box-12>
    </div>

    <div class="center-bottom-left-chart">
      <dv-border-box-12>
        <div class="d-flex card-header">
          <span class="fs-xl text mx-2">警报类型</span>
          <div class="card-header-decoration">
            <dv-decoration-3 class="dv-dec-3" />
          </div>
        </div>
        <div class="d-flex jc-center pie-echart-container">
          <PieChart></PieChart>
        </div>
      </dv-border-box-12>
    </div>
  </div>
</template>
<script>
import PieChart from '@/components/PieChart';
import RateChart from '@/components/RateChart';
export default {
  name: 'centerBottom',
  components: { PieChart, RateChart },
  data() {
    return {
      rate: [
        {
          id: 'centerRate1',
          tips: 100,
          colorData: {
            textStyle: '#3fc0fb',
            series: {
              color: ['#00bcd44a', 'transparent'],
              dataColor: {
                normal: '#03a9f4',
                shadowColor: '#97e2f5',
              },
            },
          },
        },
        {
          id: 'centerRate2',
          tips: 95,
          colorData: {
            textStyle: '#67e0e3',
            series: {
              color: ['#faf3a378', 'transparent'],
              dataColor: {
                normal: '#ff9800',
                shadowColor: '#fcebad',
              },
            },
          },
        },
      ],
      water: {
        data: [24, 45],
        shape: 'roundRect',
        formatter: '{value}%',
        waveNum: 3,
      },
      //   numberData: [
      //     {
      //       number: {
      //         number: [15],
      //         toFixed: 1,
      //         textAlign: 'left',
      //         content: '{nt}',
      //         style: {
      //           fontSize: 24,
      //         },
      //       },
      //     },
      //     {
      //       number: {
      //         number: [1144],
      //         toFixed: 1,
      //         textAlign: 'left',
      //         content: '{nt}',
      //         style: {
      //           fontSize: 24,
      //         },
      //       },
      //     },
      //     {
      //       number: {
      //         number: [361],
      //         toFixed: 1,
      //         textAlign: 'left',
      //         content: '{nt}',
      //         style: {
      //           fontSize: 24,
      //         },
      //       },
      //     },
      //     {
      //       number: {
      //         number: [157],
      //         toFixed: 1,
      //         textAlign: 'left',
      //         content: '{nt}',
      //         style: {
      //           fontSize: 24,
      //         },
      //       },
      //     },
      //   ],
    };
  },
};
</script>

<style scoped>
.center-bottom-echart {
  display: flex;
  height: 255px;
  /* justify-content: space-around; */
}
.center-bottom-left-chart {
  width: 50%;
}
.center-bottom-right-chart {
  width: 50%;
}
/* .border-box-content {
  display: flex;
  justify-content: space-around;
} */
.pie-echart-container {
  height: 220px;
}
.rate-echart-container {
  height: 220px;
}
.bottom-data {
  display: inline-block;
  width: 160px;
  height: 220px;
}
.card-header {
  position: relative;
  top: 5px;
  /* left: 30px; */
  display: flex;
  justify-content: left;
}
.card-header-decoration {
  width: 100px;
  height: 20px;
}
.text {
  color: #c3cbde;
}
.item {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.item span {
  text-align: center;
}
.rate-echart-container {
  display: flex;
  justify-content: space-around;
  height: 50%;
}
.percent .water {
  width: 80%;
  margin: 0 auto;
}
.percent .water .dv-wa-le-po {
  height: 90px;
}
</style>
