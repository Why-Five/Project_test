<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const count = ref(0)

const doubledCount = computed(() => count.value * 2)

const increment = () => {
  count.value++
}

// 如果您有国际化设置，可以这样使用
// const { t } = useI18n()
// 或者直接使用 inject
// const i18n = inject($i18n)
</script>

<template>
  <div class="test-component p-4">
    <h2 class="text-2xl font-bold mb-4">Test Component</h2>
    
    <div class="card bg-white rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold mb-2">Counter Example</h3>
      <p class="mb-4">Count: {{ count }}</p>
      <p class="mb-4">Doubled: {{ doubledCount }}</p>
      <button 
        @click="increment"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Increment
      </button>
    </div>
    
    <div class="mt-6">
      <h3 class="text-xl font-semibold mb-2">Sample List</h3>
      <ul class="list-disc pl-5">
        <li v-for="item in 3" :key="item" class="mb-1">
          List item {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.test-component {
  max-width: 600px;
  margin: 0 auto;
}
</style>