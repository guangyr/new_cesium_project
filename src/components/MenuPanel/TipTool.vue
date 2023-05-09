<template>
  <span class="tooltiptext"> <slot></slot> </span>
</template>
<script>
export default {
  name: 'TipTool',
};
</script>

<style scoped>
.tooltip .tooltiptext {
  width: 80px;
  background-color: rgba(19, 25, 47, 0.6);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 12px;
  /* 定位 */
  position: absolute;
  top: -5px;
  left: 145%;
  z-index: 1;
  /* 淡入淡出动画 */
  opacity: 0;
  transition: opacity 0.3s;
}
.tooltip .tooltiptext::after {
  content: ' ';
  position: absolute;
  top: 50%;
  right: 100%; /* 提示工具左侧 */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

.tooltip:hover .tooltiptext {
  opacity: 1;
}
</style>
