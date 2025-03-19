// 文件路径：src/composables/useAuth.js
// src/composables/useAuth.js
import { useRouter } from "vue-router";
import { useTagsStore } from "@/stores/tags";

export const useAuth = () => {
  const router = useRouter();

  const logout = () => {
    // 清除所有存储
    localStorage.clear();

    // 重置标签状态
    const tagsStore = useTagsStore();
    tagsStore.tags = tagsStore.tags.filter((t) => t.meta?.fixedTag);

    // 强制跳转登录页并阻止返回
    window.location.replace("/login");
  };

  return { logout };
};
