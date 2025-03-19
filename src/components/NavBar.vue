<!-- 文件路径：src/components/NavBar.vue -->
<script setup>
import { useAuth } from "@/composables/useAuth";

const { isAuthenticated, logout } = useAuth();
</script>

<template>
  <el-dropdown v-if="isAuthenticated">
    <span class="user-info">
      <el-avatar :size="30" />
      <span class="username">Admin</span>
    </span>
    <template #dropdown>
      <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
    </template>
  </el-dropdown>
</template>

<style scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.left-section {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 20px;
  margin-right: 30px;
  color: #409eff;
  text-decoration: none;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 15px;
}

.username {
  margin-left: 10px;
  color: #606266;
}
</style>
