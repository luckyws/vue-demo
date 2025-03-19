<template>
  <div class="nav-header">
    <!-- 动态标签区 -->
    <div class="tags-container">
      <el-tag
        v-for="(tag, index) in tags"
        :key="index"
        :closable="!tag.meta?.fixedTag"
        @close="handleCloseTag(index)"
        @click="handleTagClick(tag)"
        :type="$route.path === tag.path ? 'primary' : 'info'"
      >
        {{ tag.title }}
      </el-tag>
    </div>

    <!-- 右侧功能区 -->
    <div class="right-menu">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon @click="toggleFullScreen">
          <Expand v-if="!isFullscreen" />
          <Fold v-else />
        </el-icon>
      </el-tooltip>

      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="30" />
          <span class="username">Admin</span>
        </span>
        <template #dropdown>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTagsStore } from '@/stores/tags'
import { useAuth } from '@/composables/useAuth'
import { Expand, Fold } from '@element-plus/icons-vue'

const router = useRouter()
const tagsStore = useTagsStore()
const { logout } = useAuth()
const isFullscreen = ref(false)

const tags = computed(() => tagsStore.tags)

const toggleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
    isFullscreen.value = !screenfull.isFullscreen
  }
}

const handleCloseTag = async (index) => {
  const tag = tags.value[index]
  tagsStore.delTag(tag.path)
  
  if (router.currentRoute.value.path === tag.path) {
    await router.replace(tags.value[tags.value.length - 1]?.path || '/home')
  }
}

const handleTagClick = (tag) => {
  router.push(tag.path)
}
</script>

<style scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.tags-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.right-menu {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: var(--el-bg-color-page);
}

:deep(.el-dropdown) {
  border: none;
  outline: none;
}
</style>