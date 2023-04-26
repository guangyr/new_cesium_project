<template>
  <MenuInfoPanel>
    <template #content>
      <i class="iconfont icon-bimgis_jiemianfenxi" @click="lengthMeasure()">
      </i>
      <i class="iconfont icon-moxingyaping" @click="addDrawElement()"> </i>
      <i class="iconfont icon-juanlian" @click="rollerShutterRegion()"></i>
    </template>
  </MenuInfoPanel>
</template>
<script>
import MenuInfoPanel from '../MenuPanel/MenuInfoPanel';
let polygon = null;
let drawElement = null;
// let tileset = null;
let positions = null;
export default {
  name: 'ModelAnalysisTools',
  components: { MenuInfoPanel },
  methods: {
    addDrawPolygon(positions) {
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
    },
    addDrawElement() {
      if (drawElement === null) {
        drawElement = new Cesium.DrawElement(viewer);
        console.log(drawElement);
      }
      if (tileset) {
        tileset.removeModelFlatten();
        removeDrawPolygon();
      }
      // 移除polygon
      viewer.scene.primitives.remove(polygon);
      polygon = null;
      //利用DrawElement接口，获取一个矩形的东西南北坐标
      drawElement.startDrawingPolygon({
        callback: function (result) {
          //得到绘制矩形接口返回的范围extent，并计算出东南西北点坐标
          positions = result.positions;
          //为了演示，增加一个绘制区域
          if (polygon) {
            removeDrawPolygon();
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
    rollerShutterRegion() {
      let slider = document.getElementById('juanlian-analysis');
      let handler = new Cesium.ScreenSpaceEventHandler(slider);
      window.tileset.rollerShutterRegion = new Cesium.Cartesian4(
        slider.offsetLeft / slider.parentElement.offsetWidth,
        0.0,
        1.0,
        1.0
      );

      let moveActive = false;
      function move(movement) {
        if (!moveActive) {
          return;
        }
        const relativeOffset = movement.endPosition.x;
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
      }
      // 监听鼠标按下事件，开始拖动滑动条
      handler.setInputAction(function () {
        console.log('mouse down');
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

      // 监听鼠标移动事件，根据滑动条位置更新卷帘范围
      handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // 监听鼠标弹起事件，结束拖动滑动条
      handler.setInputAction(function () {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
    },
  },
};
</script>
