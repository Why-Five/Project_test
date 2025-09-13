// src/composables/useApi.ts
import { ref } from 'vue'

// 你的 Apifox Mock 地址
const API_BASE = 'http://127.0.0.1:4523/m1/5287618-4956661-default'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async (url: string) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE}${url}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (err) {
      console.error('API Error:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchData
  }
}