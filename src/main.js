import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 全局的方式引入vant组件 1
import Vant from "vant";

import axios from "axios";
import { Dialog } from "vant";
// 全局的方式引入vant组件 2

Vue.use(Vant);
Vue.use(Dialog);

Vue.prototype.$axios = axios;
// 配置基准路劲
axios.defaults.baseURL = "http://localhost:3000";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
