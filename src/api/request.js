import axios from "axios";

// 创建一个axios实例，用于发送HTTP请求
const service = axios.create({
  // 设置请求超时时间
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  // 从localStorage获取用户token
  const token = localStorage.getItem("token");
  // 如果token存在，则在请求头中添加Authorization字段
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // 返回配置好的请求
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 获取响应数据
    const res = response.data;
    // 打印响应数据，用于调试
    console.log("res", res);
    // 处理业务错误（非200状态码）
    if (res.code != 200) {
      // 抛出错误，并包含错误信息
      return Promise.reject(new Error(res.message || "Error"));
    }
    // 返回实际数据
    return res.data;
  },
  (error) => {
    // 处理HTTP状态码错误
    if (error.response?.status === 401) {
      // 当JWT失效时，移除localStorage中的token，并重定向到登录页
      localStorage.removeItem("token");
      router.replace("/login");
    }
    // 抛出错误
    return Promise.reject(error);
  }
);

// 导出配置好的axios实例
export default service;
