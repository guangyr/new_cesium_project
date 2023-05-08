import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dataV from '@jiaminghi/data-view';
// import mockdata from './utils/mock.js';

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
/** 引入柱状图and折线图图表，图表后缀都为 Chart  */
import { BarChart, LineChart } from 'echarts/charts';

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from 'echarts/components';

// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LineChart,
  LegendComponent,
]);

import {
  Button,
  Card,
  Tree,
  Select,
  Option,
  Table,
  TableColumn,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Progress,
  Divider,
  Checkbox,
  DatePicker,
  Slider,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/icon/iconfont.css';

Vue.use(dataV);
// elementui
Vue.use(Button);
Vue.use(Card);
Vue.use(Tree);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Progress);
Vue.use(Divider);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Slider);
Vue.config.productionTip = false;
// 设置允许devtools调试
Vue.config.devtools = true;
// Vue.prototype.globalViewer = null;

// echarts绑定到原型对象上
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
