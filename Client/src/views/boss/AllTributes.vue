<script setup>
import { ref, computed } from 'vue'
import { useItemStore } from '@/stores/item.store'
const itemStore = useItemStore()
const artifacts = ref(itemStore.allArtifacts)
const trophies = ref(itemStore.allTrophies)
const searchQuery = ref('')

const filteredArtifacts = computed(() => {
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        return itemStore.allArtifacts.filter((item) => item.name.toLowerCase().includes(query))
    } else {
        return itemStore.allArtifacts
    }
})
const filteredTrophies = computed(() => {
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        return itemStore.allTrophies.filter((item) => item.name.toLowerCase().includes(query))
    } else {
        return itemStore.allTrophies
    }
})
const incrementArtifact = (artifact) => {
    artifacts.value[artifact.id].quantity += 1
}
const decrementArtifact = (artifact) => {
    if (artifacts.value[artifact.id].quantity > 0) {
        artifacts.value[artifact.id].quantity -= 1
    }
}
const incrementTrophy = (trophy) => {
    trophies.value[trophy.id].quantity += 1
}
const decrementTrophy = (trophy) => {
    if (trophies.value[trophy.id].quantity > 0) {
        trophies.value[trophy.id].quantity -= 1
    }
}
const handleKeyDown = (event, item) => {
    if (event.key === 'ArrowUp') {
        item.quantity += 1
        event.preventDefault()
    } else if (event.key === 'ArrowDown') {
        if (item.quantity > 0) item.quantity -= 1
        event.preventDefault()
    }
}
const orientation = ref('square')
const updateOrientation = () => {
    console.log(`updated value is: ${orientation.value}`)
}
const clearSearch = () => {
    searchQuery.value = ''
}
</script>
<template>
    <div class="page">
        <div class="top">
            <label class="search" for="search">
                <div class="search-box">
                    <i class="bx bx-search"></i>
                    <input id="search" class="search-input" type="text" placeholder="Search..." v-model="searchQuery" />
                    <i class="bx bx-x clear" @click="clearSearch" v-if="searchQuery"></i>
                </div>
            </label>
            <div class="orientation-container">
                <label for="">Orientation:</label>
                <select name="" id="" class="orientation" v-model="orientation" @change="updateOrientation">
                    <option value="square">Square</option>
                    <option value="rectangle">Rectangle</option>
                </select>
            </div>
        </div>
        <div class="artifacts" v-if="filteredArtifacts.length > 0">
            <h2>Artifacts</h2>
            <div :class="`${orientation}-view`">
                <template v-if="orientation == 'square'">
                    <div v-for="artifact in filteredArtifacts" :key="artifact.name" class="artifact-container">
                        <div class="artifact">
                            <div class="details">
                                <img :src="artifact.img" alt="" />
                                <label for="">{{ artifact.name }}</label>
                            </div>
                        </div>
                        <div class="controls">
                            <span class="material-symbols-outlined" @click="decrementArtifact(artifact)">
                                <i class="bx bx-minus-circle"></i>
                            </span>
                            <input type="number" :min="0" :value="artifact.quantity"
                                @keydown="handleKeyDown($event, artifact)" />
                            <span class="material-symbols-outlined" @click="incrementArtifact(artifact)">
                                <i class="bx bx-plus-circle"></i>
                            </span>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div v-for="artifact in filteredArtifacts" :key="artifact.name" class="artifact-container-square">
                        <div class="artifact-square">
                            <div class="details-square">
                                <img :src="artifact.img" alt="" />
                                <label for="">{{ artifact.name }}</label>
                                <div class="controls-square">
                                    <span class="material-symbols-outlined" @click="incrementArtifact(artifact)">
                                        <!-- <i class="bx bx-plus-circle"></i> -->
                                        <i class='bx bxs-chevron-up'></i>
                                    </span>
                                    <input type="number" :min="0" :value="artifact.quantity"
                                        @keydown="handleKeyDown($event, artifact)" />
                                    <span class="material-symbols-outlined" @click="decrementArtifact(artifact)">
                                        <!-- <i class="bx bx-minus-circle"></i> -->
                                        <i class='bx bxs-chevron-down'></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="trophies" v-if="filteredTrophies.length > 0">
            <h2>Trophies</h2>
            <div :class="`${orientation}-view`">
                <template v-if="orientation == 'square'">
                    <div v-for="trophy in filteredTrophies" :key="trophy" class="trophy-container">
                        <div class="trophy">
                            <div class="details">
                                <img :src="trophy.img" alt="" />
                                <label for="">{{ trophy.name }}</label>
                            </div>
                        </div>
                        <div class="controls">
                            <span class="material-symbols-outlined" @click="decrementTrophy(trophy)">
                                <i class="bx bx-minus-circle"></i>
                            </span>
                            <input type="number" :min="0" :value="trophy.quantity"
                                @keydown="handleKeyDown($event, trophy)" />
                            <span class="material-symbols-outlined" @click="incrementTrophy(trophy)">
                                <i class="bx bx-plus-circle"></i>
                            </span>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div v-for="trophy in filteredTrophies" :key="trophy.name" class="trophy-container-square">
                        <div class="trophy-square">
                            <div class="details-square">
                                <img :src="trophy.img" alt="" />
                                <label for="">{{ trophy.name }}</label>
                                <div class="controls-square">
                                    <span class="material-symbols-outlined" @click="incrementTrophy(trophy)">
                                        <!-- <i class="bx bx-plus-circle"></i> -->
                                        <i class='bx bxs-chevron-up'></i>
                                    </span>
                                    <input type="number" :min="0" :value="trophy.quantity"
                                        @keydown="handleKeyDown($event, trophy)" />
                                    <span class="material-symbols-outlined" @click="decrementTrophy(trophy)">
                                        <!-- <i class="bx bx-minus-circle"></i> -->
                                        <i class='bx bxs-chevron-down'></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<style scoped>
