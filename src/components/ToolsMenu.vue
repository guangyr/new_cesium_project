<template>
  <div class="tools-menu">
    <div class="tools-menu-button">
      <ul>
        <li v-for="item in menu_list" :key="item.id" @click="shiftPanel(item)">
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import MeasureTools from './ToolBox/MesureTools';
export default {
  name: 'ToolsMenu',
  components: {
    // MeasureTools,
  },
  data() {
    return {
      menu_list: [
        { id: 1, title: '测量工具', action: 'measure' },
        { id: 2, title: '可视化', action: 'visualization' },
        { id: 3, title: '光源效果', action: 'lightEffect' },
        { id: 4, title: '模型分析', action: 'modelAnalysis' },
        { id: 5, title: '综合分析', action: ' generalizedAnalysis' },
      ],
    };
  },
  methods: {
    shiftPanel(item) {
      if (Object.is(this.$store.state.current_id, NaN)) {
        // 不能直接用 === 判断 nan 的情况，因为 NaN 不等于 任何 类型的整数。

        this.$store.commit('ChangePanelStatu');
        this.$store.commit('ChangeCurrentMenu', item);
      } else if (this.$store.state.current_id === item.id) {
        console.log('重复点击,关闭');
        // 重复点击一个菜单项, 关闭选项, 清空参数, 下次再打开该菜单项走 第一个逻辑
        this.$store.commit('ChangePanelStatu');
        this.$store.commit('ResetMenuStatu', item);
      } else {
        console.log('A3');
        // 不关闭选项, 直接切换菜单项
        this.$store.commit('ChangeCurrentMenu', item);
      }
    },
  },
};
</script>

<style scoped>
.tools-menu-button {
  /* background-color: #ffffff; */
  background: linear-gradient(rgba(19, 25, 47, 0.6), #03050c);
  /* border: 1px solid #e4e7ed; */
  border-radius: 1px;
  box-shadow: 0 0 12px rgba(#2e6099, 0.12);
}
.tools-menu ul {
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tools-menu ul li {
  margin: 8px 0;
  padding: 0 15px;
  text-align: center;
  /* border-left: 1px solid #ebeef5; */
  font-size: 12px;
  /* 禁止复制 */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10+ and Edge */
  user-select: none; /* Standard syntax */
}
.tools-menu ul li:hover {
  color: #409eff;
  cursor: pointer;
}
</style>
