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
          child: [
            {
              id: 1.1,
              icon: 'icon-map-ruler',
              title: '长度测量',
              action: 'lengthMeasure',
            },
            {
              id: 1.2,
              icon: 'icon-mianjiceliang1',
              title: '面积测量',
              action: 'areaMeasure',
            },
            {
              id: 1.3,
              icon: 'icon-poduceliang',
              title: '夹角测量',
              action: 'azimuthMeasure',
            },
          ],
        },
        {
          id: 2,
          icon: 'icon-sanweikeshihua',
          title: '可视化',
          action: 'visualization',
          child: [
            {
              id: 2.1,
              icon: 'icon-iconic_lizitu',
              title: '雨雾特效',
              action: 'addRain',
            },
            {
              id: 2.2,
              icon: 'icon-jishuijiance',
              title: '积水监测',
              action: 'rainArea',
            },
            {
              id: 2.3,
              icon: 'icon-manyou',
              title: '园区漫游',
              action: 'Track',
            },
          ],
        },
        // 暂未配置好3
        {
          id: 3,
          icon: 'icon-fanguang',
          title: '光源效果',
          action: 'lightEffect',
          child: [
            {
              id: 3.1,
              icon: 'icon-iconic_lizitu',
              title: '场景光源',
              action: 'addRain',
            },
            {
              id: 3.2,
              icon: 'icon-jishuijiance',
              title: '点光源',
              action: 'rainArea',
            },
            {
              id: 3.3,
              icon: 'icon-manyou',
              title: '泛光特效',
              action: 'Track',
            },
          ],
        },
        {
          id: 4,
          icon: 'icon-moxingfenxi',
          title: '模型分析',
          action: 'modelAnalysis',
          child: [
            {
              id: 4.1,
              icon: 'icon-bimgis_jiemianfenxi',
              title: '动态刨切',
              action: 'cuttingTool',
            },
            {
              id: 4.2,
              icon: 'icon-moxingyaping',
              title: '模型压平',
              action: 'modelFlatten',
            },
            {
              id: 4.3,
              icon: 'icon-juanlian',
              title: '模型卷帘',
              action: 'rollerShutterRegion',
            },
          ],
        },
        {
          id: 5,
          icon: 'icon-shouye-moxingfenxi',
          title: '综合分析',
          action: 'generalizedAnalysis',
          child: [
            {
              id: 5.1,
              icon: 'icon-tongshifenxi',
              title: '通视分析',
              action: 'addVisibility',
            },
            {
              id: 5.2,
              icon: 'icon-keshiyufenxi',
              title: '可视域分析',
              action: 'ViewShed',
            },
            {
              id: 5.3,
              icon: 'icon-jiankongshipin',
              title: '视频投放',
              action: 'viewCctv',
            },
          ],
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
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.tools-menu ul li:hover .iconfont {
  color: #67c23a;
  cursor: pointer;
  box-shadow: 0 0 1em #67c23a inset, 0 0 0.5em #e1f3d8;
  border: 2px solid #67c23a;
}
.tools-menu ul li:hover .title {
  color: #67c23a;
  cursor: pointer;
}
</style>
