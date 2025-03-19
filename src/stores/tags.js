// C:\Users\王硕\Desktop\毕设\housing-rental-system-frontend\新建文件夹\vue-demo\src\stores\tags.js
import { defineStore } from "pinia";
import router from "@/router";

export const useTagsStore = defineStore("tags", {
  state: () => ({
    tags: JSON.parse(localStorage.getItem("tags"))?.filter(
      (t) => t.meta?.fixedTag || router.resolve(t.path).matched.length > 0
    ) || [{ path: "/home", title: "首页", meta: { fixedTag: true } }],
  }),
  actions: {
    addTag(tag) {
      const exists = this.tags.some((t) => t.path === tag.path);
      if (!exists) {
        this.tags.push(tag);
        localStorage.setItem("tags", JSON.stringify(this.tags));
      }
    },
    delTag(path) {
      this.tags = this.tags.filter((tag) => tag.path !== path);
      this.save(); // 确保立即持久化
    },
    init() {
      const hasToken = !!localStorage.getItem("token");
      if (!hasToken) {
        this.tags = this.tags.filter((t) => t.meta?.fixedTag);
        this.save();
      }
    },
    save() {
      localStorage.setItem(
        "tags",
        JSON.stringify(
          this.tags.filter((t) => !t.meta?.temp) // 过滤临时标签
        )
      );
    },
  },
});
