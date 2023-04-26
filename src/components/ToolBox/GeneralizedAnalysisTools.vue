<template>
  <div class="menu-info-panel-container">
    <MenuInfoPanel>
      <template #content>
        <i class="iconfont icon-tongshifenxi" @click="addVisibility()"> </i>
        <i class="iconfont icon-keshiyufenxi" @click=""> </i>
        <i class="iconfont icon-jiankongshipin" @click="viewCctv()"></i>
      </template>
    </MenuInfoPanel>

    <div class="control-panel-container">
      <!-- <dv-border-box-13> -->
      <ControlPanel>
        <template #title1>
          <h3>监控信息</h3>
        </template>
        <template #content1>
          <div>
            <div class="box boxnav-container">
              <div class="boxnav tabel-container">
                <table class="table1" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr class="d-flex jc-between">
                      <th>名称</th>
                      <th>类型</th>
                      <th>状态</th>
                    </tr>
                    <tr v-for="items in cctvList" class="d-flex jc-between">
                      <td>
                        <span class="text-b">{{ items.name }}</span>
                      </td>
                      <td
                        :class="[
                          'iconfont',
                          items.type === '球机'
                            ? 'icon-shebeileiqiujigis'
                            : 'icon-jiankongshipin',
                        ]"
                      ></td>
                      <td
                        :class="[
                          'iconfont',
                          items.online
                            ? 'icon-jiankong-zaixian'
                            : 'icon-jiankonglixian',
                        ]"
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>
        <template #title2>
          <h3>监控操作</h3>
        </template>
        <template #content2>
          <div>
            <div class="box">
              <div class="boxnav">
                <div class="cctvControl">
                  <span class="demonstration">上下:</span>
                  <el-slider v-model="value2"></el-slider>
                </div>
                <div class="cctvControl">
                  <span class="demonstration">左右:</span>
                  <el-slider v-model="value2"></el-slider>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ControlPanel>
      <!-- </dv-border-box-13> -->
    </div>
  </div>
</template>
<script>
import MenuInfoPanel from '../MenuPanel/MenuInfoPanel';
import ControlPanel from '../MenuPanel/ControlPanel';

let visibility = null;
let mouseLeftOnceClicked = false; //是否点击了一次鼠标左键
let mouseEventDone = false; //可视域分析的鼠标事件完整结束
export default {
  name: 'GeneralizedAnalysisTools',
  components: {
    MenuInfoPanel,
    ControlPanel,
  },
  data() {
    return {
      cctvList: [
        {
          id: 'c1',
          name: '东1',
          type: '球机',
          online: true,
          project: false,
          active: false,
        },
        {
          id: 'c2',
          name: '东2',
          type: '枪机',
          online: true,
          project: false,
          active: false,
        },
        {
          id: 'c3',
          name: '西门',
          type: '枪机',
          online: false,
          project: false,
          active: false,
        },
        {
          id: 'c4',
          name: '东门',
          type: '枪机',
          online: true,
          project: false,
          active: false,
        },
        {
          id: 'c5',
          name: '东1门',
          type: '枪机',
          online: true,
          project: false,
          active: false,
        },
      ],
      value2: 10,
    };
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

    // 监控
    viewCctv() {
      // 观察点
      let targetPosition = new Cesium.Cartesian3(
        -2273141.773190065,
        5010775.7843235945,
        3215069.2283928613
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
      let scenePro = new Cesium.SceneProjector(
        // 场景投放的内容，颜色: COLOR、图片: IMAGE、MP4视频: VIDEO、HLS视频: HLS
        Cesium.SceneProjectorType.VIDEO
      );
      // 是否显示视锥的锥体线
      scenePro.showLine = true;
      // 将场景投放添加到地球上显示
      viewer.scene.visualAnalysisManager.add(scenePro);
      // 投影内容
      scenePro.textureSource =
        'http://localhost:5500/static/modules/cesium/example-gallery/analyse/commonAnalyse/人.mp4';
      // 设置观察点
      scenePro.viewPosition = viewPosition;
      // 设置目标点
      scenePro.targetPosition = targetPosition;
      // 方位角
      scenePro.heading = 35;
      // 俯仰角
      scenePro.pitch = -69;
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
.control-panel-container {
  position: relative;
  top: -290px;
  left: 570px;
  width: 300px;
  height: 350px;
}
.box {
  border: 1px solid rgba(7, 118, 181, 0.5);
  box-shadow: inset 0 0 10px rgba(7, 118, 181, 0.4);
  /* margin-bottom: 12px; */
  position: relative;
}
.box:before {
  width: 100%;
  height: 1px;
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  background: linear-gradient(to right, #076ead, #4ba6e0, #076ead);
  box-shadow: 0 0 5px rgba(131, 189, 227, 1);
  opacity: 0.6;
}
.box .tabel-container {
  height: 123px;
  overflow: auto;
}
.box:before {
  top: -1px;
}
.boxnav {
  padding: 5px 10px 0;
}

::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 5px;
}

.table1 {
  width: 100%;
}
.table1 tr {
  width: 100%;
  border-bottom: 1px dotted #407abd;
}
.table1 th {
  font-size: 14px;
  text-align: center;
  padding: 2px 3px;
  color: rgba(255, 255, 255, 0.8);
}
.table1 td {
  /* border-bottom: 1px dotted#407abd; */
  font-size: 12px;
  padding: 3px 3px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.table1 tr:last-child {
  border: none;
}
.table1 tr:first-child {
  border-bottom: 1px solid #407abd;
}
.table1 tr:hover {
  background-color: #7b7777;
}
.text-w {
  color: #ffe400;
}
.text-d {
  color: #ff6316;
}
.text-s {
  color: #14e144;
}
.text-b {
  color: #07e5ff;
}
.cctvControl {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.el-slider {
  width: 80%;
}
.error {
  color: #ff6316;
}
</style>
