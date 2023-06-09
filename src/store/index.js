import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panel_statu: false,
    current_id: NaN,
    current_title: '',
    current_action: '',
    cctvDegree: { upDown: 89, leftRight: -90 },
    cctvList: [
      {
        id: 1,
        name: '东1',
        type: '球机',
        online: true,
        pitch: -90,
        heading: 90,
        position: {
          lon: 114.402429795892,
          lat: 30.4674191150077,
          height: 70,
        },
        project: false,
        active: false,
        url: 'http://localhost:8021/人流量.mp4',
      },
      {
        id: 2,
        name: '东2',
        type: '枪机',
        online: true,
        pitch: -35,
        heading: 100,
        position: {
          lon: 114.401987231405,
          lat: 30.4672295436778,
          height: 10,
        },

        project: false,
        project: false,
        active: false,
        url: 'http://localhost:8021/车流.mp4',
      },
      {
        id: 3,
        name: '西门',
        type: '枪机',
        online: false,
        pitch: -90,
        heading: 90,
        position: {
          lon: 114.400890207918,
          lat: 30.4672549739996,
          height: 120,
        },
        project: false,
        project: false,
        active: false,
        url: 'http://localhost:8021/人.mp4',
      },
      {
        id: 4,
        name: '南门',
        type: '球机',
        online: true,
        pitch: -48,
        heading: 99,
        position: {
          lon: 114.401263034971,
          lat: 30.466175335405,
          height: 90,
        },
        project: false,
        project: false,
        active: false,
        url: 'http://localhost:8021/City1.mp4',
      },
      {
        id: 5,
        name: '北门',
        type: '枪机',
        online: true,
        pitch: -90,
        heading: 90,
        position: {
          lon: 114.401555395753,
          lat: 30.4672619095407,
          height: 90,
        },
        project: false,
        project: false,
        active: false,
        url: 'http://localhost:8021/车流.mp4',
      },
    ],
    // cctvList: [
    //   {
    //     id: 1,
    //     name: '东1',
    //     type: '球机',
    //     online: true,
    //     pitch: -90,
    //     heading: 90,
    //     position: {
    //       lon: 114.4008537688433,
    //       lat: 30.468181577549643,
    //       height: 70,
    //     },
    //     project: false,
    //     active: false,
    //     url: 'http://localhost:8021/人流量.mp4',
    //   },
    //   {
    //     id: 2,
    //     name: '东2',
    //     type: '枪机',
    //     online: true,
    //     pitch: -35,
    //     heading: 100,
    //     position: {
    //       lon: 114.40284260981612,
    //       lat: 30.46767055436624,
    //       height: 10,
    //     },

    //     project: false,
    //     project: false,
    //     active: false,
    //     url: 'http://localhost:8021/车流.mp4',
    //   },
    //   {
    //     id: 3,
    //     name: '西门',
    //     type: '枪机',
    //     online: false,
    //     pitch: -90,
    //     heading: 90,
    //     position: {
    //       lon: 114.4005177619144,
    //       lat: 30.46737525747312,
    //       height: 120,
    //     },
    //     project: false,
    //     project: false,
    //     active: false,
    //     url: 'http://localhost:8021/人.mp4',
    //   },
    //   {
    //     id: 4,
    //     name: '南门',
    //     type: '球机',
    //     online: true,
    //     pitch: -90,
    //     heading: 90,
    //     position: {
    //       lon: 114.40119730623559,
    //       lat: 30.466038812018024,
    //       height: 90,
    //     },
    //     project: false,
    //     project: false,
    //     active: false,
    //     url: 'http://localhost:8021/City1.mp4',
    //   },
    //   {
    //     id: 5,
    //     name: '北门',
    //     type: '枪机',
    //     online: true,
    //     pitch: -90,
    //     heading: 90,
    //     position: {
    //       lon: 114.401864894663,
    //       lat: 30.467192488237334,
    //       height: 90,
    //     },
    //     project: false,
    //     project: false,
    //     active: false,
    //     url: 'http://localhost:8021/车流.mp4',
    //   },
    // ],
  },

  getters: {},
  mutations: {
    // 1. 修改菜单开关状态flag
    ChangePanelStatu(state, value) {
      state.panel_statu = !state.panel_statu;
    },
    // 2重置当前选中的菜单信息
    ResetMenuStatu(state, value) {
      state.current_id = NaN;
      state.current_title = '';
      state.current_action = '';
    },
    //3.
    ChangeCurrentMenu(state, value) {
      state.current_id = value.id;
      state.current_title = value.title;
      state.current_action = value.action;
    },
    ChangeCctvupDown(state, value) {
      state.cctvDegree.upDown = value;
    },
    ChangeCctvleftRight(state, value) {
      state.cctvDegree.leftRight = value;
    },
    ChangeCctvstatu(state, value) {
      state.cctvList.forEach((item) => {
        if (item.id === value) {
          item.active = true;
        }
      });
      console.log(state.cctvList);
    },
  },
  actions: {
    // 1. 修改菜单开关状态flag
    // change_panel_statu(contex, value) {
    //   contex.commit(ChangePanelStatu, value);
    // },
    // // 2. 重置当前选中菜单信息
    // reset_menu_statu(contex, value) {
    //   contex.commit(ResetMenuStatu, value);
    // },
    // // 3. 修改当前菜单信息
    // change_current_menu(contex, value) {
    //   contex.commit(ChangeCurrentMenu, value);
    // },
    //4. 调整摄像头的角度
    // change_cctv_upDown(contex, value) {
    //   contex.commit(ChangeCctvupDown, value);
    // },
    // change_cctv_leftRight(contex, value) {
    //   contex.commit(ChangeCctvleftRight, value);
    // },
  },
  modules: {},
});
