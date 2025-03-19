// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import { useTagsStore } from "@/stores/tags";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ElementPlus);
const initApp = () => {
  const tagsStore = useTagsStore();
  tagsStore.init();
};

app.mount("#app");
initApp();
