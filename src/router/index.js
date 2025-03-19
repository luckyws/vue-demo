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

// 后置路由守卫配置
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");

  // 需要认证但未登录 → 跳转登录页
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login", query: { redirect: to.fullPath } });
    return;
  }

  // 已登录访问登录页 → 跳转首页
  if (to.meta.guestOnly && isAuthenticated) {
    next({ name: "home" });
    return;
  }

  next();
});

// 导出实例（必须放在文件最后）
export default router;
