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
  },
  {
    path: "/edit",
    component: () => import("@/views/Edit")
  },
  {
    path: "/fllow",
    component: () => import("@/views/Fllow")
  },
  {
    path: "/comment",
    component: () => import("@/views/Comment")
  },
  {
    path: "/star",
    component: () => import("@/views/Star")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
