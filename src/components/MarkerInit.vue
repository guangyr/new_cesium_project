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
    position: {
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
    this.addGraphicLayer(), this.addImageBillboard();
  },
  methods: {
    addGraphicLayer() {
      graphicsLayer = new Cesium.GraphicsLayer(viewer, {
        //点击标绘对象的回调函数
        clickGraphic: function (graphic) {
          //   billboard = graphic;
          // console.log('MarkerInit中graphic对象:', graphic);
          //   console.log('graphic.getAllGraphic:', graphic.getAllGraphic());
        },
      });
    },
    addImageBillboard() {
      let billboardGraphic = new Cesium.Graphic({
        name: 1,
        //标绘类型
        type: 'billboard',
        //标绘位置
        positions: [
          Cesium.Cartesian3.fromDegrees(
            this.position.longitude,
            this.position.latidude,
            this.position.height
          ),
        ],
        //标绘样式
        style: {
          //广告牌图片URL
          image: this.imgUrl,
          //广告牌宽度
          width: this.width,
          //广告牌高度
          height: this.height,
          //离地高度
          offsetHeight: this.offsetHeight,
        },
      });
      //将标绘添加入标绘图层
      graphicsLayer.addGraphic(billboardGraphic);
    },
  },
};
</script>
