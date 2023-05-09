<template>
  <!-- 展开的面板中添加功能 -->
  <MenuInfoPanel>
    <!-- el-card 功能图标 -->
    <template #content>
      <i class="iconfont icon-iconic_lizitu tooltip" @click="addRain()">
        <TipTool>雨雾效果</TipTool>
      </i>
      <i class="iconfont icon-jishuijiance tooltip" @click="rainArea()">
        <TipTool>积水模拟</TipTool>
      </i>
      <i class="iconfont icon-manyou tooltip" @click="drawTrackLine()">
        <TipTool>路径漫游</TipTool></i
      >
    </template>
  </MenuInfoPanel>
</template>

<script>
let primitives = null;
let drawElement = null;
let graphicsLayer = null;
let getGraphic = null;
let weather = null;
import MenuInfoPanel from '../MenuPanel/MenuInfoPanel';
import TipTool from '../MenuPanel/TipTool';
// import { addGraphicLayer, startDrawing } from '../../utils/drawTrackLine.js';

export default {
  name: 'VisualizationTools',
  data() {
    return {
      isRain: false,
    };
  },
  components: {
    MenuInfoPanel,
    TipTool,
  },
  mounted() {
    console.log(this.isRain);
  },
  methods: {
    addRain() {
      this.isRain = !this.isRain;
      let optionsRain = {
        alpha: 0.3, //透明度[0,1]
        angle: 0, //倾斜角度[-30,30],sin(angle)
        speed: 15, //雨丝速度[0,∞],推荐使用[0-20]
        rainLength: 0.0, //附加长度，雨丝本身具有一定长度
        factor: 0.1, //混合度[0,1]
      };

      //添加雨的参数
      if (this.isRain) {
        console.log('add rain', this.isRain);
        weather = new Cesium.WeatherEffect(viewer);
        weather.removeRain();
        weather.addRain(optionsRain);
      } else {
        weather.removeRain();
        console.log('关闭下雨', this.isRain);
      }
    },
    //绘制积雨区域
    rainArea() {
      console.log('积雨');
      //启用场景的光源
      viewer.scene.globe.enableLighting = true;
      // 设置太阳时间
      const utc = Cesium.JulianDate.fromDate(new Date('2021/05/04 12:00:00')); //UTC
      viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(
        utc,
        8,
        new Cesium.JulianDate()
      ); //北京时间=UTC+8=GMT+8
      // 绘制前先清除之前的效果
      this.clearRainArea();
      //绘制工具
      drawElement = new Cesium.DrawElement(viewer);
      drawElement.startDrawingPolygon({
        //绘制过程中区域的颜色
        color: new Cesium.Color(0.5, 0.8, 0.3),
        //绘制完成后的回调
        callback: function (result) {
          //覆盖地形显示
          const polygon = new Cesium.GroundPrimitive({
            //要渲染的几何实例
            geometryInstances: new Cesium.GeometryInstance({
              geometry: new Cesium.PolygonGeometry({
                //根据绘制的点集合，生成可包含孔的多边形层次结构
                polygonHierarchy: new Cesium.PolygonHierarchy(result.positions),
                vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
              }),
            }),
            //渲染外观
            appearance: new Cesium.EllipsoidSurfaceAppearance({
              //材质
              material: new Cesium.Material({
                fabric: {
                  //材质类型
                  type: 'Water',
                  uniforms: {
                    //水的底色
                    baseWaterColor: new Cesium.Color(0.2, 0.3, 0.6, 0.7),
                  },
                },
              }),
            }),
            //3D瓦片
            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
          });
          //效果添加到场景
          primitives = viewer.scene.primitives.add(polygon);
          //绘制完清除工具
          if (drawElement) {
            drawElement.stopDrawing();
          }
        },
      });
    },
    //清除积雨分析结果
    clearRainArea() {
      if (primitives !== null) {
        primitives.destroy();
      }
    },
    // 鼠标绘制漫游轨迹
    drawTrackLine() {
      // 创建一个线的绘制图层
      graphicsLayer = new Cesium.GraphicsLayer(viewer, {
        getGraphic: this.getGraphic,
      });
      // 在图层上绘制
      graphicsLayer.startDrawing({
        type: 'polyline',
        style: {
          color: Cesium.Color.fromCssColorString('#2e6099'),
          width: 5,
        },
      });
    },
    getGraphic(e) {
      console.log('e:', e._positions);
      // 添加动态圆特效实体，详见Entity文档
      let circleWave = viewer.entities.add({
        name: 'dynamic Circle',
        ellipse: {
          semiMinorAxis: 1.0,
          semiMajorAxis: 1.0,
          height: 8,
          heightReference: 2,
          material: new Cesium.CircleWaveMaterialProperty({
            duration: 1000,
            gradient: 0.5,
            color: Cesium.Color.ORANGE,
            count: 4,
          }),
        },
      });

      // 定义动画漫游对象
      let animation = new Cesium.AnimationTool(viewer, {
        // 漫游的方向角
        heading: 0,
        // 漫游的俯仰角
        pitch: 0,
        // 设置漫游的视角类型。0：正常，不移动相机；1：跟随；2：锁定第一视角；3：上帝视角
        animationType: 1,
        // 是否循环漫游动画
        isLoop: false,
        // 是否显示漫游路径
        showPath: false,
        // 漫游路径(世界坐标点数组)
        positions: e._positions,
        // 漫游速度(m/s)
        speed: 5,
        // 倍速
        speedupFactor: 1,
        // 附加高程
        exHeight: 0,
        // 是否显示用时和距离提示信息
        showInfo: true,
        // 漫游的模型对象的url
        modelUrl:
          'http://webclient.smaryun.com:8200/3DData/Model/glb/Cesium_Man.glb',
        //模型对象参数，详见ModelGraphics对象的文档
        model: {
          //放大比例
          scale: 2,
          //固定大小设为0
          minimumPixelSize: 0,
        },
        // 完成漫游后的回调函数
        complete: function () {
          viewer.entities.remove(circleWave);
        },
        // 路径插值算法。可选：拉格朗日算法Cesium.LagrangePolynomialApproximation、线性插值 Cesium.LinearApproximation、埃尔米特插值插值Cesium.HermitePolynomialApproximation
        interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
        //是否获取当前点坐标，为true时，需配合返回当前点坐标的回调函数callBack一起使用
        isGetPositionNow: true,
        //回调函数，返回当前所在点坐标
        callBack: function (positionNow) {
          // 动态更新圆特效的位置
          circleWave.position = new Cesium.CallbackProperty(function () {
            return positionNow;
          }, false);
        },
        //是否设置模型运动姿态，保持朝向与运动方向一致
        isSetModelPosture: true,
        //是否需要将较大转弯点处理为圆弧
        isProcessCorner: false,
        //设置判断为转弯点的角度的最大值，不超过150的转角会被执行插值，处理为圆弧
        maxAngle: 150.0,
        //转弯处往圆弧曲线上插值点的步长，点个数=1/curveStep
        curveStep: 0.01,
        // 是否挂载动态扫描特效
        isAddScanEffect: false,
        // 扫描特效实例，可以是动态圆，也可以是雷达扫描
        scanEffect: undefined,
        // 是否获取路径点的真实高程
        isGetRealHeight: true,
        // 速度变化时，各个路径点对应的速度
        speedArray: undefined,
        // 各路径点对应的时间点
        timeArray: undefined,
        // 加速度数组
        accelerationArray: undefined,
        //是否执行onPositionCallback回调函数
        onPositionTag: true,
        // 当点经过设置的路径点时，返回路径点坐标和index索引号
        onPositionCallback: function (result) {
          console.log(
            '到达站点' + result.index + '，站点坐标：' + result.position
          );
        },
        // 用于判断当前点是否在路径点所在位置附近的精度
        disFactor: 10,
      });
      // 开启动画漫游
      animation.start();
    },
    // 开始漫游
    AnimationTool() {},
  },
};
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}
</style>
