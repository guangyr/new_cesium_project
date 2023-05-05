<template>
  <div class="alert-info">
    <div class="title">
      <h3>报警信息</h3>
      <dv-decoration-2 style="width: 180px; height: 5px" />
    </div>
    <div class="body-box">
      <dv-scroll-board class="dv-scr-board" :config="config" />
    </div>
  </div>
</template>

<script>
import ControlPanel from './MenuPanel/ControlPanel.vue';
import { getCarInfo } from '@/request/api.js';
export default {
  name: 'AlertInfo',
  data() {
    return {
      config: {
        header: ['事件', '地点', '完成情况'],
        data: [
          ['人员被困', '1#客梯', "<span  class='colorRed'>待完成</span>"],
          ['电力过载', '配电房', "<span  class='colorGrass'>完成</span>"],
          ['电梯故障', '3#客梯', "<span  class='colorGrass'>完成</span>"],
          ['人员被困', '1#客梯', "<span  class='colorRed'>待完成</span>"],
          ['火灾报警', '1#234', "<span  class='colorGrass'>完成</span>"],
          ['监控故障', '012路', "<span  class='colorRed'>待完成</span>"],
          ['未知人员', '东门', "<span  class='colorGrass'>完成</span>"],
          ['人员被困', '3#客梯', "<span  class='colorGrass'>完成</span>"],
          ['火灾报警', '2#456', "<span  class='colorGrass'>完成</span>"],
          ['火灾报警', '1#234', "<span  class='colorRed'>完成</span>"],
          ['监控故障', '012路', "<span  class='colorRed'>待完成</span>"],
        ],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: '#0f1325', //表头
        oddRowBGC: '#0f1325', //奇数行
        evenRowBGC: '#171c33', //偶数行
        index: false,
        // columnWidth: [50],
        align: ['center'],
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.car-info {
  padding: 6px 10px 6px;
}
.box {
  position: relative;
  border: 1px solid rgba(7, 118, 181, 0.5);
  box-shadow: inset 0 0 10px rgba(7, 118, 181, 0.4);
}
.box:before {
  width: 100%;
  height: 1px;
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  background: linear-gradient(to right, #076ead, #4ba6e0, #076ead);
  box-shadow: 0 0 5px rgba(131, 189, 227, 1);
  opacity: 0.6;
}
h3 {
  font-size: 14px;
  color: #07e5ff;
}
.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 5px 0;
}

h3 {
  font-size: 14px;
  color: #07e5ff;
}
.body-box {
  border-radius: 10px;
  overflow: hidden;
}
.dv-scr-board {
  width: 270px;
  height: 340px;
}
</style>
