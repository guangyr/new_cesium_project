<template></template>
<script>
let graphicsLayer;
let billboard;
export default {
  name: 'MarkerInit',
  data() {
    return {};
  },
  props: {
    positions: {
      type: Object,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
      default: 'http://localhost:8021/%E5%AE%9A%E4%BD%8D.svg',
    },
    width: {
      type: Number,
      required: false,
      default: 64,
    },
    height: {
      type: Number,
      required: false,
      default: 64,
    },
    offsetHeight: {
      type: Number,
      required: false,
      default: 64,
    },
  },
  mounted() {
    console.log(this.positions.longitude);
    // this.addGraphicLayer(),
    this.addImageBillboard();
  },
  methods: {
    // addGraphicLayer() {
    //   graphicsLayer = new Cesium.GraphicsLayer(viewer, {
    //     //点击标绘对象的回调函数
    //     clickGraphic: function (graphic) {
    //       //   billboard = graphic;
    //       // console.log('MarkerInit中graphic对象:', graphic);
    //       //   console.log('graphic.getAllGraphic:', graphic.getAllGraphic());
    //     },
    //   });
    // },
    // addImageBillboard() {
    //   let billboardGraphic = new Cesium.Graphic({
    //     name: 1,
    //     //标绘类型
    //     type: 'billboard',
    //     //标绘位置
    //     positions: [
    //       Cesium.Cartesian3(
    //         this.position.longitude,
    //         this.position.latidude,
    //         this.position.height
    //       ),
    //     ],
    //     //标绘样式
    //     style: {
    //       //广告牌图片URL
    //       image: this.imgUrl,
    //       //广告牌宽度
    //       width: this.width,
    //       //广告牌高度
    //       height: this.height,
    //       //离地高度
    //       offsetHeight: this.offsetHeight,
    //     },
    //   });
    //   //将标绘添加入标绘图层
    //   graphicsLayer.addGraphic(billboardGraphic);
    // },
    addImageBillboard() {
      const billboard = viewer.entities.add({
        id: '枪机1',
        //标绘位置
        // 经纬度转笛卡尔会有精度损失, 在小范围内会导致偏移
        position: Cesium.Cartesian3.fromDegrees(
          114.40116999085951,
          30.465962561272967,
          60
          // this.positions.longitude,
          // this.positions.latitude,
          // this.positions.height
        ),

        // this.position.longitude,
        // this.position.latidude,
        // this.position.height

        // -2273085.5863048905,
        // 5010635.766338768,
        // 3215154.7002649284

        billboard: {
          // 广告牌图片URL
          image: this.imgUrl,
          //广告牌宽度
          width: this.width,
          //广告牌高度
          height: this.height,
          //离地高度
          offsetHeight: this.offsetHeight,
          // offsetHeight: this.offsetHeight,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          // scale: 0.5,
          scaleByDistance: new Cesium.NearFarScalar(20, 1, 300, 0),
        },
      });
      // viewer.zoomTo(billboard);
      const entityId = viewer.entities.getById('枪机1');
      console.log(entityId);
    },
  },
};
</script>
