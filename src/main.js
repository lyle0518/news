import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vant from "vant";
import axios from "axios";
import { Dialog } from "vant";
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