h2 {
    font-size: 1.5em;
    padding: 1em;
}

.page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.rectangle-view {
    /* display: grid; */
    /* grid-template-columns: repeat(3, minmax(125px, auto)); */
    gap: 0.625em;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
}

.square-view {
    /* display: grid;
    grid-template-columns: repeat(7, minmax(125px, auto));
    gap: 1em;
    text-align: center; */
    gap: 0.625em;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
}

.square-view label {
    padding: .5em 0;
}

.artifact-container,
.trophy-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    /* border: 1px solid white; */
    border: 1px solid rgb(16, 15, 28);
    border-radius: 5px;
    padding: 0.25em;
    /* max-width: 8em; */
    /* min-width: 8em; */
    width: 8em;
}

.artifact-container:hover,
.trophy-container:hover {
    cursor: pointer;
    box-shadow:
        0 1px 2px 0 rgba(255, 255, 255, 0.5),
        0 2px 10px 0 rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
    transition: transform 0.3s ease;
}

.artifacts,
.trophies {
    width: 100%;
}

.artifact,
.trophy {
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 8em; */
    min-height: 6em;
    /* width: 100%; */
}

.artifact img,
.trophy img {
    width: 4em;
    /* height: 5em; */
    /* background: rgba(255, 255, 255, 0.15); */
}

.details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    margin: 0.25em 0;
}

.controls input {
    text-align: center;
    width: 2em;
}

input[type='number'] {
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: white;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}

.controls span {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.controls span:hover {
    color: gray;
    background-color: white;
}

.artifact-container-square {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    /* border: 1px solid white; */
    border: 1px solid rgb(16, 15, 28);
    padding: 0.25em;
    /* max-width: calc(100vw / 4); */
    width: 30%;
}

.details-square {
    display: flex;
    align-items: center;
    gap: 1em;
}

.details-square label {
    flex: 1;
}

.details-square img {
    /* width: 4rem; */
    /* height: 4rem; */
    /* margin: 0.5em; */
    /* background: rgba(255, 255, 255, 0.15); */
}

.controls-square {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    margin: 0 0.5em;
}

.controls-square span {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.controls-square span:hover {
    color: gray;
    background-color: white;
}

.controls-square input {
    text-align: center;
    width: 2em;
}

.controls-square input[type='numebr'] {
    width: 2em;
    text-align: center;
}

/* Trophies  */
.trophy-container-square {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    /* border: 1px solid white; */
    border: 1px solid rgb(16, 15, 28);
    padding: 0.25em;
    width: 30%;
}

.details-square {
    display: flex;
    align-items: center;
    gap: 1em;
}

.details-square img {
    width: 3rem;
    /* height: rem; */
    /* margin: 0.5em; */
    /* background: rgba(255, 255, 255, 0.15); */
    margin: 0 0.5em;
}

.controls-square {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
}

.controls-square span {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.controls-square span:hover {
    color: gray;
    background-color: white;
}

.controls-square input {
    text-align: center;
    width: 2em;
}

.controls-square input[type='numebr'] {
    width: 2em;
    text-align: center;
}

.orientation-toggle {
    position: absolute;
    top: 5px;
    right: 5px;
    background: transparent;
    color: white;
    border: 1px solid white;
    padding: 0.5em;
}

.orientation-toggle:hover {
    cursor: pointer;
}

/* Search Query */
.top {
    box-sizing: border-box;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.orientation-container {
    width: 100%;
}

.orientation {
    align-self: flex-start;
}

.search {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 1px solid white;
    border-radius: 5px;
    background: white;
    /* width: calc(100% - 2em); */
    width: 100%;
    margin-bottom: 0.5em;
}

.search i {
    color: black;
    margin-right: 0.5em;
    font-size: 1.5em;
}

.clear {
    right: 0;
    position: absolute;
    z-index: 1;
    cursor: pointer;
}

.search-box {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5em;
}

.search-input {
    width: 100%;
    border: none;
    height: 2em;
    line-height: 2em;
    padding: 0 0.25em;
}

/* Media Queries */
@media (max-width: 767px) {
    /* .artifact-grid,
    .artifact-grid-sq,
    .trophy-grid,
    .trophy-grid-sq {
        display: grid;
        grid-template-columns: repeat(1, auto);
    } */
}

/* Small devices (tablets, 768px and up) */
@media (min-width: 768px) {
    /* .artifact-grid,
    .artifact-grid-sq,
    .trophy-grid,
    .trophy-grid-sq {
        display: grid;
        grid-template-columns: repeat(5, auto);
    } */
}

/* Medium devices (desktops, 992px and up) */
@media (min-width: 992px) {
    /* .artifact-grid,
    .artifact-grid-sq,
    .trophy-grid,
    .trophy-grid-sq {
        display: grid;
        grid-template-columns: repeat(6, auto);
    } */
}

/* Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
    /* .artifact-grid,
    .artifact-grid-sq,
    .trophy-grid,
    .trophy-grid-sq {
        display: grid;
        grid-template-columns: repeat(7, auto);
    } */
}
</style>