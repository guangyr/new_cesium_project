<template>
  <div id="globel-container"></div>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'CesiumInit',
  mounted() {
    this.init();
  },

  methods: {
    init() {
      //构造三维视图类（视图容器div的id，三维视图设置参数）
      const viewer = new Cesium.Viewer('globel-container', {
        orderIndependentTranslucency: false,
        contextOptions: {
          webgl: {
            alpha: true,
          },
        },
      });
      // console.log('CesiumInit viewer: ', viewer);
      window.viewer = viewer;
      // console.log('CesiumInit window.viewer: ', window.viewer);
      // 不显示鼠标信息
      // viewer.hidePosition();
      // viewer.showPosition();
      //打开深度检测
      viewer.scene.globe.depthTestAgainstTerrain = true;
      // viewer绑在window对象上以成为全局变量
      // 是否显示天空盒，即地球背景的星空
      viewer.scene.skyBox.show = false;
      // 宇宙背景色
      viewer.scene.sun.show = false;
      viewer.scene.moon.show = false;
      viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0);
      // 结合css隐藏logo
      viewer._cesiumWidget._creditContainer.style.display = 'none';
      //飞到指定视角
      viewer.camera.setView({
        destination: new Cesium.Cartesian3.fromDegrees(
          114.40407071516431,
          30.464447653829566,
          103.35218625745591
        ),
        orientation: {
          heading: Cesium.Math.toRadians(317.3107228765656), // 方向角
          pitch: Cesium.Math.toRadians(-11.116118823135237), // 俯仰角
          roll: Cesium.Math.toRadians(0.0), // 翻滚角
        },
      });
      // 相机缩放的最远距离（米），默认为Number.POSITIVE_INFINITY
      viewer.scene.screenSpaceCameraController.maximumZoomDistance = 19000000;
      viewer.scene.layers.appendM3DLayer(
        'http://webclient.smaryun.com:8200/3DData/ModelCache/M3D//1.0/ZondyFaceModels/ZondyFaceModels.mcj',
        {
          loaded: function (layer) {
            // 模型压平需要使用到
            window.tileset = layer;
          },
          debugShowBoundingVolume: true,
        }
      );
      // let url =
      //   'http://webclient.smaryun.com:8089/igs/rest/services/M3Dv2/zondyOSGB/M3dServer';

      // viewer.scene.layers.appendM3DLayer(url, {
      //   // 是否显示3d tileset模型
      //   show: true,
      //   // 根瓦片的4×4变换矩阵
      //   modelMatrix: Cesium.Matrix4.IDENTITY,
      //   //是否投射或者吸收光源的阴影。默认 ENABLED（接收和投射阴影)，DISABLED（不投射和接收阴影），CAST_ONLY（只接收阴影），RECEIVE_ONLY (只接收阴影）
      //   shadows: Cesium.ShadowMode.ENABLED,
      //   // 是否自动定位
      //   autoReset: true,
      //   // 跳转时间，以秒为单位
      //   duration: 1,
      //   // 回调函数，加载完后返回加载的m3d图层
      //   loaded: function (layer) {
      //     console.log(layer);
      //   },
      //   // 异常回调函数
      //   errorCallback: function (error) {
      //     console.log(error);
      //   },
      //   orientation: undefined, //镜头朝向
      //   // M3D数据密码
      //   password: undefined,
      //   // 是否使用前端缓存加载模型
      //   useIDB: false,
      //   //最大屏幕空间误差，用于控制模型显示细节，值较大将会渲染更少的贴图，进而可以提高性能，而较低的值将提高视觉质量
      //   maximumScreenSpaceError: 16,
      //   //tileset可以使用的最大内存(Mb)
      //   maximumMemoryUsage: 512,
      //   //是否使用子项包围盒的并集来剔除图块
      //   cullWithChildrenBounds: true,
      //   //是否优先加载叶子节点
      //   preferLeaves: false,
      //   //动态屏幕空间误差，是否减少离相机较远的瓦片的屏幕空间误差
      //   dynamicScreenSpaceError: false,
      //   //用于调节动态屏幕空间误差的参数
      //   dynamicScreenSpaceErrorDensity: 0.00278,
      //   //用于增加计算出来的动态屏幕空间误差的参数
      //   dynamicScreenSpaceErrorFactor: 4.0,
      //   //可选选项，是否在遍历时候跳过详情
      //   skipLevelOfDetail: false,
      //   //如果skipLevelOfDetail为true，则指在跳过细节级别之前必须达到的屏幕空间错误。
      //   baseScreenSpaceError: 1024,
      //   //当skipLevelOfDetail为时true，指定义要跳过的最小屏幕空间错误的乘数。与skipLevels一起使用以确定要加载的图块。
      //   skipScreenSpaceErrorFactor: 16,
      //   //当skipLevelOfDetail为时true，此常数定义加载图块时要跳过的最小级别数。为0时，不会跳过任何级别。与一起使用skipScreenSpaceErrorFactor以确定要加载的图块。
      //   skipLevels: 1,
      //   //如果skipLevelOfDetail是true，只有满足最大屏幕空间误差的瓦片会被下载。跳过因子将被忽略，仅加载所需的图块。
      //   immediatelyLoadDesiredLevelOfDetail: false,
      //   //如果skipLevelOfDetail是true，该参数用于确定在遍历期间是否下载可见瓦片的同级瓦片。
      //   loadSiblings: false,
      //   //是否开启背面剔除。false的时候关闭，true的时候由glTF的doubleSided属性决定
      //   backFaceCulling: true,
      //   //仅用于调试。确定是否仅应使用最后一帧中的图块进行渲染
      //   debugFreezeFrame: false,
      //   //仅用于调试。如果为true，则为每个图块分配随机颜色。
      //   debugColorizeTiles: false,
      //   //仅用于调试。如果为true，则将每个图块的内容渲染为线框。
      //   debugWireframe: false,
      //   //仅用于调试。为true时，渲染每个图块的包围盒
      //   debugShowBoundingVolume: false,
      //   //仅用于调试。为true时，渲染每个图块内容的包围盒。
      //   debugShowContentBoundingVolume: false,
      //   //仅用于调试。如果为true，则为每个图块渲染查看器的请求量。
      //   debugShowViewerRequestVolume: false,
      //   //仅用于调试。为true时，绘制标签以指示每个图块的几何误差。
      //   debugShowGeometricError: false,
      //   //仅用于调试。如果为true，则绘制标签以指示每个图块的命令，点，三角形和特征的数量。
      //   debugShowRenderingStatistics: false,
      //   //仅用于调试。为true时，绘制标签以指示每个图块使用的纹理和几何内存（以兆字节为单位）。
      //   debugShowMemoryUsage: false,
      //   //仅用于调试。为true时，绘制标签以指示每个图块的url。
      //   debugShowUrl: false,
      // });
    },
  },
};
</script>

<style>
/* .globel-container {
  background-color: rgba(0, 0, 0, 0);
} */
/*
.cesium-viewer-cesiumWidgetContainer {
  height: 100vh;
} */
#globel-container .cesium-widget-credits {
  display: none !important;
  visibility: hide !important;
}
#globel-container .cesium-credit-lightbox {
  display: none !important;
  visibility: hide !important;
}
</style>
