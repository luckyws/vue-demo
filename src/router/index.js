// C:\Users\王硕\Desktop\毕设\housing-rental-system-frontend\新建文件夹\vue-demo\src\router\index.js
import { createRouter, createWebHistory } from "vue-router";
import { useTagsStore } from "@/stores/tags"; // 正确导入

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
    redirect: "/home",
    meta: { requiresAuth: true }, // 父级路由统一设置权限
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/Home.vue"),
        meta: {
          tagName: "首页",
          fixedTag: true, // 固定标签不可关闭
        },
      },
      // 用户管理
      {
        path: "user",
        redirect: "/user/tenant",
        children: [
          {
            path: "tenant",
            name: "tenant",
            component: () => import("@/views/user/Tenant.vue"),
            meta: {
              tagName: "租户管理",
              requiresAuth: true,
            },
          },
          {
            path: "landlord",
            name: "landlord",
            component: () => import("@/views/user/Landlord.vue"),
            meta: {
              tagName: "房东管理",
              requiresAuth: true,
            },
          },
        ],
      },
      // 房屋管理
      {
        path: "house",
        redirect: "/house/list",
        children: [
          {
            path: "list",
            name: "houseList",
            component: () => import("@/views/house/List.vue"),
            meta: {
              tagName: "房屋管理",
              requiresAuth: true,
            },
          },
          {
            path: "approve",
            name: "houseApprove",
            component: () => import("@/views/house/Approve.vue"),
            meta: {
              tagName: "房屋审核",
              requiresAuth: true,
            },
          },
        ],
      },
      // 订单管理
      {
        path: "order",
        name: "order",
        component: () => import("@/views/order/List.vue"),
        meta: {
          tagName: "订单管理",
          requiresAuth: true,
        },
      },
      // 系统设置
      {
        path: "setting",
        name: "setting",
        component: () => import("@/views/Setting.vue"),
        meta: {
          tagName: "系统设置",
          requiresAuth: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const hasToken = localStorage.getItem("token");
  console.log(`[路由守卫] 目标: ${to.path}，Token状态: ${!!hasToken}`);
  const tagsStore = useTagsStore();
  // 需要认证的页面（深度匹配）
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!hasToken) {
      console.log(`[重定向] 未登录访问受保护页面：${to.path}`);
      next({ name: "login", query: { redirect: to.fullPath } });
      tagsStore.tags = tagsStore.tags.filter((t) => t.meta?.fixedTag);
      return;
    }
  }

  // 仅允许未登录访问的页面
  if (to.matched.some((record) => record.meta.guestOnly)) {
    if (hasToken) {
      console.log(`[重定向] 已登录访问登录页`);
      next({ name: "home" });
      return;
    }
  }

  next();
});
router.afterEach((to) => {
  const tagsStore = useTagsStore(); // 通过函数获取实例
  if (to.name === "login") return;
  if (to.meta.tagName && !tagsStore.tags.some((t) => t.path === to.path)) {
    tagsStore.addTag({
      path: to.path,
      title: to.meta.tagName,
      meta: { ...to.meta },
    });
  }
  tagsStore.init();
});

export default router;
