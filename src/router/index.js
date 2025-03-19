import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: { guestOnly: true }, // 仅未登录可访问
  },
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home.vue"),
        meta: { requiresAuth: true },
      },
      // 其他需要导航栏的页面...
    ],
  },
  {
    path: "/:catchAll(.*)", // 捕获所有未定义路由
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // 假设使用token验证

  // 需要登录且未登录
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  }
  // 已登录但访问登录页
  else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
