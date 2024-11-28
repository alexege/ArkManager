<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import Stopwatch from "@/components/timers/Stopwatch.vue";
import Countdown from "@/components/timers/Countdown.vue";
import { useTimerStore } from "@/stores/timer.store.js";
const timerStore = useTimerStore();

const { fetchTimers } = useTimerStore();
const { addTimer, addDropZone, deleteTimer } = useTimerStore();
const { countDownTimers, stopwatchTimers } = storeToRefs(useTimerStore());
// const { allTimers, allStopwatchTimers, allCountDownTimers } = storeToRefs(useTimerStore());

const activeButton = ref("both");
const displayMethod = ref("show-grid");

async function changeStyle(style) {
    console.log("Changing view method to : ", style);
    displayMethod.value = style;
}

async function close(timerId) {
    await deleteTimer(timerId);

}

fetchTimers();

function validateTimersWithDropZones() {
    // Get the list of all drop zone IDs
    const dropZoneIds = allDropZones.value.map(zone => zone.id);

    // Check each timer to ensure its cell exists in the drop zones
    const invalidTimers = allTimers.value.filter(timer => !dropZoneIds.includes(timer.cell));

    if (invalidTimers.length > 0) {
        console.warn("Invalid timers detected:", invalidTimers);
        // Optionally handle invalid timers (e.g., assign them to the first empty drop zone)
        invalidTimers.forEach(timer => {
            const emptyZone = allDropZones.value.find(zone => !zone.occupied);
            if (emptyZone) {
                console.log(`Assigning timer ${timer.id} to empty drop zone ${emptyZone.id}`);
                timer.cell = emptyZone.id;
                emptyZone.occupied = true; // Mark the drop zone as occupied
            } else {
                console.error(`No empty drop zones available for timer ${timer.id}`);
            }
        });
    } else {
        console.log("All timers have valid drop zones.");
    }
}

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
    };

    await addTimer(data)
        .then((res) => {
        })
        .catch((error) => {
            console.log("error:", error);
        });
}

// Dropzones
const dropZones = ref([])
const storeTimers = ref([])
const dragActive = ref(false)

const allTimers = computed(() => {
    return timerStore.timers
})

const allDropZones = computed(() => {
    return timerStore.dropZones
})

onMounted(() => {
    // for (let i = 0; i < allTimers.length; i++) {
    //     console.log("test")
    //     dropZones.value.push({
    //         id: allTimers.value[i]._id,
    //         title: `Zone ${i + 1}`
    //     })
    // }

    // if (dropZones.value.length < 23) {
    //     for (let i = 0; i < 23 - allDropZones.value.length; i++) {
    //         addDropZone({ id: i, title: `Zone ${i + 1}` });
    //     }
    // }

    storeTimers.value = timerStore.timers
    validateTimersWithDropZones();
})
</script>
<template>
    <div class="timer-view">

        <h2>Timers</h2>
        <div class="timer-filter-buttons">
            <a @click="activeButton = 'countdowns'" :class="{ 'active-button': activeButton == 'countdowns' }">
                Countdowns
            </a>
            <a @click="activeButton = 'both'" :class="{ 'active-button': activeButton == 'both' }">
                Both
            </a>
            <a @click="activeButton = 'stopwatches'" :class="{ 'active-button': activeButton == 'stopwatches' }">
                Stopwatches
            </a>
        </div>

        <div class="add-timer">
            <button @click="add('stopwatch')" v-if="activeButton != 'countdowns'">
                Add Stopwatch
            </button>
            <button @click="add('countdown')" v-if="activeButton != 'stopwatches'">
                Add Countdown
            </button>
        </div>

        <!-- Stopwatches -->
        <div class="timer-grid" :class="displayMethod" v-if="activeButton == 'stopwatches'">
            <Stopwatch v-for="timer in stopwatchTimers" :key="timer._id" :timer="timer" @close="close" />
        </div>

        <!-- Countdown Timers -->
        <div class="timer-grid" :class="displayMethod" v-if="activeButton == 'countdowns'">
            <Countdown v-for="timer in countDownTimers" :key="timer._id" :timer="timer" @close="close" />
        </div>

        <!-- Both -->
        <div v-if="activeButton == 'both'">
            <template v-if="displayMethod == 'show-two-column'">
                <div class="two-columns">
                    <div class="show-two-column">
                        <Stopwatch v-for="timer in stopwatchTimers" :key="timer._id" :timer="timer" @close="close" />
                    </div>
                    <div class="show-two-column">
                        <Countdown v-for="timer in countDownTimers" :key="timer._id" :timer="timer" @close="close" />
                    </div>
                </div>
            </template>

            <template v-else>
                <div :class="displayMethod">
                    <div v-for="timer in allTimers" :key="timer._id">
                        <Stopwatch v-if="timer.type == 'stopwatch'" :timer="timer" @close="close" />
                        <Countdown v-if="timer.type == 'countdown'" :timer="timer" @close="close" />
                    </div>
                </div>
            </template>

        </div>

        <div class="timer-display-buttons">
            <button class="style-button" :class="{ 'active-style': displayMethod == 'show-column' }"
                @click="changeStyle('show-column')">
                Column
            </button>
            <button class="style-button" :class="{ 'active-style': displayMethod == 'show-two-column' }"
                @click="changeStyle('show-two-column')">
                Two-Column
            </button>
            <button class="style-button" :class="{ 'active-style': displayMethod == 'show-grid' }"
                @click="changeStyle('show-grid')">
                Grid
            </button>
        </div>
    </div>
</template>
<style scoped>
.timer-view {
    display: flex;
    flex-direction: column;
    gap: 1em;
    max-width: 75vw;
    margin: 0 auto;
    /* padding: 2em; */
    border-radius: 5px;
    /* background: rgba(19, 21, 27, 0.315); */
}

.timer-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto, 0.5fr);
    gap: 1em;
}

.timer-filter-buttons {
    display: flex;
    justify-content: center;
    gap: 1em;
}

button {
    background: none;
    border: none;
}

button:hover {
    cursor: pointer;
}

.active-button {
    border-bottom: 2px solid white;
    text-shadow: 2px 2px 2px black;
}

.add-timer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
}

.add-timer button {
    color: white;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid lime;
    background: black;
    padding: .5em 1em;

}

.add-timer button:hover {
    cursor: pointer;
    transform: scale(.95);
    transition: .25s all;
    border: 1px solid white;
}

.timer-display-buttons {
    display: flex;
    justify-content: center;
    gap: .5em;
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 1em;
}

.timer-display-buttons button {
    padding: .5em 1em;
    border-radius: 5px;
}

h2 {
    text-align: center;
    font-size: 36px;
}

.stopwatches {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    gap: 1em;
}

.countdowns {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    gap: 1em;
}

.add-button-container {
    display: flex;
    justify-content: center;
}

.show-column {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 50%;
    margin: 0 auto;
}

.two-columns {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
}

.show-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(250px, 350px));
    /* grid-template-rows: repeat(auto, 0.5fr); */
    grid-template-rows: repeat(auto-fill, minmax(50px, 150px));
    gap: 1em;
    justify-content: center;
}

.show-two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(auto-fill, minmax(50px, 150px));
    gap: 1em;
}

.column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
}

.style-button {
    background-color: black;
    border: 1px solid lime;
    color: white;
    cursor: pointer;
    padding: .25em;
}

.style-button:hover {
    background-color: rgba(4, 30, 39, 0.9);
}

.active-style {
    color: lime;
    border: 2px solid lime;
}

/* Grid Styling */

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
    outline: 1px dashed white;
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
