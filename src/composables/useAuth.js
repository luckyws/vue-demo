// 文件路径：src/composables/useAuth.js
import { computed } from "vue";

export const useAuth = () => {
  // 认证状态
  const isAuthenticated = computed(() => !!localStorage.getItem("token"));

  // 退出登录
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // 触发全局状态更新
  };

  return {
    isAuthenticated,
    logout,
  };
};
