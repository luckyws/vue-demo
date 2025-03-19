<template>
  <el-header class="nav-header">
    <div class="left-section">
      <router-link to="/" class="logo">系统名称</router-link>
      <el-menu :default-active="$route.path" mode="horizontal" router>
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/profile">个人中心</el-menu-item>
      </el-menu>
    </div>

    <div class="right-section">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
          <span class="username">Admin</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      this.$router.replace("/login");
      this.$message.success("已安全退出");
    },
  },
};
</script>

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
