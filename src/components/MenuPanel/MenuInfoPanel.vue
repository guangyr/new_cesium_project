<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <slot name="title"></slot>
      <!-- <el-button style="float: right; padding: 3px 0" type="text"
        >操作按钮</el-button
      > -->
      <!-- <i class="iconfont icon-guanbi close-btn"></i> -->
    </div>
    <div class="text item">
      <slot name="content"></slot>
    </div>
  </el-card>
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
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  /* position: relative; */
  float: right;
  margin-top: 10px;
  /* width: 280px; */
}
.el-card ::v-deep .el-card__header {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 20px;
}
.el-card ::v-deep .el-card__body {
  /* height: 20px; */
  padding: 5px 10px;
  /* display: flex;
  align-items: center; */
}
.item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
}

/* .close-btn {
  position: absolute;
  right: 3px;
  top: -3px;
} */
/* .close-btn:hover {
  color: #f56c6c;
} */
/* .icon-guanbi {
  font-size: 22px;
} */
</style>
