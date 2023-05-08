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
  /* display: flex;
  flex-direction: column;
  margin: 0 0 0 10px;
  padding: 10px 5px;
  width: 45px;
  background-color: rgba(19, 25, 47, 0.6); */
}
#menu-info-panel .iconfont {
  font-size: 26px;
  margin: 25px 5px;
}
#menu-info-panel .iconfont:hover {
  font-size: 32px;
  color: #568aea;
}
</style>
