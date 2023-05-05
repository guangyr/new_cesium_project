<template>
  <div id="control-panel">
    <!-- <div class="panel-bg"> -->
    <div class="control-panel-content">
      <div class="title">
        <slot name="title1"></slot>
        <dv-decoration-2 style="width: 180px; height: 5px" />
      </div>
      <div class="content">
        <slot name="content1"></slot>
      </div>
      <div class="title">
        <slot name="title2"></slot>
        <dv-decoration-2 style="width: 180px; height: 5px" />
      </div>
      <div class="content">
        <slot name="content2"></slot>
      </div>
      <div class="title">
        <slot name="title3"></slot>
        <dv-decoration-2 style="width: 180px; height: 5px" />
      </div>
      <div class="content">
        <slot name="content3"></slot>
      </div>
    </div>
    <!-- <slot name="controlPanel"></slot> -->
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  name: 'ControlPanel',
};
</script>
<style scoped>
#control-panel {
  padding: 6px 10px 6px;
  /* height: 100%; */
  width: 100%;
  /* border-radius: 10px; */
}

.control-panel-content {
  display: flex;
  flex-direction: column;
  /* border: 1px solid #4edbf8; */
  border-radius: 3px;
  /* margin: 2px; */
}
.control-panel-content .title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 5px 0;
}
</style>
