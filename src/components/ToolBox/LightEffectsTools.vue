<template>
  <!-- 展开的面板中添加功能 -->
  <MenuInfoPanel>
    <!-- el-card 功能图标 -->
    <template #content>
      <i
        class="iconfont icon-dianguangyuan-01 tooltip"
        @click="pointLightEffect()"
      >
        <TipTool>点光源</TipTool>
      </i>
      <i class="iconfont icon-fanguang tooltip" @click="spotLightEffect()">
        <TipTool>聚光源</TipTool>
      </i>
      <i
        class="iconfont icon-36guangyuangaodu tooltip"
        @click="directionLightEffect()"
      >
        <TipTool>方向光</TipTool></i
      >
    </template>
  </MenuInfoPanel>
</template>

<script>
let pointLight = null;
let spotLight = null;
let parallelLight = null;
import MenuInfoPanel from '../MenuPanel/MenuInfoPanel';
import TipTool from '../MenuPanel/TipTool';

export default {
  name: 'LightEffectTools',
  data() {
    return {};
  },
  components: {
    MenuInfoPanel,
    TipTool,
  },
  mounted() {
    this.addM3D();
  },
  beforeDestroy() {
    viewer.scene.layers.appendM3DLayer(
      'http://webclient.smaryun.com:8200/3DData/ModelCache/M3D//1.0/ZondyFaceModels/ZondyFaceModels.mcj'
    );
  },
  methods: {
    // 添加点光源效果
    pointLightEffect() {
      this.shiftfunction('pointLightEffect');
      this.removePointLightEffect();
      let that = this;
      // 监听鼠标点击事件添加点光源
      viewer.screenSpaceEventHandler.setInputAction(function (movement) {
        // 在模型上拾取一个点并偏移,保证点光源距模型一定距离
        let cartesian = viewer.scene.pickPosition(movement.position);
        // console.log(cartesian);
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        cartesian = Cesium.Cartesian3.fromDegrees(
          Cesium.Math.toDegrees(cartographic.longitude),
          Cesium.Math.toDegrees(cartographic.latitude),
          cartographic.height + 30
        );
        // 添加光源
        pointLight = new Cesium.PointLight({
          position: cartesian,
          intensity: 6,
          distance: 55,
          decay: 1.0,
          color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
        });
        viewer.scene.addLight(pointLight);
        // that.addLightModel(cartesian);
        // 添加点光源模型，方便交互移动位置
        // addLightModel(cartesian);
        // 每一帧根据点光源模型位置更新点光源位置
        // viewer.scene.preUpdate.addEventListener(function () {
        //   var newPos = Cesium.Matrix4.getTranslation(
        //     lightModel.modelMatrix,
        //     new Cesium.Cartesian3()
        //   );
        //   pointLight.position = newPos;
        // });

        // 移除鼠标点击事件添加点光源
        viewer.screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_CLICK
        );
        // 移除鼠标点击事件添加点光源
        viewer.screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_CLICK
        );
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      // 右键移除光源效果
      viewer.screenSpaceEventHandler.setInputAction(function (movement) {
        that.removePointLightEffect();
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },

    // 移除点光源效果
    removePointLightEffect() {
      viewer.scene.removeLight(pointLight);
    },

    // 添加聚光源效果
    spotLightEffect() {
      this.shiftfunction('spotLightEffect');
      // 移除上一次添加的光源
      this.removespotLightEffect();
      let that = this;
      // 监听鼠标点击事件添加光源
      viewer.screenSpaceEventHandler.setInputAction(function (movement) {
        // 在模型上拾取一个点并偏移,保证光源距模型一定距离
        var end = viewer.scene.pickPosition(movement.position);
        var cartographic = Cesium.Cartographic.fromCartesian(end);
        var start = Cesium.Cartesian3.fromDegrees(
          Cesium.Math.toDegrees(cartographic.longitude),
          Cesium.Math.toDegrees(cartographic.latitude),
          cartographic.height + 100
        );

        spotLight = new Cesium.SpotLight({
          // 光源位置
          position: start,
          // 光源覆盖距离
          distance: 150,
          // 聚光灯方向
          direction: Cesium.Cartesian3.subtract(
            end,
            start,
            new Cesium.Cartesian3()
          ),
          // 聚光灯颜色
          color: new Cesium.Color(1.0, 1.0, 1.0, 0.0),
          // 聚光灯强度
          intensity: 5.0,
          // 光线散射角度
          angle: Math.PI / 12,
          // 半影衰减百分比
          penumbra: 0.5,
        });

        viewer.scene.addLight(spotLight);

        // 移除鼠标点击事件添加光源
        viewer.screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_CLICK
        );
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      // 右键移除光源效果
      viewer.screenSpaceEventHandler.setInputAction(function (movement) {
        that.removespotLightEffect();
        console.log('移除聚光源效果');
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    // 移除聚光源效果
    removespotLightEffect() {
      // 移除光源
      viewer.scene.removeLight(spotLight);
    },
    // 添加方向光效果
    directionLightEffect() {
      this.shiftfunction('directionLightEffect');
      this.removedirectionLightEffect();
      let that = this;
      // 构造绘制工具
      let drawElement = new Cesium.DrawElement(viewer);
      drawElement.startDrawingPolyline({
        callback: function (result) {
          var positions = result.positions;

          if (positions.length !== 2) {
            console.error('输入点个数不等于2!');
            return;
          }

          // 移除上一次添加的光源
          viewer.scene.removeLight(parallelLight);
          // this.removedirectionLightEffect();
          // 添加光源
          parallelLight = new Cesium.ParallelLight({
            // 根据用户输入线段计算方向光方向
            direction: Cesium.Cartesian3.subtract(
              positions[1],
              positions[0],
              new Cesium.Cartesian3()
            ),
            // 光源颜色
            color: new Cesium.Color(1.0, 1.0, 1.0, 0.0), //new Cesium.Color.fromRandom(),
            // 光源强度
            intensity: 0.5,
          });

          viewer.scene.addLight(parallelLight);

          drawElement.stopDrawing();
        },
      });
      // 右键移除光源效果
      viewer.screenSpaceEventHandler.setInputAction(function (movement) {
        that.removedirectionLightEffect();
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    // 移除方向光效果
    removedirectionLightEffect() {
      viewer.scene.removeLight(parallelLight);
    },
    addM3D() {
      let url =
        'http://webclient.smaryun.com:8089/igs/rest/services/Scene/高级住所模型/SceneServer';
      viewer.scene.layers.appendSceneLayer(url, {
        duration: 2,
        autoReset: true,
      });
    },
    // 功能切换时清除上一个功能的效果
    shiftfunction(action) {
      if (action !== 'pointLightEffect') {
        this.removePointLightEffect();
        this.removedirectionLightEffect();
      } else if (action !== 'spotLightEffect') {
        this.removespotLightEffect();
      } else if (action !== 'directionLightEffect') {
        this.removedirectionLightEffect();
      }
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
