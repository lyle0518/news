import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 添加全局首位

const routes = [
  {
    path: "/",
    component: () => import("@/views/Index"),
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/register",
    component: () => import("@/views/Register"),
  },
  {
    path: "/personal",
    component: () => import("@/views/Personal"),
    meta: {
      authorization: true,
    },
  },
  {
    path: "/edit",
    component: () => import("@/views/Edit"),
    meta: {
      authorization: true,
    },
  },
  {
    path: "/fllow",
    component: () => import("@/views/Fllow"),
    meta: {
      authorization: true,
    },
  },
  {
    path: "/comment",
    component: () => import("@/views/Comment"),
    meta: {
      authorization: true,
    },
  },
  {
    path: "/star",
    component: () => import("@/views/Star"),
    meta: {
      authorization: true,
    },
  },
  {
    path: "/category",
    component: () => import("@/views/Category"),
  },
  {
    path: "/search",
    component: () => import("@/views/Search"),
  },
  {
    path: "/post/:id",
    component: () => import("@/views/Post"),
  },
  {
    path: "/post_video/:id",
    component: () => import("@/views/Post_video"),
  },
  {
    path: "/postcomment/:id",
    component: () => import("@/views/Postcomment"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
