<!-- C:\Users\王硕\Desktop\毕设\housing-rental-system-frontend\新建文件夹\vue-demo\src\App.vue -->
<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* 消除默认边距 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 固定视口尺寸 */
html,
body,
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden; /* 禁用全局滚动条 */
}

/* 主容器适配 */
.main-container {
  height: 100vh;
  display: flex;
  overflow: hidden; /* 禁用内部滚动 */
}

/* 内容区域滚动控制 */
.content-wrapper {
  flex: 1;
  overflow-y: auto; /* 仅允许内容区域垂直滚动 */
  padding: 20px;
}
</style>
