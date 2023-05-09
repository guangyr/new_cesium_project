<template>
  <!-- <div class="menu-info-panel-container"> -->
  <MenuInfoPanel>
    <template #content>
      <i class="iconfont icon-tongshifenxi tooltip" @click="addVisibility()">
        <TipTool>通视分析</TipTool>
      </i>
      <i class="iconfont icon-keshiyufenxi tooltip" @click="addViewShed()">
        <TipTool>可视域分析</TipTool>
      </i>
      <i class="iconfont icon-jiankongshipin tooltip" @click="viewCctv()">
        <TipTool>监控视频</TipTool>
      </i>
    </template>
  </MenuInfoPanel>
  <!-- </div> -->
</template>
<script>
import MenuInfoPanel from '../MenuPanel/MenuInfoPanel';
// import ControlPanel from '../MenuPanel/ControlPanel';
import TipTool from '../MenuPanel/TipTool';
let visibility = null;
let viewShed3d = null;
let handler = null;
let mouseLeftOnceClicked = false; //是否点击了一次鼠标左键
let mouseEventDone = false; //可视域分析的鼠标事件完整结束
let scenePro = null; // 场景投放
export default {
  name: 'GeneralizedAnalysisTools',
  components: {
    MenuInfoPanel,
    TipTool,
  },
  data() {
    return {};
  },
  watch: {
    // 监听监控俯仰角el-slider变化
    '$store.state.cctvDegree.upDown': function (newvalue, oldvalue) {
      console.log(newvalue, oldvalue);
      scenePro.heading = Number(newvalue);
    },
    '$store.state.cctvDegree.leftRight': function (newvalue, oldvalue) {
      console.log(newvalue, oldvalue);
      scenePro.pitch = Number(newvalue);
    },
    // 监听监控激活状况变化
    '$store.state.cctvList': {
      handler(activeStatute) {
        activeStatute.forEach((item) => {
          if (item.active === true) {
            console.log('监控投影 状态变化');
            console.log(item);
            this.viewCctv(item);
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    addVisibility() {
      if (visibility === null) {
        //构造一个通视分析
        visibility = new Cesium.VisiblityAnalysis({ scene: viewer.scene });
        console.log('通视分析', visibility);
        //将通视分析添加到分析管理类中
        viewer.scene.visualAnalysisManager.add(visibility);
        mouseLeftOnceClicked = false;
        mouseEventDone = false;
        //可视域分析，需要关注观察点和目标点的位置。
        //   layer.msg('鼠标左键选取，再次左键结束');
        console.log('let us start');
        this.addCesiumScreenSpaceEventHandler();
      } else {
        viewer.scene.visualAnalysisManager.remove(visibility);
        visibility.destroy();
        visibility = null;
        // mouseLeftOnceClicked = false;
        // mouseEventDone = false;
      }
    },
    //添加一个可视域分析(鼠标点选)
    addViewShed() {
      //由于可视域分析接口目前只支持一个展示，因此先删除已有的
      //如果存在可视域分析，那么通过分析管理类移除
      if (viewShed3d) {
        viewer.scene.visualAnalysisManager.remove(viewShed3d);
        viewShed3d = null;
      }
      mouseLeftOnceClicked = false;
      mouseEventDone = false;
      //如果有对应的handler,移除对应的Cesium鼠标事件
      if (handler) {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }
      //构造一个可视域分析
      viewShed3d = new Cesium.ViewshedAnalysis();
      //将可视域分析添加到分析管理类中
      viewer.scene.visualAnalysisManager.add(viewShed3d);
      //可视域分析，需要关注观察点和目标点的位置。
      // 这里我们采用鼠标左键标记观察点，鼠标移动和右键标记终止点的方式来展示
      this.addCesiumScreenSpaceEventHandler();
      // layer.msg('鼠标左键选取，再次左键结束');
    },
    //增加Cesium的ScreenSpaceEventHandler中的左键、移动、右键三个鼠标事件。
    addCesiumScreenSpaceEventHandler() {
      // handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      //鼠标左击

      //如果有可视域分析对象，那么确定其观察点
      if (viewShed3d !== null) {
        //获取当前点击的Cartesian3坐标点
        // let cartesian = viewer.scene.pickPosition(movement.position);
        // //转换成cartographic
        // let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        //将height抬高2米，方便展示
        // if (mouseLeftOnceClicked === false) {
        //   cartographic.height += 2.0;
        // }
        //再反转成Cartesian3坐标
        // cartesian = Cesium.Cartographic.toCartesian(cartographic);
        console.log(
          'this.$store.state.cctvList[0].position',
          this.$store.state.cctvList[0].position.lon,
          this.$store.state.cctvList[0].position.lat,
          this.$store.state.cctvList[0].position.height
        );
        viewShed3d.targetPosition = Cesium.Cartesian3.fromDegrees(
          // this.$store.state.cctvList[0].position.lon,
          // this.$store.state.cctvList[0].position.lat,
          // this.$store.state.cctvList[0].position.height
          114.4008537688433,
          30.468181577549643,
          70
        );
        // viewShed3d.targetPosition = cartesian;

        // if (cartesian !== undefined) {
        //   if (mouseLeftOnceClicked) {
        //     viewShed3d.targetPosition = cartesian;
        //     mouseEventDone = true;
        //     mouseLeftOnceClicked = false;
        //   } else {
        //     viewShed3d.viewPosition = cartesian;
        //     mouseLeftOnceClicked = true;
        //   }
        // }
      }

      //鼠标移动
      // handler.setInputAction(function (movement) {
      //   if (mouseLeftOnceClicked === true && mouseEventDone === false) {
      //     let cartesian = viewer.scene.pickPosition(movement.endPosition);
      //     if (cartesian !== undefined) {
      //       viewShed3d.targetPosition = cartesian;
      //     }
      //   }
      // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },
    viewCctv(item) {
      console.log(item);
      if (item === undefined) {
        this.$store.commit('ChangeCctvstatu', 1);
        console.log(item);
      }
      viewer.scene.visualAnalysisManager.removeAll();
      let targetPosition = Cesium.Cartesian3.fromDegrees(
        item.position.lon,
        item.position.lat
        // item.position.height
      );
      // 目标点计算
      let targetGeo = Cesium.Cartographic.fromCartesian(targetPosition);
      console.log('item', item.position.height);
      targetGeo.height = item.position.height;
      let viewPosition = Cesium.Cartesian3.fromRadians(
        targetGeo.longitude,
        targetGeo.latitude,
        targetGeo.height
      );
      // 新建场景投放对象
      scenePro = new Cesium.SceneProjector(
        // 场景投放的内容，颜色: COLOR、图片: IMAGE、MP4视频: VIDEO、HLS视频: HLS
        Cesium.SceneProjectorType.VIDEO
      );
      // 是否显示视锥的锥体线
      scenePro.showLine = true;
      // 将场景投放添加到地球上显示
      viewer.scene.visualAnalysisManager.add(scenePro);
      // 投影内容
      scenePro.textureSource = item.url;
      // 设置观察点
      scenePro.viewPosition = viewPosition;
      // 设置目标点
      scenePro.targetPosition = targetPosition;
      // 方位角
      scenePro.heading = this.$store.state.cctvDegree.upDown;
      // 俯仰角
      scenePro.pitch = this.$store.state.cctvDegree.leftRight;
      // 翻滚角
      scenePro.roll = 0;
      // 水平广角
      scenePro.horizontAngle = 45;
      // 竖直广角
      scenePro.verticalAngle = 45;
    },
  },
};
</script>
<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}
</style>
