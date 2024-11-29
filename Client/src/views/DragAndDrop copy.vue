<script setup>
import { ref, onMounted } from 'vue'

import Timer from '../components/timers/Timer.vue'

const dragActive = ref(false)
const dropZones = ref([])

const storeTimers = ref([])

import { useTimerStore } from '@/stores/timer.store';
const timerStore = useTimerStore()

const timers = ref([
  { id: 0, title: 'Timer 1', cell: 0 },
  { id: 1, title: 'Timer 2', cell: 1 },
  { id: 2, title: 'Timer 3', cell: 2 },
  { id: 3, title: 'Timer 4', cell: 3 },
  { id: 4, title: 'Timer 5', cell: 4 }
])

onMounted(() => {
  for (let i = 0; i < 64; i++) {
    dropZones.value.push({
      id: i,
      title: `Zone ${i + 1}`
    })
  }

  storeTimers.value = timerStore.timers
})
const getCell = (cell) => {
  return timers.value.filter((timer) => timer.cell === cell)
}
const startDrag = (event, timer) => {
  dragActive.value = true
  event.dataTransfer.setData('timerId', timer.id)
}
const onDrop = (event, cell) => {
  dragActive.value = false
  const timerId = event.dataTransfer.getData('timerId')
  const timer = timers.value.find((timer) => timer.id == timerId)
  const existingTimer = getCell(cell)[0]
  if (existingTimer) {
    existingTimer.cell = timer.cell // Move existing timer to old cell
    timer.cell = cell // Move dragged timer to new cell
  } else {
    timer.cell = cell
  }
}
const onDragEnter = (event) => {
  const dropZone = event.target.closest('.drop-zone')
  if (dropZone) dropZone.classList.add('drag-over')
}
const onDragLeave = (event) => {
  const dropZone = event.target.closest('.drop-zone')
  if (dropZone) dropZone.classList.remove('drag-over')
}
</script>
<template>

  <div class="container">
    <div class="grid">
      <!-- {{ storeTimers }} -->
      <template v-for="(zone, index) in dropZones" :key="zone.id">
        <div class="drop-zone" :class="[{ preview: dragActive }, { 'fade-in': dragActive }]"
          @drop="onDrop($event, index)" @dragover.prevent @dragenter="onDragEnter" @dragleave="onDragLeave">

          <div v-for="timer in getCell(index)" :key="timer.id" class="drag-el">
            <button class="handle" @mousedown="(event) => {
              const dragEl = event.currentTarget.parentNode
              dragEl.setAttribute('draggable', 'true')
              dragEl.addEventListener('dragstart', (e) => startDrag(e, timer))
              dragEl.dispatchEvent(new Event('dragstart')) // Start the drag event
            }
              " @mouseup="(event) => {
                const dragEl = event.currentTarget.parentNode
                dragEl.removeAttribute('draggable')
              }
                ">
              &#x2630;
            </button>
            {{ timer }}
            <pre style="color: black">{{ timer.title }}</pre>
          </div>

        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(50px, 1fr));
  grid-auto-rows: minmax(100px, 1fr);
  grid-gap: 0.5em;
  width: 80vw;
  margin: 0 auto;
}

.drop-zone {
  box-sizing: border-box;
  /* min-height: 200px; */
  position: relative;
}

.drag-el {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: white;
  color: black;
  /* padding: 5px; */
  transition: transform 0.3s ease;
}

.drag-el:nth-last-of-type(1) {
  margin-bottom: 0;
}

.title {
  text-align: center;
}

.drag-preview {
  padding: 50px;
  border: 1px solid black;
  border-radius: 5px;
  z-index: 1000;
  /* Make sure it's on top */
}

.preview {
  animation: fadeIn 0.15s ease-in;
  outline: 2px dashed rgba(255, 255, 255, 0.25);
}

.drag-over {
  outline: 2px solid yellow;
}

.handle {
  height: 1.75em;
  width: 1.75em;
  text-align: center;
  position: absolute;
  top: 5px;
  right: 5px;
  color: black;
}

@keyframes fadeIn {
  from {
    outline: 2px dashed rgba(255, 255, 255, 0);
  }

  to {
    outline: 2px dashed rgba(255, 255, 255, 0.25);
  }
}

@keyframes fadeOut {
  from {
    outline: 2px solid rgba(255, 255, 255, 0.25);
  }

  to {
    outline: 2px solid rgba(255, 255, 255, 0);
  }
}

.fade-in {
  animation: fadeIn 0.1s ease;
}

.fade-out {
  animation: fadeOut 0.1s ease;
}
</style>
