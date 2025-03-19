// C:\Users\王硕\Desktop\毕设\housing-rental-system-frontend\新建文件夹\vue-demo\src\api\request.js
import axios from "axios";
import router from "@/router";

const service = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// 请求拦截
service.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 与后端约定状态码
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || "Error"));
    }

    // 直接返回数据体
    return res.data;
  },
  (error) => {
    // 处理401错误
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      router.replace(
        `/login?redirect=${encodeURIComponent(
          router.currentRoute.value.fullPath
        )}`
      );
    }

    return Promise.reject(error);
  }
);

export default service;
