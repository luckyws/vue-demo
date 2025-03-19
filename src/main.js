// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus"; // 确保已导入
import "element-plus/dist/index.css"; // 必须引入样式

const app = createApp(App);
app.use(router);
app.use(ElementPlus); // 必须注册插件
app.mount("#app");
