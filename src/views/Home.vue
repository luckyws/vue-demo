<template>
  <div>
    <h1>欢迎来到首页</h1>
    <p>当前Token: {{ token }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const token = ref(localStorage.getItem("token"));
</script>
