<script setup>
import Map from '@/components/map/map2.vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map.store'
const mapStore = useMapStore()
const { allMaps } = storeToRefs(mapStore)
import { ref } from 'vue'
const mapOptions = ref([
    { name: 'The Island', img: 'TheCenterMap.jpg' },
    {
        name: 'Scorched Earth', img: 'TheCenterMap.jpg'
    },
    {
        name: 'The Center', img: 'TheCenterMap.jpg'
    },
    { name: 'Aberration', img: 'TheCenterMap.jpg' },
])
const selectedMap = ref()
const addMap = () => {
    mapStore.createMap(selectedMap.value)
}
</script>
<template>
    <div>
        <div class="container">
            <template v-for="map in allMaps" :key="map.name">
                <Map :map="map" />
            </template>
            <div class="addMap">
                <select name="" id="" v-model="selectedMap">
                    <option v-for="map in mapOptions" :key="map" :value="map.name">{{ map.name }}
                    </option>
                </select>
                <button @click="addMap">Add Map</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    /* width: 500px; */
    margin: 0 auto;
    /* padding: 10px; */
    margin-bottom: 1em;
    height: 100vh;
}

.addMap {
    margin-top: 20em;
    display: flex;
    flex-direction: column;
    outline: 5px solid red;
}
</style>


<!-- <script setup>
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
</style> -->