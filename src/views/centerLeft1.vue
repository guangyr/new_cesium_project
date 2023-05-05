<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <CctvShow></CctvShow>
      <CarInfo></CarInfo>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
// import CenterLeft1Chart from '@/components/echart/centerLeft/centerLeft1Chart'
import CctvShow from '@/components/CctvShow';
import CarInfo from '@/components/CarInfo';
export default {
  data() {
    return {};
  },
  components: {
    // CenterLeft1Chart
    CctvShow,
    CarInfo,
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
#centerLeft1 {
  padding: 16px;
  height: 100%;
  /* height: 600px; */
  width: 300px;
  border-radius: 10px;
  /* overflow: hidden; */
}
#centerLeft1 .bg-color-black {
  height: 100%;
  border-radius: 10px;
}
#centerLeft1 .text {
  color: #c3cbde;
}
</style>
