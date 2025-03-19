<!-- C:\Users\王硕\Desktop\毕设\housing-rental-system-frontend\新建文件夹\vue-demo\src\layouts\MainLayout.vue -->
<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="main-container">
    <!-- 侧边导航 -->
    <el-aside width="200px" class="sidebar">
      <!-- 新增标题容器 -->
      <div class="title-container">
        <h1 class="system-title">房屋租赁系统</h1>
      </div>
      <el-menu
        router
        :default-active="$route.path"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <template v-for="item in menuItems" :key="item.path">
          <!-- 有子菜单的情况 -->
          <el-sub-menu v-if="item.children" :index="item.path">
            <template #title>
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.path"
              :index="child.path"
            >
              {{ child.title }}
            </el-menu-item>
          </el-sub-menu>

          <!-- 无子菜单的情况 -->
          <el-menu-item v-else :index="item.path">
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <div class="main-content">
      <NavBar />
      <div class="content-wrapper">
        <router-view v-slot="{ Component }">
          <keep-alive :include="cachedViews">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  User,
  House,
  Document,
  Setting,
  HomeFilled,
} from "@element-plus/icons-vue";
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";
const cachedViews = ref(["Home", "TenantList"]);

// 菜单配置
const menuItems = [
  {
    title: "首页",
    icon: HomeFilled,
    path: "/home",
  },
  {
    title: "用户管理",
    icon: User,
    path: "/user",
    children: [
      { title: "租户管理", path: "/user/tenant" },
      { title: "房东管理", path: "/user/landlord" },
    ],
  },
  {
    title: "房屋管理",
    icon: House,
    path: "/house",
    children: [
      { title: "房源列表", path: "/house/list" },
      { title: "房源审核", path: "/house/approve" },
    ],
  },
  {
    title: "订单管理",
    icon: Document,
    path: "/order",
  },
  {
    title: "系统设置",
    icon: Setting,
    path: "/setting",
  },
];
</script>

<style scoped>
.main-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  background-color: #304156;
  height: 100vh;
  transition: width 0.3s;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  background-color: #2b2f3a;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-wrapper {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
.title-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b2f3a;
}

.system-title {
  color: #fff;
  font-size: 18px;
  white-space: nowrap; /* 禁止换行 */
  padding: 0 15px;
  width: 100%;
  text-align: center;
}
</style>
