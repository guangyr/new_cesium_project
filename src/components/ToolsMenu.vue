<template>
  <div class="tools-menu">
    <ul>
      <li v-for="item in menu_list" :key="item.id" @click="shiftPanel(item)">
        <span :class="item.icon" class="iconfont"></span>
        <span class="title">{{ item.title }}</span>
      </li>
    </ul>
    <div class="tools-menu-button"></div>
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
          action: 'generalizedAnalysis',
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
  position: relative;
  padding: 3px 5px 0;
  width: 500px;
}
/* .tools-menu-button {
  position: absolute;
  bottom: 0px;
  left: -10%;
  width: 600px;
  height: 30px;
  background: rgb(78, 102, 181);
  background: linear-gradient(
    360deg,
    rgba(78, 102, 181, 0.9557072829131653) 4%,
    rgba(72, 129, 195, 0.8240546218487395) 47%,
    rgba(59, 184, 222, 0.5803571428571428) 78%
  );
  border-radius: 100px 100px 0 0;
  transform: perspective(20px) rotateX(6deg) rotateY(0deg) translateZ(0);
  z-index: -1;
} */
.tools-menu ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.tools-menu ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 小圆 */
.tools-menu ul li .iconfont {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  width: 40px;
  height: 40px;
  /* border: 1px solid #00bcff; */
  border: 1px solid #35dafb;
  border-radius: 50%;
  box-shadow: 0 0 0.8em #56e0fc inset, 0 0 0.3em #7ce7fd;
  box-sizing: border-box;
}

.tools-menu ul li .title {
  /* position: absolute; */
  /* bottom: -30px; */
  margin-top: 2px;
  font-size: 12px;
  color: #f2f2f2;
}
.tools-menu ul li:hover {
  color: #409eff;
  cursor: pointer;
}
</style>
