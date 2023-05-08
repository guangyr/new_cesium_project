<template></template>
<script>
let graphicsLayer;
let billboard;
export default {
  name: 'MarkerInit',
  data() {
    return {
      // 存储当前已经激活显示的摄像头, 避免重复添加实体
      currentActiveCctv: [],
    };
  },

  mounted() {
    // console.log(this.positions.longitude, this.$store.state.cctvList[0]);
    // this.addImageBillboard();
  },
  watch: {
    '$store.state.cctvList': {
      handler(activeStatute) {
        // console.log(activeStatute);
        activeStatute.forEach((item) => {
          // console.log(this.currentActiveCctv);
          if (
            item.active === true &&
            this.currentActiveCctv.indexOf(item.id) === -1
          ) {
            this.currentActiveCctv.push(item.id);
            this.addImageBillboard(item.id, item.position);
          }
        });
      },
      deep: true,
    },
  },
  methods: {
    addImageBillboard(id, position) {
      const billboard = viewer.entities.add({
        id: id,
        //标绘位置
        // 经纬度转笛卡尔会有精度损失, 在小范围内会导致偏移
        position: Cesium.Cartesian3.fromDegrees(
          position.lon,
          position.lat,
          position.height // lon, lat, height
        ),

        billboard: {
          // 广告牌图片URL
          image: 'http://localhost:8021/枪机.svg',
          //广告牌宽度
          width: 64,
          //广告牌高度
          height: 64,
          //离地高度
          offsetHeight: 64,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scaleByDistance: new Cesium.NearFarScalar(20, 1, 300, 0),
        },
      });
      viewer.flyTo(billboard);
      // viewer.zoomTo(billboard);
      // const entityId = viewer.entities.getById('枪机1');
      // console.log(entityId);
    },
  },
};
</script>
