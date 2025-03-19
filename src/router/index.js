// C:\Users\王硕\Desktop\毕设\housing-rental-system-frontend\新建文件夹\vue-demo\src\router\index.js
import { createRouter, createWebHistory } from "vue-router";

// 先定义路由配置（不要包含任何router引用）
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    redirect: "/home", // 关键：添加根路径重定向
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

// 创建路由实例（此时才能使用router变量）
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const hasToken = localStorage.getItem("token");
  console.log(
    `[路由守卫] 目标: ${to.path}, Token: ${hasToken ? "有效" : "无效"}`
  );

  // 需要认证的页面
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (hasToken) {
      console.log("[放行] 已认证用户访问受保护页面");
      next();
    } else {
      console.log(`[重定向] 未登录用户尝试访问 ${to.path}`);
      next({
        name: "login",
        query: { redirect: to.fullPath }, // 保留原始目标路径
      });
    }
  }
  // 仅允许未登录访问的页面
  else if (to.matched.some((record) => record.meta.guestOnly)) {
    if (hasToken) {
      console.log(`[重定向] 已登录用户访问登录页`);
      next({ name: "home" });
    } else {
      console.log("[放行] 未登录用户访问登录页");
      next();
    }
  }
  // 其他页面
  else {
    console.log("[放行] 公开页面");
    next();
  }
});

// 导出实例（必须放在文件最后）
export default router;
