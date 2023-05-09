<template>
  <div class="car-info">
    <div class="title">
      <h3>车辆信息</h3>
      <dv-decoration-2 style="width: 180px; height: 5px" />
    </div>
    <div class="content">
      <div class="box boxnav tabel-container">
        <table class="table1" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <th>车牌</th>
              <th>时间</th>
              <th>类型</th>
            </tr>
            <tr v-for="items in carInfo">
              <td>{{ items.car_id }}</td>
              <td>{{ items.time }}</td>
              <td>{{ items.category }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="up">
      <div class="title">
        <h3>园区信息</h3>
        <dv-decoration-2 style="width: 180px; height: 5px" />
      </div>
      <div
        class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
      >
        <p class="ml-3 colorBlue fw-b fs-xl">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            class="dv-dig-flop ml-1 mt-2 pl-3"
            :config="item.number"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ControlPanel from './MenuPanel/ControlPanel.vue';
import { getCarInfo } from '@/request/api.js';
export default {
  name: 'CarInfo',
  components: { ControlPanel },
  data() {
    return {
      carInfo: {},
      titleItem: [
        {
          title: '剩余车位数',
          number: {
            number: [120],
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24,
            },
          },
        },
        {
          title: '人流量',
          number: {
            number: [320],
            textAlign: 'left',
            content: '{nt} ',
            style: {
              fontSize: 24,
            },
          },
        },
        {
          title: '其他',
          number: {
            number: [62],
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24,
            },
          },
        },
      ],
    };
  },
  mounted() {
    setInterval(() => {
      getCarInfo().then((res) => {
        this.carInfo = res.data.data;
      });
    }, 3000);

    this.changeData();
  },
  methods: {
    changeData() {
      setInterval(() => {
        this.titleItem.forEach((item, index) => {
          let randomNum = Math.random() < 0.5 ? 1 : -1;
          item.number.number[0] +=
            randomNum * Math.floor(Math.random() * 10 + 1);
          item.number = { ...item.number };
        });
      }, 2900);
    },
  },
};
</script>
<style scoped>
.car-info {
  padding: 6px 10px 6px;
}
.box {
  position: relative;
  border: 1px solid rgba(7, 118, 181, 0.5);
  box-shadow: inset 0 0 10px rgba(7, 118, 181, 0.4);
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
h3 {
  font-size: 14px;
  color: #07e5ff;
}
.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 5px 0;
}
.tabel-container {
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
/* .table1 tr:first-child {
  border-bottom: 1px solid #407abd;
} */
.table1 th {
  font-size: 14px;
  text-align: left;
  padding: 2px 3px;
  color: rgba(255, 255, 255, 0.8);
}
.table1 td {
  /* border-bottom: 1px dotted #407abd; */
  font-size: 12px;
  padding: 3px 3px;
  /* text-align: center; */
  color: rgba(255, 255, 255, 0.6);
}
.table1 tr:last-child {
  border: none;
}
.table1 tr:nth-child(n + 2):hover {
  background-color: #7b7777;
}
h3 {
  font-size: 14px;
  color: #07e5ff;
}
.el-slider {
  width: 80%;
}

.up {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 8px;
}
.item {
  border-radius: 6px;
  padding-top: 8px;
  /* margin-top: 8px; */
  width: 32%;
  height: 75px;
}
.dv-dig-flop {
  width: 150px;
  height: 30px;
}
</style>
