<!-- C:\Users\王硕\Desktop\毕设\housing-rental-system-frontend\新建文件夹\vue-demo\src\views\Login.vue -->
<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="title">系统登录</h2>

      <el-form :model="formData" @submit.prevent="handleSubmit">
        <el-form-item prop="account">
          <el-input
            v-model="formData.account"
            placeholder="请输入账号"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>

        <el-button
          type="primary"
          native-type="submit"
          :loading="loading"
          size="large"
          class="login-btn"
        >
          {{ loading ? "登录中..." : "立即登录" }}
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/api";

const router = useRouter();
const route = useRoute();

// 响应式数据
const formData = reactive({
  account: "",
  password: "",
});
const loading = ref(false);

// 提交处理
const handleSubmit = async () => {
  try {
    loading.value = true;
    const { data: token } = await api.auth.login(formData);
    localStorage.setItem("token", token);
    const redirectPath = route.query.redirect || "/home";
    router.replace(redirectPath);
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--el-bg-color-page);
}

.login-card {
  width: 420px;
  padding: 40px;
  background: var(--el-bg-color);
  border-radius: var(--el-border-radius-round);
  box-shadow: var(--el-box-shadow-dark);
}

.login-card .title {
  text-align: center;
  margin-bottom: 40px;
  color: var(--el-text-color-primary);
  font-size: 24px;
  font-weight: 500;
}

:deep(.el-form-item) {
  margin-bottom: 24px;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .login-card {
    width: 90%;
    padding: 20px;
    margin: 10px;
  }
}
</style>
