import { createApp } from "vue";
import "../src/assets/reset.css";
import "./style.css";
import router from "./router/index";
import component from "./components/index";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
// import "./../node_modules/element-plus/dist/index.css";
import "./design/index.scss";
import App from "./App.vue";
// import plugin from "./plugins/index";
import { HoverPopup } from "./directive/index";
import { pinia } from "@/pinia";
import "@arco-design/web-vue/dist/arco.css";
import ArcoVue from "@arco-design/web-vue";
// @ts-ignore
import SvgIcon from "@/components/SvgIcon/index.vue"; // svg组件
const app = createApp(App);

app.use(ArcoVue);
app.use(ElementPlus);
app.use(component);
app.use(router);
app.use(pinia);
app.mount("#app");

app.directive("hover-popup", HoverPopup);

// console.log("app:", app, directive);
