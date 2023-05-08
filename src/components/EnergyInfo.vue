<template>
  <div class="energy-info">
    <div class="title">
      <h3>能耗信息</h3>
      <dv-decoration-2 style="width: 180px; height: 5px" />
    </div>
    <div class="body-box" id="body-box">
      <!-- <dv-scroll-board class="dv-scr-board" :config="config" /> -->
      <BaseChart></BaseChart>
    </div>
  </div>
</template>

<script>
import BaseChart from './BaseChart'; // 实现动态数据的表格显示，展示动态数据
export default {
  components: { BaseChart },
  name: 'EnergyInfo',
  data() {
    return {};
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
  /* overflow: hidden; */
  width: 100%;
  height: 380px;
}
.dv-scr-board {
  width: 270px;
  height: 340px;
}
</style>
