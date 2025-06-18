<script setup>
import Map from '@/components/map/map.vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map.store'
import { ref, computed } from 'vue'

// Store and map data
const mapStore = useMapStore()
const { allMaps } = storeToRefs(mapStore)

// Carousel map options
const mapOptions = ref([
    { name: 'The Island', img: '../../public/assets/maps/TheIsland.png' },
    { name: 'Scorched Earth', img: '../../public/assets/maps/ScorchedEarth.png' },
    { name: 'The Center', img: '../../public/assets/maps/TheCenterMap.jpg' },
    { name: 'Aberration', img: '../../public/assets/maps/Aberration.png' },
    { name: 'Astraeos', img: '../../public/assets/maps/Astraeos.png' },
    { name: 'Extinction', img: '../../public/assets/maps/Extinction.png' },
])

// Selected map name
const selectedMapName = ref(mapOptions.value[0].name)

// Add map to store
const addMap = () => {
    mapStore.createMap(selectedMapName.value)
}
</script>
<template>
    <div>
        <div class="container">
            <!-- Map Thumbnails -->
            <div class="thumbnail-list">
                <div v-for="map in mapOptions" :key="map.name" class="thumbnail"
                    :class="{ active: map.name === selectedMapName }" @click="selectedMapName = map.name">
                    <img :src="map.img" :alt="map.name" />
                    <p>{{ map.name }}</p>
                </div>
            </div>
            <div class="addMap">
                Add a new Map
                <select name="" id="" v-model="selectedMapName">
                    <option v-for="map in mapOptions" :key="map" :value="map.name">{{ map.name }}</option>
                </select>
                <button @click="addMap">Add Map</button>
            </div>
            <template v-for="map in allMaps" :key="map.name">
                <Map :map="map" />
            </template>
        </div>
    </div>
</template>
<style scoped>
/* .container {
    margin: 0 auto;
    margin-bottom: 1em;
    height: 100vh;
}
.addMap {
    display: flex;
    flex-direction: column;
    outline: 5px solid red;
} */
.container {
    margin: 0 auto;
    /* height: 100vh; */
    display: flex;
    flex-direction: column;
    gap: 1em;
}

/* Thumbnail Styles */
.thumbnail-list {
    display: flex;
    gap: 1em;
    overflow-x: auto;
    padding: 1em 0;
}

.thumbnail {
    text-align: center;
    cursor: pointer;
    border: 2px solid transparent;
    padding: 0.5em;
    border-radius: 6px;
    transition: border 0.3s;
}

.thumbnail img {
    width: 100px;
    height: auto;
    object-fit: cover;
}

.thumbnail.active {
    /* border-color: #007BFF; */
    border-color: cyan;
    background-color: #f0f8ff;
}

.addMap {
    display: flex;
    flex-direction: column;
    width: 10em;
    margin: 0 auto;
    text-align: center;
}

.addMap select,
.addMap button {
    width: 100%;
}
</style>
