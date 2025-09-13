<template>
  <div id="app">
    <nav class="nav">
      <router-link to="/" class="nav-link">知乎热榜</router-link>
      <router-link to="/hello" class="nav-link">Hello World</router-link>
      <router-link to="/test" class="nav-link">Test</router-link>
      <router-link to="/apiTest" class="nav-link">ApiTest</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.nav {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  margin-bottom: 20px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #e9ecef;
}

.nav-link.router-link-active {
  background-color: #007bff;
  color: white;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
