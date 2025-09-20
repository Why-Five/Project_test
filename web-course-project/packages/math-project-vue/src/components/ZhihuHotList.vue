<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { isDark, toggleTheme } from '../types/dark';
import { showDialog } from '../utils/useDialog';

// 简化的类型定义
interface Author {
  name: string;
  avatar_url: string;
}

interface Target {
  id: number;
  title: string;
  excerpt: string;
  created: number;
  comment_count: number;
  follower_count: number;
  answer_count: number;
  author: Author;
}

interface ZhiHuHot {
  id: number;
  target: Target;
  trend?: number;
}

interface ZhiHuHotList {
  data: ZhiHuHot[];
}

const list = ref<ZhiHuHot[]>([]);
const loading = ref(true);
const error = ref('');

// 数据获取
const api = 'https://m1.apifoxmock.com/m1/7074910-0-default';
const getData = async () => {
  loading.value = true;
  error.value = '';

  try {
    const url = `${api}/zhihuHot/list`;
    const response = await fetch(url);
    const res: ZhiHuHotList = await response.json();
    list.value = res.data;
  } catch (err) {
    error.value = '获取数据失败，请稍后重试';
    console.error('获取数据失败:', err);
  } finally {
    loading.value = false;
  }
};

// 测试弹窗方法
const testDialog = () => {
  showDialog({
    title: '测试弹窗',
    content: '11111111。',
    onConfirm: () => {
      console.log('用户点击了确定');
    },
    onCancel: () => {
      console.log('用户点击了取消');
    },
    onClose: () => {
      console.log('弹窗关闭了');
    }
  });
};

// 时间格式化
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000 / 60; // 分钟差

  if (diff < 60) {
    return `${Math.floor(diff)}分钟前`;
  } else if (diff < 1440) { // 24小时
    return `${Math.floor(diff / 60)}小时前`;
  } else {
    return `${Math.floor(diff / 1440)}天前`;
  }
};

// 打开问题链接
const toggleHot = (id: number) => {
  window.open(`https://www.zhihu.com/question/${id}`, '_blank');
};

// 组件挂载时获取数据
onMounted(() => {
  getData();
});
</script>

<template>
  <div class="min-h-screen transition-colors duration-300"
    :class="isDark ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'">
    <div class="max-w-4xl mx-auto p-4">
      <!-- 页面头部 -->
      <header class="flex justify-between items-center py-4 mb-6">
        <h1 class="text-2xl font-bold">知乎热榜</h1>

        <!-- 按钮区域 -->
        <div class="flex gap-3">
          <!-- 测试弹窗按钮 -->
          <button class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            @click="testDialog">
            测试弹窗
          </button>

          <!-- 暗黑模式切换按钮 -->
          <button @click="toggleTheme($event)"
            class="p-3 rounded-full transition-all duration-300 transform hover:scale-110"
            :class="isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'" aria-label="切换主题模式">
            <div v-if="isDark" class="i-carbon-sun w-5 h-5 text-yellow-400"></div>
            <div v-else class="i-carbon-moon w-5 h-5 text-gray-700"></div>
          </button>
        </div>
      </header>

      <!-- 加载状态 -->
      <div v-if="loading" class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          :class="isDark ? 'border-blue-400' : 'border-blue-500'"></div>
      </div>

      <!-- 错误提示 -->
      <div v-else-if="error" class="flex justify-center items-center py-16">
        <div class="text-center p-6 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-white shadow-md'">
          <p class="text-red-500 mb-4">{{ error }}</p>
          <button @click="getData()" class="px-4 py-2 rounded-md transition-colors"
            :class="isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'">
            重试
          </button>
        </div>
      </div>

      <!-- 热榜列表 -->
      <div v-else class="space-y-3">
        <div v-for="(item, index) in list" :key="item.id" @click="toggleHot(item.target?.id)"
          class="rounded-lg p-4 transition-all duration-300 cursor-pointer transform hover:translate-x-1"
          :class="isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 shadow-sm'">
          <!-- 排名和内容区域 -->
          <div class="flex items-start">
            <!-- 排名 -->
            <div
              class="w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mr-3 mt-0.5 flex-shrink-0"
              :class="[
                index < 3 ? 'text-white' : isDark ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-gray-200',
                index === 0 ? 'bg-red-500' : index === 1 ? 'bg-orange-500' : index === 2 ? 'bg-yellow-500' : ''
              ]">
              {{ index + 1 }}
            </div>

            <!-- 内容区域 -->
            <div class="flex-1">
              <!-- 标题 -->
              <h2 class="text-base font-semibold mb-2 line-clamp-2" :class="isDark ? 'text-white' : 'text-gray-800'">
                {{ item.target?.title }}
              </h2>

              <!-- 摘要 -->
              <p v-if="item.target?.excerpt" class="text-sm mb-3 line-clamp-2"
                :class="isDark ? 'text-gray-300' : 'text-gray-600'">
                {{ item.target.excerpt }}
              </p>

              <!-- 底部信息 -->
              <div class="flex flex-wrap items-center text-xs gap-x-4 gap-y-2"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                <!-- 作者信息 -->
                <div v-if="item.target?.author" class="flex items-center">
                  <img v-if="item.target.author.avatar_url" :src="item.target.author.avatar_url"
                    :alt="item.target.author.name" class="w-4 h-4 rounded-full mr-1">
                  <span>{{ item.target.author.name }}</span>
                </div>

                <!-- 时间 -->
                <div v-if="item.target?.created" class="flex items-center">
                  <span>{{ formatTime(item.target.created) }}</span>
                </div>

                <!-- 统计信息 -->
                <div v-if="item.target" class="flex items-center space-x-4 mt-1">
                  <span v-if="item.target.comment_count" class="flex items-center">
                    评论: {{ item.target.comment_count }}
                  </span>
                  <span v-if="item.target.follower_count" class="flex items-center">
                    关注: {{ item.target.follower_count }}
                  </span>
                  <span v-if="item.target.answer_count" class="flex items-center">
                    回答: {{ item.target.answer_count }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 基础样式重置 */
* {
  box-sizing: border-box;
}

/* 暗黑模式基础样式 */
.dark {
  color-scheme: dark;
}

/* 滚动条样式 - 仅在Webkit浏览器中生效 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(156, 163, 175, 0.5);
}

.dark ::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
}
</style>