import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 全局的方式引入vant组件 1
import Vant from "vant";
// 导入axios
import axios from "axios";
import { Dialog } from "vant";
// 全局的方式引入vant组件 2
import { Toast } from "vant";
Vue.use(Vant);
Vue.use(Dialog);

Vue.prototype.$axios = axios;
// 配置基准路劲
// axios.defaults.baseURL = "http://localhost:3000";
// 线上的地址
axios.defaults.baseURL = "http://hmtoutiao-api.atlansic.com";

Vue.config.productionTip = false;
let app;

router.beforeEach((to, from, next) => {
  // console.log(to);

  if (to.meta.authorization) {
    const userJson = JSON.parse(localStorage.getItem("userInfo")) || {};
    if (userJson.token) {
      next();
    } else {
      next("/login");
    }
  } else {
    //非进入个人中心页面
    next();
  }
});
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    console.log(error.response);
    const { statusCode, message } = error.response.data;
    if (statusCode === 400) {
      Toast.fail(message);
    }
    if (statusCode === 403) {
      Toast.fail(message);
      app.$router.push({
        path: "/login",
        // path: "/login",
        query: {
          return_url: app.$route.path,
        },
      });
    }
    return Promise.reject(error);
  }
);
app = new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
