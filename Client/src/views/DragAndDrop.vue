<script setup>
import { ref, onMounted, computed } from 'vue'

import Timer from '../components/timers/Timer.vue'
import Countdown from '@/components/timers/Countdown.vue';
import Toggle from '@/components/toggle/toggle.vue';

const dragActive = ref(false)
const dropZones = ref([])
const storeTimers = ref([])

import { useTimerStore } from '@/stores/timer.store';
import Stopwatch from '@/components/timers/Stopwatch.vue';
const timerStore = useTimerStore()
const { fetchTimers, updateTimer } = useTimerStore();
fetchTimers();

const allTimers = computed(() => {
  return timerStore.timers
})

// onMounted(() => {

//   storeTimers.value = timerStore.timers
// })

onMounted(async () => {
  await fetchTimers();
  storeTimers.value = timerStore.timers; // Optional local state update for debugging

  for (let i = 0; i < 64; i++) {
    dropZones.value.push({
      id: i,
      title: `Zone ${i + 1}`
    })
  }
});

const getCell = (cell) => {
  // return timers.value.filter((timer) => timer.cell === cell)
  return allTimers.value.filter((timer) => timer.cell === cell)
}
const startDrag = (event, timer) => {
  dragActive.value = true;
  event.dataTransfer.setData('timerId', timer._id);
  event.dataTransfer.setData('cell', timer.cell);
};

// const onDrop = (event, cell) => {
//   console.log("On drop event", cell);
//   dragActive.value = false
//   const timerId = event.dataTransfer.getData('timerId')
//   const originCell = event.dataTransfer.getData('cell')
//   console.log("timer id: ", timerId);
//   // const timer = timers.value.find((timer) => timer.id == timerId)
//   const existingTimer = getCell(cell)[0]
//   if (existingTimer) {
//     // existingTimer.cell = timer.cell // Move existing timer to old cell
//     // timer.cell = cell // Move dragged timer to new cell

//     console.log("cell:", cell);
//     console.log("existingTimer.cell:", existingTimer.cell);
//     console.log("origin cell:", originCell);

//     const firstTimer = {
//       _id: timerId,
//       cell: existingTimer.cell
//     }

//     console.log("firstTimer: ", firstTimer);

//     const secondTimer = {
//       _id: existingTimer._id,
//       cell: parseInt(originCell)
//     }

//     console.log("secondTimer: ", secondTimer);

//     updateTimer(secondTimer)
//     updateTimer(firstTimer);
//   } else {
//     // timer.cell = cell

//     const data = {
//       _id: timerId,
//       cell: cell
//     }
//     updateTimer(data);
//   }
// }

const onDrop = async (event, targetCell) => {
  dragActive.value = false;
  const timerId = event.dataTransfer.getData('timerId');
  const originCell = parseInt(event.dataTransfer.getData('cell')); // Ensure numeric type

  const draggedTimer = allTimers.value.find((timer) => timer._id === timerId);
  const targetTimer = getCell(targetCell)[0]; // Get existing timer in target cell, if any

  if (!draggedTimer) return; // Exit if draggedTimer is not found

  if (targetTimer) {
    // Swap cells
    const updates = [
      { _id: draggedTimer._id, cell: targetCell },
      { _id: targetTimer._id, cell: originCell },
    ];

    console.log("Updating timers:", updates);

    // Update both timers
    await Promise.all(updates.map(updateTimer));
  } else {
    // Just move the dragged timer
    const update = { _id: draggedTimer._id, cell: targetCell };
    console.log("Moving timer:", update);
    await updateTimer(update);
  }

  // Optionally refetch data if `updateTimer` does not automatically sync
  fetchTimers();
};
const onDragEnter = (event) => {
  const dropZone = event.target.closest('.drop-zone')
  if (dropZone) dropZone.classList.add('drag-over')
}
const onDragLeave = (event) => {
  const dropZone = event.target.closest('.drop-zone')
  if (dropZone) dropZone.classList.remove('drag-over')
}

const { addTimer, addDropZone, deleteTimer } = useTimerStore();
var count = 0;
async function add(type) {

  var data = {
    name: "Timer Name",
    type,
    duration: 0,
    endDateTime: null,
    isActive: false,
    creator: null,
    img:
      "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg",
    cell: count++
  };

  await addTimer(data)
    .then((res) => {
    })
    .catch((error) => {
      console.log("error:", error);
    });
}

</script>
<template>
  <div class="container">

    <h2 class="title">Timers</h2>

    <div class="add-timer">
      <button @click="add('stopwatch')" v-if="activeButton != 'countdowns'">
        Add Stopwatch
      </button>
      <button @click="add('countdown')" v-if="activeButton != 'stopwatches'">
        Add Countdown
      </button>
    </div>

    <div class="grid">

      <!-- {{ storeTimers }} -->
      <div v-for="(zone, index) in dropZones" :key="index" class="drop-zone"
        :class="[{ preview: dragActive }, { 'fade-in': dragActive }]" @drop="onDrop($event, index)" @dragover.prevent
        @dragenter="onDragEnter" @dragleave="onDragLeave">

        <div v-for="timer in getCell(index)" :key="timer._id" class="drag-el">

          <div class="controls">

            <label v-if="timer.type == 'countdown'">countdown</label>
            <label v-if="timer.type == 'stopwatch'">stopwatch</label>
            <Toggle :label="timer.title" :initial-value="timer.type == 'countdown' ? true : false"
              :is-toggled="timer.enabled"></Toggle>

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

            <i @click="onClose" class='bx bx-x'></i>
          </div>


          <Countdown v-if="timer.type == 'countdown'" :timer="timer" />
          <Stopwatch v-if="timer.type == 'stopwatch'" :timer="timer" />
        </div>

      </div>
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
  border: 1px solid rgba(255, 255, 255, 0.116);
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

.controls {
  gap: .5em;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  /* position: absolute; */
  /* top: 5px; */
  /* right: 5px; */
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
