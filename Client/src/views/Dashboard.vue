<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
const { user } = storeToRefs(authStore)
</script>
<template>
  <div>
    <span v-if="user">Welcome, {{ user?.username }}</span>
    <pre>{{ user }}</pre>

  </div>
</template>
<style scoped>
.container {
  display: flex;
  margin-bottom: 0.75rem;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  word-break: break-all;
}
</style>