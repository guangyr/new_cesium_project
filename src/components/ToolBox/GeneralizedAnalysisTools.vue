<template>
  <!-- <div class="menu-info-panel-container"> -->
  <MenuInfoPanel>
    <template #content>
      <i class="iconfont icon-tongshifenxi" @click="addVisibility()"> </i>
      <i class="iconfont icon-keshiyufenxi" @click=""> </i>
      <i class="iconfont icon-jiankongshipin" @click="viewCctv()"></i>
    </template>
  </MenuInfoPanel>
  <!-- </div> -->
</template>
<script>
import MenuInfoPanel from '../MenuPanel/MenuInfoPanel';
// import ControlPanel from '../MenuPanel/ControlPanel';

let visibility = null;
let mouseLeftOnceClicked = false; //是否点击了一次鼠标左键
let mouseEventDone = false; //可视域分析的鼠标事件完整结束
let scenePro = null; // 场景投放
export default {
  name: 'GeneralizedAnalysisTools',
  components: {
    MenuInfoPanel,
    // ControlPanel,
  },
  data() {
    return {};
  },
  watch: {
    '$store.state.cctvDegree.upDown': function (newvalue, oldvalue) {
      console.log(newvalue, oldvalue);
      scenePro.heading = Number(newvalue);
    },
    '$store.state.cctvDegree.leftRight': function (newvalue, oldvalue) {
      console.log(newvalue, oldvalue);
      scenePro.pitch = Number(newvalue);
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
    //增加Cesium的ScreenSpaceEventHandler中的左键、移动、右键三个鼠标事件。
    addCesiumScreenSpaceEventHandler() {
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      //鼠标左击
      handler.setInputAction(function (movement) {
        //如果有可视域分析对象，那么确定其观察点
        if (visibility !== null && mouseEventDone === false) {
          //获取当前点击的Cartesian3坐标点
          let cartesian = viewer.scene.pickPosition(movement.position);
          console.log('当前点击:', cartesian);
          //转换成cartographic
          let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          console.log(cartographic);
          let modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
            cartesian,
            new Cesium.HeadingPitchRoll()
          );

          //--------------------------计算目标点-----------------------------------
          // 观察点
          // let viewPoint = cartesian;
          // 世界坐标转换为投影坐标
          // let webMercatorProjection = new Cesium.WebMercatorProjection(
          //   viewer.scene.globe.ellipsoid
          // );
          // let viewPointWebMercator = webMercatorProjection.project(
          //   Cesium.Cartographic.fromCartesian(viewPoint)
          // );
          // 计算目标点
          // let toPoint = new Cesium.Cartesian3(
          //   viewPointWebMercator.x + 10 * Math.cos(0),
          //   viewPointWebMercator.y + 10 * Math.sin(0),
          //   0
          // );
          // 投影坐标转世界坐标
          // toPoint = webMercatorProjection.unproject(toPoint);
          // toPoint = Cesium.Cartographic.toCartesian(toPoint.clone());
          // 世界坐标转地理坐标
          // let n_cartographic = Cesium.Cartographic.fromCartesian(toPoint);
          // let point = [
          //   Cesium.Math.toDegrees(n_cartographic.longitude),
          //   Cesium.Math.toDegrees(n_cartographic.latitude),
          //   Cesium.Math.toDegrees(n_cartographic.height),
          // ];
          //   return point;
          // console.log('point', point);
          // ---------------------------------------------------------------

          //再反转成Cartesian3坐标
          if (mouseLeftOnceClicked === false) {
            //如果是观察点，那么加2米方便展示
            cartographic.height += 2;
          }
          cartesian = Cesium.Cartographic.toCartesian(cartographic);
          if (cartesian !== undefined) {
            if (mouseLeftOnceClicked) {
              visibility.targetPosition = cartesian;
              mouseEventDone = true;
              mouseLeftOnceClicked = false;
            } else {
              visibility.viewPosition = cartesian;
              mouseLeftOnceClicked = true;
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    // computed: {},
    // 监控
    viewCctv() {
      viewer.scene.visualAnalysisManager.removeAll();
      // console.log(
      //   ' this.$store.state.cctvDegree',
      //   this.$store.state.cctvDegree
      // );
      // 观察点
      // let targetPosition = new Cesium.Cartesian3(
      //   -2273141.773190065,
      //   5010775.7843235945,
      //   3215069.2283928613
      // );
      let targetPosition = Cesium.Cartesian3.fromDegrees(
        114.40116999085951,
        30.465962561272967,
        60
      );
      // 目标点计算
      let targetGeo = Cesium.Cartographic.fromCartesian(targetPosition);
      targetGeo.height = 45;
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
      scenePro.textureSource = 'http://localhost:8021/人.mp4';
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
<style scoped></style>
