<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="form" @submit.prevent="handleLogin">
      <el-form-item label="用户名">
        <el-input v-model="form.account" placeholder="请输入账号" />
      </el-form-item>

      <el-form-item label="密码">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>

      <el-button type="primary" native-type="submit" :loading="loading">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import api from "@/api";

export default {
  methods: {
    async handleLogin() {
      try {
        const token = await api.login(this.form);
        localStorage.setItem("token", token);
        this.$router.replace("/home");
      } catch (error) {
        this.$message.error("登录失败");
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 0 auto;
  margin-top: 20%;
}
</style>
