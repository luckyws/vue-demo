// main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "@/api/request";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(ElementPlus);
app.use(router).mount("#app");
