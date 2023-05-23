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
      <i class="iconfont icon-manyou tooltip" @click="startRoaming()">
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
let animation = null;
let circleWave = null;
let floodAnalysis = null;

import MenuInfoPanel from '../MenuPanel/MenuInfoPanel';
import TipTool from '../MenuPanel/TipTool';
// import { addGraphicLayer, startDrawing } from '../../utils/drawTrackLine.js';

export default {
  name: 'VisualizationTools',
  data() {
    return {
      isRain: false,
      // defaultTrack: [
      //   new Cesium.Cartesian3(
      //     -2273135.4976898846,
      //     5010754.507214392,
      //     3215006.016995991
      //   ),
      //   new Cesium.Cartesian3(
      //     -2273139.47043651,
      //     5010713.972375699,
      //     3215065.85136762
      //   ),
      //   new Cesium.Cartesian3(
      //     -2273178.9003102784,
      //     5010667.751562557,
      //     3215109.8461850397
      //   ),
      //   new Cesium.Cartesian3(
      //     -2273166.6867254446,
      //     5010640.004934284,
      //     3215161.3313160557
      //   ),
      //   new Cesium.Cartesian3(
      //     -2273020.111111655,
      //     5010706.399525259,
      //     3215161.476713193
      //   ),
      //   new Cesium.Cartesian3(
      //     -2273054.7566642566,
      //     5010784.488372708,
      //     3215016.269828184
      //   ),
      //   new Cesium.Cartesian3(
      //     -2273135.492113242,
      //     5010754.504541865,
      //     3215006.0251361644
      //   ),
      // ],
      pathPositions: [
        {
          x: -2273175.578013623,
          y: 5010638.458497225,
          z: 3215157.5186911672,
        },
        {
          x: -2273186.15173117,
          y: 5010663.3702553185,
          z: 3215111.5241055344,
        },
        {
          x: -2273186.059557918,
          y: 5010665.8169212,
          z: 3215107.815526737,
        },
        {
          x: -2273143.314663209,
          y: 5010712.162479221,
          z: 3215066.039824561,
        },
        {
          x: -2273141.8576728688,
          y: 5010714.347794549,
          z: 3215063.717603765,
        },
        {
          x: -2273140.8739640433,
          y: 5010753.004724801,
          z: 3215004.560829764,
        },
        {
          x: -2273138.540278631,
          y: 5010754.703344927,
          z: 3215003.5664240783,
        },
        {
          x: -2273111.358422647,
          y: 5010766.642102002,
          z: 3215004.1472902703,
        },
        {
          x: -2273098.2845368856,
          y: 5010771.008773392,
          z: 3215006.5834648367,
        },
        {
          x: -2273085.2149581,
          y: 5010776.224484442,
          z: 3215007.6874420852,
        },
        {
          x: -2273060.1194440527,
          y: 5010787.107324429,
          z: 3215008.4596388526,
        },
        {
          x: -2273052.268879898,
          y: 5010789.153232572,
          z: 3215010.8286537277,
        },
        {
          x: -2273048.5740574095,
          y: 5010788.136685532,
          z: 3215014.9750527814,
        },
        {
          x: -2273046.2069158386,
          y: 5010783.903650803,
          z: 3215023.2289560195,
        },
        {
          x: -2273013.225191267,
          y: 5010711.003592086,
          z: 3215159.227493635,
        },
        {
          x: -2273003.7530798647,
          y: 5010714.871967782,
          z: 3215159.9395025484,
        },
        {
          x: -2272998.104067287,
          y: 5010714.851373358,
          z: 3215163.939958693,
        },
        {
          x: -2272994.7856738493,
          y: 5010712.621812783,
          z: 3215169.731864345,
        },
        {
          x: -2272989.1095662955,
          y: 5010699.273869096,
          z: 3215194.3994706264,
        },
      ],
    };
  },
  components: {
    MenuInfoPanel,
    TipTool,
  },
  mounted() {},
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
        // console.log('add rain', this.isRain);
        weather = new Cesium.WeatherEffect(viewer);
        weather.removeRain();
        weather.addRain(optionsRain);
        this.addFlood();
      } else {
        weather.removeRain();
        viewer.scene.visualAnalysisManager.remove(floodAnalysis);
        // console.log('关闭下雨', this.isRain);
      }
    },
    // 下雨同时开启洪水淹没
    addFlood() {
      //先清除已有的分析类
      // removeFloodAnalyse();
      let positions = [
        new Cesium.Cartesian3(
          -2273210.903895066,
          5010713.093106137,
          3215001.8724564575
        ),
        new Cesium.Cartesian3(
          -2273224.082965986,
          5010687.508503787,
          3215032.223847121
        ),
        new Cesium.Cartesian3(
          -2273234.8866175534,
          5010665.762098052,
          3215058.301236912
        ),
        new Cesium.Cartesian3(
          -2273226.0933175017,
          5010610.627333201,
          3215149.82746543
        ),
        new Cesium.Cartesian3(
          -2273218.6519676885,
          5010599.791462427,
          3215171.8274242696
        ),
        new Cesium.Cartesian3(
          -2273195.641550643,
          5010609.29520489,
          3215173.2757342206
        ),
        new Cesium.Cartesian3(
          -2272990.3950969493,
          5010701.5908712065,
          3215174.5369936293
        ),
        new Cesium.Cartesian3(
          -2273038.994589726,
          5010813.820446155,
          3214966.6664608875
        ),
        new Cesium.Cartesian3(
          -2273080.939201127,
          5010795.343219276,
          3214965.814698123
        ),
        new Cesium.Cartesian3(
          -2273168.7585837576,
          5010743.579858468,
          3214984.27513955
        ),
        new Cesium.Cartesian3(
          -2273033.6832549293,
          5010812.93642626,
          3214971.7651229626
        ),
        new Cesium.Cartesian3(
          -2273210.903895066,
          5010713.093106137,
          3215001.8724564575
        ),
      ];

      floodAnalysis = new Cesium.FloodAnalysis(viewer, positions);
      //设置洪水淹没区域最低开始高度
      floodAnalysis.startHeight = 0;
      //设置洪水淹没区域动画开始高度
      floodAnalysis.minHeight = 0;
      //设置洪水淹没区域最高高度
      floodAnalysis.maxHeight = 12;
      //反射光线强度
      floodAnalysis.specularIntensity = 1;
      //水波高度
      floodAnalysis.amplitude = 20;
      //水纹速度
      floodAnalysis.animationSpeed = 0.02;
      //水纹频率
      floodAnalysis.frequency = 1000;
      //设置洪水上涨速度
      floodAnalysis.floodSpeed = 1;
      floodAnalysis.floodColor = new Cesium.Color(
        143 / 255,
        183 / 255,
        143 / 255,
        0.5
      );
      //添加洪水淹没结果显示
      viewer.scene.visualAnalysisManager.add(floodAnalysis);
      //取消掉绘制
    },

    //绘制积雨区域
    rainArea() {
      this.toggleOtherFunction('rainArea');
      // console.log('积雨');
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
    initAnimation() {
      // 定义动画漫游对象
      animation = new Cesium.AnimationTool(viewer, {
        // 漫游的方向角
        heading: Cesium.Math.toRadians(0),
        // 漫游的俯仰角
        pitch: Cesium.Math.toRadians(0),
        // 设置漫游的视角类型。0：正常，不移动相机；1：跟随；2：锁定第一视角；3：上帝视角
        animationType: 1,
        // 是否循环漫游动画
        isLoop: false,
        // 是否显示漫游路径
        showPath: true,
        // 漫游路径(世界坐标点数组)
        positions: this.pathPositions,
        // 切换跟随视角下的鼠标点击事件
        followSwitchMouseEvent: true,
        // 开始路径漫游跳转点的上一个路径点的索引
        startPositionIndex: 0,
        // 距离startPositionIndex索引点的距离，单位是m
        offsetStartPositionDistance: 0,
        // 漫游速度(m/s)
        speed: 20,
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
          scale: 3,
          //固定大小设为0
          minimumPixelSize: 1,
        },
        // 完成漫游后的回调函数
        complete: function () {
          // removeCircle();
          // console.log('动画完成');
          // animation.stop();
          // this.toggleOtherFunction(animationStop);
        },
        // 路径插值算法。可选：拉格朗日算法Cesium.LagrangePolynomialApproximation、线性插值 Cesium.LinearApproximation、埃尔米特插值插值Cesium.HermitePolynomialApproximation
        interpolationAlgorithm: Cesium.LinearApproximation,
        //是否获取当前点坐标，为true时，需配合返回当前点坐标的回调函数callBack一起使用
        isGetPositionNow: true,
        //是否执行回调函数
        onPositionTag: true,
        //回调函数，返回当前所在点坐标
        callback: function (data) {
          if (circleWave) {
            // 动态更新圆特效的位置
            circleWave.position = new Cesium.CallbackProperty(function () {
              return data.position;
            }, false);
          }
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
        // 用于判断当前点是否在路径点所在位置附近的精度
        disFactor: 10,
      });
    },
    addCircle() {
      // 添加动态圆特效实体，详见Entity文档
      if (!circleWave) {
        circleWave = viewer.entities.add({
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
      }
    },
    removeCircle() {
      if (circleWave) {
        viewer.entities.remove(circleWave);
        circleWave = null;
      }
    },
    startRoaming() {
      this.toggleOtherFunction('startRoaming');
      this.initAnimation();
      this.addCircle();
      animation.start();
    },
    // 切换功能时清除其他功能的效果
    toggleOtherFunction(fn) {
      if (!(fn === 'startRoaming')) {
        console.log('没有点路径动画');
        if (animation) {
          this.removeCircle();
          animation.stop();
        }
      } else if (!(fn === 'rainArea')) {
        console.log('没有点积水分析');
        if (drawElement) {
          this.clearRainArea();
          drawElement.stopDrawing();
        }
      } else if (fn === 'animationStop') {
        console.log('动画完成了');

        animation.stop();
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
