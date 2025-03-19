<template>
  <div class="main-container">
    <NavBar />
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: { NavBar },
};
</script>

<style>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  flex: 1;
  padding: 20px;
  background: #f0f2f5;
}
</style>
