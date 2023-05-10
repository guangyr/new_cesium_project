import Vue from 'vue';
import VueRouter from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import IndexPanel from '../views/IndexPanel.vue';
import CctvPage from '../views/CctvPage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: IndexPanel,
  },
  {
    path: '/cctv',
    name: 'CctvPage',
    component: CctvPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
