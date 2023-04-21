import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dataV from '@jiaminghi/data-view';
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
Vue.config.productionTip = false;
// 设置允许devtools调试
Vue.config.devtools = true;
Vue.prototype.globalViewer = null;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
