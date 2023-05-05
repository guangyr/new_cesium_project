import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panel_statu: false,
    current_id: NaN,
    current_title: '',
    current_action: '',
    cctvDegree: { upDown: 0, leftRight: 0 },
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
