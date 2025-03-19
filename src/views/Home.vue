<!-- C:\Users\王硕\Desktop\毕设\housing-rental-system-frontend\新建文件夹\vue-demo\src\views\Home.vue -->
<template>
  <el-button type="primary" @click="handleClick">
    <el-icon><Plus /></el-icon>
    测试按钮
  </el-button>
</template>

<script>
import { Plus } from "@element-plus/icons-vue";

export default {
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$message.warning("请先登录");
        this.$router.replace("/login");
      }
    },
  },
};
</script>
