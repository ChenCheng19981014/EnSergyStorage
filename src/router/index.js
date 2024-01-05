/**
 * @description vue 路由管理类
 */

// import Vue from "vue"
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from "./routes"


const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router