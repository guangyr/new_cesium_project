<template>
  <div class="text item" id="menu-info-panel">
    <slot name="content"></slot>
  </div>
</template>
<script>
export default {
  name: 'MenuInfoPanel',
};
</script>
<style scoped>
.text {
  font-size: 14px;
}

#menu-info-panel {
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  background-color: #2e6099;
}
.item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
}
</style>
