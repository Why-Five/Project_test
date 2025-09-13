<script setup lang="ts">
import { inject, ref ,computed } from 'vue'
import { useMock } from "../composables/useMock";
import { onMounted } from "vue";
import { $i18n } from "../plugins/i18n";

defineProps<{ msg: string }>()

const count = ref(0)

// 添加的代码
const mock = useMock();
const list = ref();
const i18n = inject($i18n)!;

onMounted(() => {
  list.value = mock.getSongs();
});

// 添加语言切换
type Local = "zh" | "en";
const local = ref<Local>("zh");
const $t = computed(() => i18n[local.value]);

const setLocal = (type: Local) => {
  local.value = type;
};
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  
  <!-- 添加的礼堂金曲部分 -->
  <div class="mt-8">
    <h2>礼堂金曲</h2>
    <div
      v-for="item in list"
      :key="item.id"
      class="mx-auto mb-2 w-160 flex items-center gap-4"
    >
      <div class="size-10 content-center rounded-full bg-red-3">
        {{ item.id }}
      </div>
      <img :src="item.img" alt="" />
      <div>{{ item.singer }}</div>
      <div class="flex-1 text-xl font-bold">《{{ item.songName }}》</div>
      <div class="text-right">
        {{ item.date }}
      </div>
    </div>
  </div>

   <nav mt-10 flex justify-center gap-2>
    <button h-10 btn @click="setLocal('zh')">中文</button>
    <button h-10 btn @click="setLocal('en')">English</button>
  </nav>

  <h1>{{ $t.hello }} {{ $t.MilkyWay }}</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>