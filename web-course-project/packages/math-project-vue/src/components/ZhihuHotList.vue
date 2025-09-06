<!-- <script lang="ts" setup>
import { onMounted, ref } from 'vue';

const list = ref<ZhiHuHot[]>([]);

const api = 'https://m1.apifoxmock.com/m1/7074910-0-default'
const getData = async () => {
  const url = `${api}/zhihuHot/list`
  let response = await fetch(url);
  const res: ZhiHuHotList = await response.json();
  list.value = res.data;
};

onMounted(() => {
  getData();
});

const toggleHot = (id: number) => {
  window.open(`https://www.zhihu.com/question/${id}`);
};
</script>

<template>
  <div>{{list}}</div>
</template>
 -->
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

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
const isDark = ref(false);
const currentTheme = ref('default');

const api = 'https://m1.apifoxmock.com/m1/7074910-0-default'
const getData = async () => {
  try {
    const url = `${api}/zhihuHot/list`
    let response = await fetch(url);
    const res: ZhiHuHotList = await response.json();
    list.value = res.data;
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

onMounted(() => {
  getData();
  
  // 检查本地存储的设置
  const savedDarkMode = localStorage.getItem('darkMode');
  const savedTheme = localStorage.getItem('theme');
  
  if (savedDarkMode) {
    isDark.value = savedDarkMode === 'true';
    document.documentElement.classList.toggle('dark', isDark.value);
  }
  
  if (savedTheme) {
    currentTheme.value = savedTheme;
    document.body.className = savedTheme;
  }
});

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('darkMode', isDark.value.toString());
};

const changeTheme = (theme: string) => {
  currentTheme.value = theme;
  localStorage.setItem('theme', theme);
  document.body.className = theme;
};

const getRankClass = (index: number) => {
  if (index < 3) {
    return [
      'text-white',
      index === 0 ? 'bg-red-500' : 
      index === 1 ? 'bg-orange-500' : 'bg-yellow-500'
    ];
  }
  return [
    isDark.value ? 'bg-dark-500 text-gray-300' : 'bg-gray-200 text-gray-700'
  ];
};

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

const toggleHot = (id: number) => {
  window.open(`https://www.zhihu.com/question/${id}`);
};

// 根据当前主题返回对应的边框类名
const getBorderClass = () => {
  return 'border-l-4 border-primary';
};

const setLightMode = () => {
  isDark.value = false;
  document.documentElement.classList.remove('dark');
  localStorage.setItem('darkMode', 'false');
};

const setDarkMode = () => {
  isDark.value = true;
  document.documentElement.classList.add('dark');
  localStorage.setItem('darkMode', 'true');
};
</script>

<template>
  <div class="min-h-screen" :class="[`theme-${currentTheme}`, { 'dark': isDark }]">
    <div class="max-w-4xl mx-auto p-4">
      <!-- 主题切换展示区域 -->
      <div class="theme-demo mt-4 p-6 rounded-xl mb-6">
        <div class="flex justify-center items-center space-x-4 mb-4">
          <div class="flex items-center">
            <img src="https://vitejs.dev/logo.svg" alt="Vite" class="w-12 h-12 mr-2">
            <img src="https://vuejs.org/images/logo.png" alt="Vue" class="w-12 h-12">
          </div>
        </div>
        
        <div class="flex justify-center space-x-4 mb-4">
          <button 
            @click="setLightMode"
            class="px-4 py-2 rounded-lg transition-colors"
            :class="!isDark ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
          >
            Light
          </button>
          <button 
            @click="setDarkMode"
            class="px-4 py-2 rounded-lg transition-colors"
            :class="isDark ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
          >
            Dark
          </button>
        </div>
        
        <div class="flex justify-center items-center space-x-2 mb-4">
          <span class="text-lg font-semibold">主题切换</span>
          <button 
            v-for="theme in ['default', 'peaple', 'spring']"
            :key="theme"
            @click="changeTheme(theme)"
            class="px-4 py-2 rounded-lg transition-colors"
            :class="currentTheme === theme ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'"
          >
            {{ theme }}
          </button>
        </div>
        
        <div class="flex justify-center space-x-4">
          <button 
            v-for="color in ['primary', 'warning', 'danger', 'info']"
            :key="color"
            class="px-4 py-2 rounded-lg transition-colors"
            :class="`bg-${color} text-white`"
          >
            {{ color }}
          </button>
        </div>
      </div>

      <!-- Header with controls -->
      <div class="header flex justify-between items-center mb-6 p-4 rounded-xl"
           :class="isDark ? 'bg-dark-800' : 'bg-white'">
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-800'">知乎热榜</h1>
        <div class="controls flex gap-2">
          <!-- Dark mode toggle -->
          <button 
            @click="toggleDarkMode"
            class="p-2 rounded-lg transition-colors"
            :class="isDark ? 'bg-dark-700 hover:bg-dark-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'"
            :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
          >
            <div v-if="isDark" class="i-carbon-sun w-5 h-5 text-yellow-400"></div>
            <div v-else class="i-carbon-moon w-5 h-5 text-gray-700"></div>
          </button>
          
          <!-- Theme selector -->
          <select 
            @change="changeTheme(($event.target as HTMLSelectElement).value)"
            :value="currentTheme"
            class="px-3 py-2 rounded-lg border-none outline-none transition-colors"
            :class="isDark ? 'bg-dark-700 text-white' : 'bg-gray-100 text-gray-800'"
          >
            <option value="default">默认主题</option>
            <option value="peaple">优雅主题</option>
            <option value="spring">春意主题</option>
          </select>
        </div>
      </div>

      <!-- Hot list items -->
      <div class="hotlist-container space-y-4">
        <div 
          v-for="(item, index) in list" 
          :key="item.id"
          @click="toggleHot(item.target?.id)"
          class="hotlist-item rounded-xl p-4 transition-all duration-300 cursor-pointer"
          :class="[
            isDark ? 'bg-dark-800 hover:bg-dark-700' : 'bg-white hover:bg-gray-50',
            getBorderClass()
          ]"
        >
          <div class="item-header flex items-start">
            <!-- Rank -->
            <div 
              class="rank mr-3 mt-1 w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold"
              :class="getRankClass(index)"
            >
              {{ index + 1 }}
            </div>
            
            <!-- Content -->
            <div class="content flex-1">
              <h2 class="text-lg font-semibold mb-2" 
                  :class="isDark ? 'text-white' : 'text-gray-800'">
                {{ item.target?.title }}
              </h2>
              
              <p class="text-sm mb-3 line-clamp-2" 
                 :class="isDark ? 'text-gray-300' : 'text-gray-600'">
                {{ item.target?.excerpt }}
              </p>
              
              <!-- Author info -->
              <div class="author-info flex items-center text-sm" 
                   :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                <img 
                  v-if="item.target?.author?.avatar_url"
                  :src="item.target.author.avatar_url" 
                  :alt="item.target.author.name"
                  class="w-6 h-6 rounded-full mr-2"
                >
                <span>{{ item.target?.author?.name }}</span>
                <span class="mx-2">•</span>
                <span>{{ item.target?.created ? formatTime(item.target.created) : '' }}</span>
              </div>
              
              <!-- Stats -->
              <div class="stats flex mt-3 text-sm">
                <span class="flex items-center mr-4" 
                      :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  <div class="i-carbon-chat mr-1"></div>
                  {{ item.target?.comment_count }}
                </span>
                <span class="flex items-center mr-4" 
                      :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  <div class="i-carbon-user-following mr-1"></div>
                  {{ item.target?.follower_count }}
                </span>
                <span class="flex items-center" 
                      :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  <div class="i-carbon-answer mr-1"></div>
                  {{ item.target?.answer_count }}
                </span>
              </div>
            </div>
            
            <!-- Trend indicator -->
            <div class="trend flex flex-col items-center">
              <div 
                v-if="item.trend && item.trend > 0" 
                class="trend-up text-red-500 flex flex-col items-center"
              >
                <div class="i-carbon-arrow-up text-lg"></div>
                <span class="text-xs">+{{ item.trend }}</span>
              </div>
              <div 
                v-else-if="item.trend && item.trend < 0" 
                class="trend-down text-blue-500 flex flex-col items-center"
              >
                <div class="i-carbon-arrow-down text-lg"></div>
                <span class="text-xs">{{ item.trend }}</span>
              </div>
              <div v-else class="trend-stable text-gray-500">
                <div class="i-carbon-subtract text-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-demo {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
}

.theme-demo button {
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.theme-demo button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dark .theme-demo {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.hotlist-item {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left-width: 4px;
}

.dark .hotlist-item {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.header {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.dark .header {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}
</style>