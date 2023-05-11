<template>
  <MenuInfoPanel>
    <template #content>
      <i class="iconfont icon-bimgis_jiemianfenxi tooltip" @click="cutting()">
        <TipTool>动态剖切</TipTool>
      </i>
      <i class="iconfont icon-moxingyaping tooltip" @click="addDrawElement()">
        <TipTool>模型压平</TipTool>
      </i>
      <i class="iconfont icon-juanlian tooltip" @click="rollerShutterRegion()">
        <TipTool>卷帘分析</TipTool></i
      >
    </template>
  </MenuInfoPanel>
</template>
<script>
import MenuInfoPanel from '../MenuPanel/MenuInfoPanel';
import TipTool from '../MenuPanel/TipTool';
let polygon = null;
let drawElement = null;
let positions = null;
let cutTool = null;
let layerList = [];
let cuttingLayer = null;
export default {
  name: 'ModelAnalysisTools',
  components: { MenuInfoPanel, TipTool },
  data() {
    return {
      active: false,
    };
  },
  beforeDestroy() {
    viewer.scene.primitives.remove(polygon);
    tileset.removeModelFlatten();
    // viewer.scene.globe.depthTestAgainstTerrain = true;
  },
  methods: {
    // 动态刨切
    cutting() {
      this.addModels(), this.addCuttingTool();
      viewer.scene.globe.depthTestAgainstTerrain = false;
    },
    addCuttingPlane() {
      //移除之前的切面
      // removeCuttingPlane();
      //简单切面时，展示控制条
      cutTool.createModelCuttingPlane(new Cesium.Cartesian3(1.0, 0.0, 0.0), {
        //裁剪面的初始距离
        distance: 0,
        //辅助面宽度缩放比例
        scaleWidth: 2.5,
        //辅助面高度缩放比例
        scaleHeight: 2.5,
        //裁剪方向，false：原方向，true：反向
        unionClippingRegions: false,
        //配置辅助面的颜色，以及透明度
        color: new Cesium.Color(1, 1, 1, 0.2),
        //是否显示辅助面
        showCuttingPlane: true,
      });
    },
    // 添加刨切模型
    addModels() {
      // viewer.scene.layers.removeAllLayers();
      let url =
        'http://webclient.smaryun.com:8200/3DData/ModelCache/M3D//1.0/钻孔分层点_Sur_000_Ent/钻孔分层点_Sur_000_Ent.mcj';
      cuttingLayer = viewer.scene.layers.appendM3DLayer(url, {
        duration: 0,
        maximumScreenSpaceError: 16,
        loaded: function (layer) {
          layerList.push(layer);
        },
      });
      let url2 =
        'http://webclient.smaryun.com:8200/3DData/ModelCache/M3D//1.0/钻孔_2_钻孔模型s/钻孔_2_钻孔模型s.mcj';
      viewer.scene.layers.appendM3DLayer(url2, {
        duration: 0,
        maximumScreenSpaceError: 16,
        loaded: function (layer) {
          layerList.push(layer);
        },
      });
    },
    // 添加剖切工具
    addCuttingTool() {
      if (layerList.length === 2) {
        //代表模型都添加完了
        cutTool = new Cesium.CuttingTool(viewer, layerList, {
          onErrorCallback: function (type, msg) {
            console.log('错误信息：' + type + ':' + msg);
          },
        });
        this.addCuttingPlane();
        drawElement = new Cesium.DrawElement(viewer);
      } else {
        //如果没有添加完，那么继续等待
        setTimeout(() => {
          this.addCuttingTool();
        }, 500);
      }
    },
    // 模型压平
    addDrawElement() {
      this.changeModel();
      if (drawElement === null) {
        drawElement = new Cesium.DrawElement(viewer);
      }
      if (tileset) {
        tileset.removeModelFlatten();
        viewer.scene.primitives.remove(polygon);
        polygon = null;
      }
      //利用DrawElement接口，获取一个矩形的东西南北坐标
      drawElement.startDrawingPolygon({
        callback: function (result) {
          //得到绘制矩形接口返回的范围extent，并计算出东南西北点坐标
          positions = result.positions;
          //为了演示，增加一个绘制区域
          if (polygon) {
            viewer.scene.primitives.remove(polygon);
            polygon = null;
          }
          polygon = new Cesium.DrawElement.PolygonPrimitive({
            positions: positions,
            material: Cesium.Material.fromType('Color', {
              color: new Cesium.Color(249 / 255, 177 / 255, 27 / 255, 0.5),
            }),
          });
          viewer.scene.primitives.add(polygon);
          // tileset=  viewer.scene.layers._m3dLayersMap._obj[0]
          // tileset就是这个, 不过已经在初始化的时候绑定到window上了,这里就用window上的
          window.tileset.modelFlatten(positions, 10);
          //停止绘制，解除鼠标行为
          drawElement.stopDrawing();
        },
      });
    },
    // 卷帘分析
    rollerShutterRegion() {
      this.changeModel();
      let slider = document.getElementById('juanlian-analysis');
      if (!this.active) {
        this.active = !this.active;
        // 点击时显示卷帘控件
        slider.style.display = 'block';
        let handler = new Cesium.ScreenSpaceEventHandler(slider);
        window.tileset.rollerShutterRegion = new Cesium.Cartesian4(
          // slider.offsetLeft / slider.parentElement.offsetWidth,
          0.5,
          0.0,
          1.0,
          1.0
        );
        // console.log('1.初始位置:', window.tileset.rollerShutterRegion);
        let moveActive = false;
        function move(movement) {
          if (!moveActive) {
            return;
          }

          let relativeOffset = movement.endPosition.x;

          // 计算比例
          const splitPosition =
            (slider.offsetLeft + relativeOffset) /
            slider.parentElement.offsetWidth;
          // 设置滑动条位置
          slider.style.left = `${100.0 * splitPosition}%`;

          // 修改m3d图层卷帘范围
          window.tileset.rollerShutterRegion = new Cesium.Cartesian4(
            splitPosition,
            0.0,
            1.0,
            1.0
          );
          // console.log('2.实时位置:', window.tileset.rollerShutterRegion);
        }
        // 监听鼠标按下事件，开始拖动滑动条
        handler.setInputAction(function () {
          // console.log('mouse down');
          moveActive = true;
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

        // 监听鼠标移动事件，根据滑动条位置更新卷帘范围
        handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        // 监听鼠标弹起事件，结束拖动滑动条
        handler.setInputAction(function () {
          moveActive = false;
        }, Cesium.ScreenSpaceEventType.LEFT_UP);
      } else {
        // 取消分析, 清除卷帘结果
        this.active = !this.active;
        // 隐藏卷帘slider
        slider.style.display = '';
        // 将slider滑块的位置重新放置中间
        slider.style.left = '50%';
        // 将卷帘位置设置为0
        viewer.scene.imagerySplitPosition = window.tileset.rollerShutterRegion =
          new Cesium.Cartesian4(0.0, 0.0, 1.0, 1.0);
      }
    },
    // 切换功能时切换模型
    changeModel() {
      // viewer.scene.layers.removeAllLayers();
      viewer.scene.globe.depthTestAgainstTerrain = true;
      // viewer.scene.layers.appendM3DLayer(
      //   'http://webclient.smaryun.com:8200/3DData/ModelCache/M3D//1.0/ZondyFaceModels/ZondyFaceModels.mcj'
      // );

      // 回到默认相机视角
      viewer.camera.flyTo({
        destination: new Cesium.Cartesian3.fromDegrees(
          114.40407071516431,
          30.464447653829566,
          103.35218625745591
        ),
        orientation: {
          heading: Cesium.Math.toRadians(317.3107228765656), // 方向角
          pitch: Cesium.Math.toRadians(-8.116118823135237), // 俯仰角
          roll: Cesium.Math.toRadians(0.0), // 翻滚角
        },
      });
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
