<script setup>
import Map from '@/components/map/map.vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map.store'
const mapStore = useMapStore()
const { allMaps } = storeToRefs(mapStore)
</script>
<template>
    <div>
        <div class="container">
            <template v-for="map in allMaps" :key="map.name">
                <Map :map="map" />
            </template>
        </div>
    </div>
</template>
<style scoped>
.container {
    width: 500px;
    margin: 0 auto;
    padding: 10px;
    margin-bottom: 1em;
}
</style>