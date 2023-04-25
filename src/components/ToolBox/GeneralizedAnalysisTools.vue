<template>
  <MenuInfoPanel>
    <template #content>
      <i class="iconfont icon-tongshifenxi" @click="addVisibility()"> </i>
      <i class="iconfont icon-keshiyufenxi" @click=""> </i>
      <i class="iconfont icon-jiankongshipin" @click=""></i>
    </template>
  </MenuInfoPanel>
</template>
<script>
import MenuInfoPanel from '../MenuPanel/MenuInfoPanel';
// import glb from '../../../public/3Dmodels/警察.glb';
let visibility = null;
let mouseLeftOnceClicked = false; //是否点击了一次鼠标左键
let mouseEventDone = false; //可视域分析的鼠标事件完整结束
export default {
  name: 'GeneralizedAnalysisTools',
  components: {
    MenuInfoPanel,
  },
  methods: {
    addVisibility() {
      if (visibility === null) {
        //构造一个通视分析
        visibility = new Cesium.VisiblityAnalysis({ scene: viewer.scene });
        console.log('通视分析', visibility);
        //将通视分析添加到分析管理类中
        viewer.scene.visualAnalysisManager.add(visibility);
      }
      mouseLeftOnceClicked = false;
      mouseEventDone = false;
      //可视域分析，需要关注观察点和目标点的位置。
      //   layer.msg('鼠标左键选取，再次左键结束');
      console.log('let us start');
      this.addCesiumScreenSpaceEventHandler();
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
          //转换成cartographic
          let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          console.log(cartographic);
          let modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
            cartesian,
            new Cesium.HeadingPitchRoll()
          );

          //--------------------------计算目标点-----------------------------------
          // 观察点
          let viewPoint = cartesian;
          // 世界坐标转换为投影坐标
          let webMercatorProjection = new Cesium.WebMercatorProjection(
            viewer.scene.globe.ellipsoid
          );
          let viewPointWebMercator = webMercatorProjection.project(
            Cesium.Cartographic.fromCartesian(viewPoint)
          );
          // 计算目标点
          let toPoint = new Cesium.Cartesian3(
            viewPointWebMercator.x + 10 * Math.cos(0),
            viewPointWebMercator.y + 10 * Math.sin(0),
            0
          );
          // 投影坐标转世界坐标
          toPoint = webMercatorProjection.unproject(toPoint);
          toPoint = Cesium.Cartographic.toCartesian(toPoint.clone());
          // 世界坐标转地理坐标
          let n_cartographic = Cesium.Cartographic.fromCartesian(toPoint);
          let point = [
            Cesium.Math.toDegrees(n_cartographic.longitude),
            Cesium.Math.toDegrees(n_cartographic.latitude),
            Cesium.Math.toDegrees(n_cartographic.height),
          ];
          //   return point;
          console.log('point', point);
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
  },
};
</script>
