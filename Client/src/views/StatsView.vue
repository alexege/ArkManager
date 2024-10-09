<script setup>
import statViewVue from '@/components/stats/statView.vue'
</script>
<template>
    <div class="stats-container">

        <statViewVue />

    </div>
</template>
<style scoped>
.stats-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: black;
}
</style>