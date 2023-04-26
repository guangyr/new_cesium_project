<template>
  <div id="control-panel">
    <div class="panel-bg">
      <div class="control-panel-content">
        <div class="title1">
          <slot name="title1"></slot>
          <dv-decoration-2 style="width: 180px; height: 5px" />
        </div>
        <div class="content1">
          <slot name="content1"></slot>
        </div>
        <div class="title1">
          <slot name="title2"></slot>
          <dv-decoration-2 style="width: 180px; height: 5px" />
        </div>
        <div class="content1">
          <slot name="content2"></slot>
        </div>
      </div>
      <!-- <slot name="controlPanel"></slot> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'ControlPanel',
};
</script>
<style scoped>
#control-panel {
  padding: 16px 10px 11px;
  height: 100%;
  width: 100%;
  /* border-radius: 10px; */
}
#control-panel .panel-bg {
  height: 100%;
  width: 100%;
  background-color: #343232;
}
.control-panel-content {
  display: flex;
  flex-direction: column;
  /* border: 1px solid #4edbf8; */
  border-radius: 3px;
  margin: 5px;
}
.control-panel-content .title1 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 5px;
}
</style>
