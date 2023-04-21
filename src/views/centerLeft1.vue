<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <!-- <icon name="chart-bar" class="text-icon"></icon> -->
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">通过率</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <!-- <CenterLeft1Chart /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import CenterLeft1Chart from '@/components/echart/centerLeft/centerLeft1Chart'
export default {
  data() {
    return {
      numberData: [
        {
          number: {
            number: [15],
            toFixed: 1,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24,
            },
          },
          text: '今日构建总量',
        },
        {
          number: {
            number: [1144],
            toFixed: 1,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24,
            },
          },
          text: '总共完成数量',
        },
        {
          number: {
            number: [361],
            toFixed: 1,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24,
            },
          },
          text: '正在编译数量',
        },
        {
          number: {
            number: [157],
            toFixed: 1,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24,
            },
          },
          text: '未通过数量',
        },
      ],
    };
  },
  components: {
    // CenterLeft1Chart
  },
  mounted() {
    this.changeTiming();
  },
  methods: {
    changeTiming() {
      setInterval(() => {
        this.changeNumber();
      }, 3000);
    },
    changeNumber() {
      this.numberData.forEach((item, index) => {
        item.number.number[0] += ++index;
        item.number = { ...item.number };
      });
    },
  },
};
</script>

<style scoped>
#centerLeft1 {
  padding: 16px;
  height: 100%;
  width: 300px;
  border-radius: 10px;
}
#centerLeft1 .bg-color-black {
  height: 100%;
  border-radius: 10px;
}
#centerLeft1 .text {
  color: #c3cbde;
}
#centerLeft1 .dv-dec-3 {
  position: relative;
  width: 100px;
  height: 20px;
  top: -3px;
}
#centerLeft1 .bottom-data .item-box {
  font-size: 14px;
  float: right;
  position: relative;
  width: 50%;
  color: #d3d6dd;
}
#centerLeft1 .bottom-data .item-box > div {
  padding-right: 5px;
}
#centerLeft1 .bottom-data .item-box .dv-digital-flop {
  width: 120px;
  height: 30px;
}
#centerLeft1 .bottom-data .item-box .coin {
  position: relative;
  top: 6px;
  font-size: 20px;
  color: #ffc107;
}
#centerLeft1 .bottom-data .item-box .colorYellow {
  color: yellowgreen;
}
#centerLeft1 .bottom-data .item-box p {
  text-align: center;
}
</style>
