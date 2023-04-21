<template>
  <div class="layer-tree">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>图层管理</h3>
      </div>
      <div class="text item">
        <el-tree
          ref="treeForm"
          :data="treeData"
          :props="defaultProps"
          node-key="id"
          highlight-current
          show-checkbox
          @check-change="addTDT"
          :default-expanded-keys="['map', 'm3d']"
        ></el-tree>
      </div>
    </el-card>
  </div>
</template>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 200px;
}
</style>

<script>
// import a from '@/components/CesiumInit';
// // const { viewer } = a;
// console.log('a', a);
export default {
  data() {
    return {
      treeData: [
        {
          id: 'map',
          label: '互联网地图',
          root: true,
          children: [
            { id: 1, label: '矢量图层', root: false, url: 'vec' },
            { id: 2, label: '卫星图层', root: false, url: 'img' },
            { id: 3, label: '注记', root: false, url: 'cva' },
          ],
        },
        {
          id: 'm3d',
          label: 'M3D数据',
          root: true,
          children: [
            {
              id: 4,
              label: '粗模',
              root: false,
              url: 'http://webclient.smaryun.com:8200/3DData/ModelCache/M3D/2.0/武汉建筑轮廓白/武汉建筑轮廓白.mcj',
            },
            {
              id: 5,
              label: '大雁塔',
              root: false,
              url: 'http://webclient.smaryun.com:8200/3DData/ModelCache/M3D/1.0/网格_8_2002_Grid/网格_8_2002_Grid.mcj',
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  methods: {
    getServiceById(id) {
      /**
       * @function 遍历目录树
       * @description	输入图层目录树点击的id, 返回该图层服务的信息
       * @param id 点击的图层目录树节点的id, 可以通过el-tree 的 checkChange方法获得,  即data.id
       * @return data 中该节点的 url, root, label
       */
      for (let i = 0; i < this.treeData.length; i++) {
        // 遍历children节点
        for (let j = 0; j < this.treeData[i].children.length; j++) {
          if (this.treeData[i].children[j].id === id) {
            return {
              url: this.treeData[i].children[j].url,
              root: this.treeData[i].children[j].root,
              label: this.treeData[i].children[j].label,
            };
          }
        }
      }
    },
    addTDT(data, checked, other) {
      let layer;
      // 当前点击的节点的id
      let current_click_node = data.id;
      console.log(current_click_node);
      let current_service_info = this.getServiceById(current_click_node);
      console.log('当前节点信息:', current_service_info);
      // 查不到返回-1, 则添加
      if (
        checked &&
        current_click_node != 'map' &&
        current_click_node != 'm3d'
      ) {
        console.log('进入 checked');

        if (current_click_node <= 3 && current_click_node >= 1) {
          // 如果为true, 则添加该天地图图层
          const options = {
            //天地图URL，开发token
            url:
              'http://t0.tianditu.gov.cn/' +
              current_service_info.url +
              '_w/wmts?tk=2157d3918ed04b66dc6db3b483f73197',
            layer: current_service_info.url, //瓦片样式
            style: 'default', //比例尺
            tileMatrixSetID: 'w', //请求格式s
            format: 'tiles',
          };

          layer = viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapTileServiceImageryProvider(options)
          );
          layer.name = current_service_info.label;
          this.flyTo();
        } else {
          viewer.scene.layers.appendM3DLayer(current_service_info.url);
          this.flyTo();
        }
      }
      // else if(){}
      else {
        for (let i = 0; i < viewer.imageryLayers.length; i++) {
          // console.log(viewer.imageryLayers.get(i).name);
          if (viewer.imageryLayers.get(i).name === current_service_info.label) {
            viewer.imageryLayers.remove(viewer.imageryLayers.get(i));
          }
        }
      }
    },
    flyTo() {
      //飞到指定视角
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(114.5258, 30.8054, 20000),
      });
    },
  },
};
</script>
