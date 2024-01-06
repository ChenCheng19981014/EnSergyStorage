/**
 * @description 路由信息
 */

export default [
  {
    path: "/",
    name: "index",
    redirect: "/upload",
    component: () => import("@/views/index/index.vue"),
  },
  {
    path: "/upload",
    name: "upload",
    component: () => import("@/views/upload/index.vue"),
  },

  {
    path: "/echarts",
    name: "echarts",
    component: () => import("@/views/echarts/index.vue"),
  },
];
