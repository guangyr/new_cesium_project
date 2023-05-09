<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <AlertInfo></AlertInfo>
      <EnergyInfo></EnergyInfo>
    </div>
  </div>
</template>

<script>
import AlertInfo from '@/components/AlertInfo';
import EnergyInfo from '@/components/EnergyInfo';
export default {
  components: { AlertInfo, EnergyInfo },
  data() {
    return {};
  },
};
</script>

<style scoped>
#centerRight1 {
  padding: 16px;
  padding-top: 20px;
  height: 100%;
  /* height: 600px; */
  width: 300px;
  border-radius: 5px;
}
#centerRight1 .bg-color-black {
  height: 100%;
  border-radius: 10px;
}
</style>
