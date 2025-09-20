<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useApi } from '@/composables/useApi'

interface Song {
  id: string
  songName: string
  singer: string
  date: string
  img: string
}

const { loading, error, fetchData } = useApi()
const songs = ref<Song[]>([])

const getData = async () => {
  const result = await fetchData('/api/songs')
  if (result) {
    songs.value = result
  }
}

onMounted(async () => {
  await getData()
})
</script>

<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">错误: {{ error }}</div>
    <div v-else>
      <div v-for="item in songs" :key="item.id">
        <div class="song-item">
          <img :src="item.img" alt="封面">
          <div class="song-info">
            <div class="song-name">{{ item.songName }}</div>
            <div class="song-singer">{{ item.singer }}</div>
            <div class="song-date">{{ item.date }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
