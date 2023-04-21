<template>
  <div class="oneheader">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="tools">
      <div class="dateInfo">
        <div class="timer">{{ time }}</div>
        <div class="date">{{ date }} {{ weekday }}</div>
      </div>
      <div class="homeBack" @click="jumpTo" v-show="activeIndex != -1"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderInfo',
  props: {},
  data() {
    return {
      time: '',
      date: '',
      weekday: '',
      timer: '',
      activeIndex: this.$route.meta.activeIndex,
    };
  },
  watch: {
    $route() {
      this.activeIndex = this.$route.meta.activeIndex;
    },
  },
  created() {
    this.showTimes();
  },
  mounted() {},
  methods: {
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? '0' + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? '0' + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? '0' + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? '0' + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? '0' + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      let week = new Date(timeStamp).getDay();
      let weeks = ['日', '一', '二', '三', '四', '五', '六'];
      let getWeek = '  星期' + weeks[week];
      this.date = year + '-' + month + '-' + date;
      this.time = hh + ' : ' + mm + ' : ' + ss;
      this.weekday = getWeek;
    },
    showTimes() {
      clearInterval(this.timer);
      this.timeFormate(new Date());
      this.timer = setInterval(this.showTimes, 1000);
    },
    jumpTo() {
      this.$router.replace('/home');
    },
  },
};
</script>

<style scoped scoped>
.oneheader {
  position: absolute;
  top: 0;
  width: 98%;
  height: 8%;
  z-index: 100;
  background: linear-gradient(0deg, #22e6ff, #2556cd);
  background-image: url(~@/assets/images/common/blank.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.oneheader .title {
  width: 30vw;
  height: 5vh;
  font-size: 35px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  letter-spacing: 6px;
  color: white;
  line-height: 6vh;
  align-self: center;
  margin-top: 5px;
}
.oneheader .tools {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.oneheader .tools .dateInfo {
  width: 15vw;
  height: 4vh;
  display: flex;
  flex-direction: row;
  margin-top: -7px;
  z-index: 100;
}
.oneheader .tools .dateInfo .timer {
  width: 7vw;
  height: 4vh;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  align-self: flex-end;
}
.oneheader .tools .dateInfo .date {
  width: 7vw;
  height: 3vh;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  margin-left: 1vw;
  align-self: flex-end;
}
.oneheader .tools .homeBack {
  width: 40px;
  height: 34px;
  margin-top: -10px;
  margin-right: 15px;
  z-index: 100;
  background-image: url(~@/assets/images/common/homehover.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
