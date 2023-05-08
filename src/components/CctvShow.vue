<template>
  <ControlPanel>
    <template #title1>
      <h3>监控视频</h3>
    </template>
    <template #content1>
      <div class="box cctv-videos">
        <video
          autoplay
          loop
          playbackRate="1.5"
          muted
          v-for="cctv in $store.state.cctvList"
          :key="cctv.id"
        >
          <source :src="cctv.url" type="video/mp4" />
        </video>
      </div>
    </template>

    <template #title2>
      <h3>监控信息</h3>
    </template>
    <template #content2>
      <div>
        <div class="content">
          <div class="box boxnav-container">
            <div class="boxnav tabel-container">
              <table class="table1" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr class="d-flex jc-between">
                    <th>名称</th>
                    <th>类型</th>
                    <th>状态</th>
                  </tr>
                  <tr
                    v-for="items in $store.state.cctvList"
                    class="d-flex jc-between"
                    @click="activeCctv(items.id)"
                    :class="[items.active ? 'activeTr' : '']"
                  >
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
      </div>
    </template>
    <template #title3>
      <h3>监控操作</h3>
    </template>
    <template #content3>
      <div>
        <div class="box">
          <div class="boxnav">
            <div class="cctvControl">
              <span class="demonstration">上下:</span>
              <el-slider
                v-model="cctvDegree.upDown"
                @input="changeUpDown()"
              ></el-slider>
            </div>
            <div class="cctvControl">
              <span class="demonstration">左右:</span>
              <el-slider
                :max="0"
                :min="-90"
                v-model="cctvDegree.leftRight"
                @input="changeLeftRight()"
              ></el-slider>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ControlPanel>
</template>

<script>
import ControlPanel from './MenuPanel/ControlPanel.vue';
export default {
  name: 'CctvShow',
  components: { ControlPanel },
  mounted() {
    this.cctvList = this.$store.state.cctvList;
    // console.log(this.cctvList);
  },
  data() {
    return {
      cctvList: {},
      cctvDegree: {
        upDown: 90,
        leftRight: -90,
      },
    };
  },
  methods: {
    activeCctv(id) {
      this.$store.commit('ChangeCctvstatu', id);
    },
    changeUpDown() {
      this.$store.commit('ChangeCctvupDown', this.cctvDegree.upDown);
    },
    changeLeftRight() {
      this.$store.commit('ChangeCctvleftRight', this.cctvDegree.leftRight);
    },
  },
};
</script>
<style scoped>
.box {
  position: relative;
  border: 1px solid rgba(7, 118, 181, 0.5);
  box-shadow: inset 0 0 10px rgba(7, 118, 181, 0.4);
  /* margin-bottom: 12px; */
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
.table1 .activeTr {
  background-color: #909399;
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
.table1 :nth-child(n + 2):hover {
  background-color: #7b7777;
  cursor: pointer;
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
h3 {
  font-size: 14px;
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
.cctv-videos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
  margin: 2px;
  height: 144.8px;
  overflow: auto;
}
.cctv-videos video {
  width: 49%;
  height: 50%;
  margin: 1px;
  border: 1px solid #0c1121;
}

.cctv-videos video:hover {
  border: 1px solid #07e5ff;
  cursor: pointer;
}
</style>
