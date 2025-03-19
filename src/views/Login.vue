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
import { ElMessage } from "element-plus";

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

    // 调用接口（注意结构变化）
    const { data: token } = await api.auth.login(formData);
    console.log("Token数据:", token); // 此时token应为字符串

    // 验证Token格式
    if (typeof token !== "string" || !token.includes(".")) {
      throw new Error("无效的Token格式");
    }

    // 存储Token
    localStorage.setItem("token", token);
    console.log("存储的Token:", localStorage.getItem("token"));

    // 路由跳转（增加错误捕获）
    const redirectPath = route.query.redirect || "/home";
    await router.push(redirectPath).catch(() => {
      router.replace("/home"); // 容错处理
    });
  } catch (error) {
    console.error("登录错误详情:", error);
    ElMessage.error(
      {
        无效的Token格式: "接口返回数据异常",
        "Network Error": "网络连接失败",
      }[error.message] || "登录失败"
    );
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
