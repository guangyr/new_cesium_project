<template>
  <div class="tools-menu">
    <div class="tools-menu-button">
      <ul>
        <li v-for="item in menu_list" :key="item.id" @click="shiftPanel(item)">
          <span :class="item.icon" class="iconfont"></span> {{ item.title }}
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
        {
          id: 1,
          icon: 'icon-a-3Dcelianggongju',
          title: '测量工具',
          action: 'measure',
        },
        {
          id: 2,
          icon: 'icon-sanweikeshihua',
          title: '可视化',
          action: 'visualization',
        },
        {
          id: 3,
          icon: 'icon-fanguang',
          title: '光源效果',
          action: 'lightEffect',
        },
        {
          id: 4,
          icon: 'icon-moxingfenxi',
          title: '模型分析',
          action: 'modelAnalysis',
        },
        {
          id: 5,
          icon: 'icon-shouye-moxingfenxi',
          title: '综合分析',
          action: ' generalizedAnalysis',
        },
      ],
      menuVisibility: true, // 是否显示工具栏. 默认为false. 可选值有:true,false。
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
    enter() {
      this.menuVisibility = true;
    },
    leave() {
      this.menuVisibility = false;
    },
  },
};
</script>

<style scoped>
.tools-menu {
  display: flex;
  justify-content: space-around;
  padding: 3px 5px 0;
  background: linear-gradient(rgba(19, 25, 47, 0.6), #03050c);
  /* border: 1px solid #e4e7ed; */
  border-radius: 3px;
  box-shadow: 0 0 12px rgba(#2e6099, 0.12);
}
.tools-menu-button {
  margin: 5px 5px 0;
  width: 620px;
}
.tools-menu ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.tools-menu ul li {
  width: 95px;
  font-size: 12px;
  background: url(../assets/images/mapToolBox/bnt.png);
  font-size: 14px;
  line-height: 33px;
  background-repeat: no-repeat;
  /* height: 35px; */
  text-align: center;
  /* 禁止复制 */
  -webkit-user-select: none; /* Safari */
  user-select: none; /* Standard syntax */
}

.tools-menu ul li span {
  margin-left: 6px;
  margin-top: 2px;
}
.tools-menu ul li:hover {
  color: #409eff;
  cursor: pointer;
}
</style>
