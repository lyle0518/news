import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 添加全局首位

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login")
  },
  {
    path: "/register",
    component: () => import("@/views/Register")
  },
  {
    path: "/personal",
    component: () => import("@/views/Personal")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path === "/personal") {
    const userJson = JSON.parse(localStorage.getItem("userInfo")) || [];
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

export default router;
