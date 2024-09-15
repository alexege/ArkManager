<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
const { user } = storeToRefs(authStore)
</script>
<template>
  <div>
    <span v-if="user">Welcome, {{ user?.username }}</span>

    <div>
      <h2>Config</h2>
      <div class="container">
        <label class="item">
          <img src="/images/icons/BlackPearl_Icon.webp" alt="map">
          <div class="spacer"></div>
          <span class="item-content">
            Black Pearls
          </span>
        </label>
      </div>
    </div>

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

.spacer {
  height: 100%;
  width: 1px;
  background-color: rgb(241 245 249);
}

.item-content {
  margin-left: 0.5rem;
  flex: 1 1 auto;
  width: 11rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 500;
}
</style>