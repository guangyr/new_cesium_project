<template>
  <div id="index">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>

      <div v-else class="host-body">
        <!-- 头部盒子 -->
        <div class="d-flex jc-center header-decoration">
          <dv-decoration-10 class="dv-dec-10" />

          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
            <div class="title">
              <span class="title-text">园区管理平台</span>
              <dv-decoration-6
                class="dv-dec-6"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
              />
            </div>
            <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="decorationColor"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>
        <!-- 中间大盒子 -->
        <div class="body-box">
          <div class="content-box">
            <div class="center-left-box">
              <dv-border-box-13>
                <centerLeft1 />
              </dv-border-box-13>
            </div>
            <div class="center-box">
              <div class="center-map-box">
                <dv-border-box-12>
                  <center></center>
                </dv-border-box-12>
              </div>
              <centerBottom> </centerBottom>
            </div>

            <div class="center-right-box">
              <dv-border-box-13>
                <centerRight1 />
              </dv-border-box-13>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import centerLeft1 from './centerLeft1';
import centerRight1 from './centerRight1';
import center from './center';
import centerBottom from './centerBottom';
export default {
  data() {
    return {
      loading: true,
      decorationColor: ['#568aea', '#000000'],
    };
  },
  components: {
    centerLeft1,
    centerRight1,
    center,
    centerBottom,
  },
  mounted() {
    this.cancelLoading();
  },
  beforeDestroy() {
    // clearInterval(this.timing);
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style scoped>
#index {
  color: #d3d6dd;
  /* width: 100vw;
  height: 100vh; */
  width: 100%;
  height: 100%;
}

#index .bg {
  width: 100vw;
  height: 100vh;
  padding: 6px 6px 0 6px;
  /* 控制最顶部装饰线位置 */
  background-image: url('../assets/pageBg.png');
  background-size: cover;
  background-position: center center;
}
#index .host-body {
  display: flex;
  flex-direction: column;
}

/* 头部装饰盒子 */
#index .host-body .dv-dec-8 {
  width: 200px;
  height: 50px;
}

#index .host-body .title {
  position: relative;
  width: 500px;
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
}

#index .host-body .title .title-text {
  font-size: 24px;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translate(-50%);
}

#index .host-body .title .dv-dec-6 {
  position: absolute;
  bottom: 0px;
  left: 50%;
  width: 250px;
  height: 8px;
  transform: translate(-50%);
}

#index .host-body .body-box .content-box {
  display: flex;
  justify-content: space-between;
}
#index .host-body .body-box .center-map-box {
  flex: 1;
  margin: 0 10px;
}
.center-left-box {
  height: 735px;
}
.center-right-box {
  height: 735px;
}
.center-box {
  width: 100%;
  height: 100%;
}
.center-map-box {
  height: 480px;
}
</style>
