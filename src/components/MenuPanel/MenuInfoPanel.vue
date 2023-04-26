<template>
  <div id="menu-info-panel">
    <slot name="content"></slot>
  </div>
</template>
<script>
export default {
  name: 'MenuInfoPanel',
};
</script>
<style scoped>
#menu-info-panel {
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  width: 35px;
  /* border: 1px solid #ccc; */
  /* background-color: #2e6099; */
}
#menu-info-panel .iconfont {
  font-size: 26px;
  margin-bottom: 25px;
}
#menu-info-panel .iconfont:hover {
  font-size: 42px;
  color: #568aea;
}
</style>
