<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import Point from '@/components/map/point.vue'
import { useMapStore } from '@/stores/map.store'
const mapStore = useMapStore()
const { createPoint, deletePoint } = mapStore
const props = defineProps(['map'])
const mousePosition = ref('Original X: 0, Y: 0')
const scale = ref(1) // Track the current scale
const minScale = 0.5 // Minimum scale (original size)
const isDragging = ref(false)
const dragStartPosition = ref({ x: 0, y: 0 })
const translate = ref({ x: 0, y: 0 }) // Track the translation
const imageSrc = props.map.img // Use the image source from props
import Tabs from '@/components/tabs/tabs.vue'
// Crosshairs
const onMouseDown = (event) => {
    event.preventDefault()
    isDragging.value = true
    dragStartPosition.value = {
        x: event.offsetX - translate.value.x,
        y: event.offsetY - translate.value.y
    }
}
const parentMousePosition = ref({ x: 0, y: 0 })
const onContainerMouseMove = (event) => {
    const container = document.querySelector('.map')
    const rect = container.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top
    parentMousePosition.value = { x: offsetX, y: offsetY }
}
const onMouseMove = (event) => {
    mousePosition.value = { x: event.offsetX, y: event.offsetY }
    if (isDragging.value) {
        const deltaX = event.movementX // Change in X since the last mouse event
        const deltaY = event.movementY // Change in Y since the last mouse event
        // Update translate values based on mouse movement
        translate.value.x += deltaX
        translate.value.y += deltaY
    }
}
const onMouseUp = () => {
    isDragging.value = false
    console.log(`scale: ${scale.value}`)
    if (scale.value < 1) {
        console.log('Animate back into place')
        resetMap()
    }
}
const onMouseLeave = () => {
    isDragging.value = false
}
const onWheel = (event) => {
    event.preventDefault()
    const mapContainer = event.currentTarget // Reference to the map container
    const rect = mapContainer.getBoundingClientRect() // Get the bounding rect
    // Get mouse position relative to the container
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    // Determine zoom direction
    const zoom = event.deltaY < 0 ? 1.1 : 0.9
    const newScale = scale.value * zoom
    if (newScale < minScale) {
        resetMap()
        return
    }
    if (newScale >= minScale) {
        // Calculate scale factor
        const scaleFactor = newScale / scale.value
        // Adjust the translation based on mouse position
        translate.value.x = mouseX - (mouseX - translate.value.x) * scaleFactor
        translate.value.y = mouseY - (mouseY - translate.value.y) * scaleFactor
        // Update scale
        scale.value = newScale
    }
}
// Reset Map
const resetMap = () => {
    scale.value = 1
    translate.value.x = 0
    translate.value.y = 0
}
// Point Logic
const onDoubleClick = (event, mapId) => {
    event.preventDefault()
    createPoint(mapId, event.offsetX, event.offsetY)
}
onMounted(() => {
    document.addEventListener('mouseup', onMouseUp)
})
onBeforeUnmount(() => {
    document.removeEventListener('mouseup', onMouseUp)
})
const transitionStyle = computed(() => {
    return scale.value <= minScale ? 'all 0.5s ease-out' : 'none'
})
const deleteAPoint = (mapId, pointId) => {
    deletePoint(mapId, pointId)
}
import Tab from '@/components/tabs/tab.vue'
</script>
<template>
    <div class="map-container" @mousemove="onContainerMouseMove">
        <div class="overlay">
            <button @click="resetMap" class="reset">Reset Map</button>
            <div>Lat: {{ mousePosition.x }}, Lon: {{ mousePosition.y }}</div>
        </div>
        {{ transitionStyle }}
        <h2>{{ map.name }}</h2>
        <div class="two-column">
            <div class="map" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseleave="onMouseLeave"
                @wheel="onWheel" @dblclick="onDoubleClick($event, map.id)"
                :style="{ cursor: isDragging ? 'grabbing' : 'crosshair' }">
                <div class="image-container" :style="{
                    transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                    transition: transitionStyle
                }">
                    <div class="points">
                        <Point v-for="point in map.points" :key="point.name" :points="point" :style="{
                            position: 'absolute',
                            zIndex: '100',
                            left: point.x + 'px',
                            top: point.y + 'px'
                        }" />
                    </div>
                    <img :src="imageSrc" alt="Map Image" class="map-image" width="400" height="400" />
                </div>
                <span class="vertical-line" :style="{ left: parentMousePosition.x + 'px' }"></span>
                <span class="horizontal-line" :style="{ top: parentMousePosition.y + 'px' }"></span>
            </div>
            <Tabs>
                <tab title="points">
                    <div class="points-container">
                        <ul>
                            <li v-for="point in map.points" :key="point">
                                {{ point.x }}, {{ point.y }} -
                                <a @click="deleteAPoint(map.id, point.id)">
                                    <span class="material-symbols-outlined"> delete </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </tab>
                <tab title="tab 2">
                    <h3>This is tab 2</h3>
                </tab>
            </Tabs>

        </div>
    </div>
</template>
<style scoped>
* {
    color: white;
}

.two-column {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.map-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    outline: 2px solid white;
    position: relative;
}

.map {
    position: relative;
    overflow: hidden;
    width: 100%;
    /* Add appropriate width */
    height: 400px;
    /* Set fixed height */
}

.points-container {
    width: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 0.75em;
}

.points-container span {
    font-size: 1em;
    cursor: pointer;
}

.points-container span:hover {
    color: yellow;
}

.image-container {
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: top left;
    /* Set origin for scaling */
}

.map-image {
    display: block;
    /* Remove inline spacing */
}

.vertical-line,
.horizontal-line {
    position: absolute;
    pointer-events: none;
}

.vertical-line {
    width: 2px;
    height: 100%;
    background: white;
}

.horizontal-line {
    height: 2px;
    width: 100%;
    background: white;
}

.reset {
    background: none;
    border: 1px solid white;
    cursor: pointer;
}

.reset:hover {
    background-color: white;
    color: black;
    border: none;
}

.overlay {
    display: flex;
}
</style>
