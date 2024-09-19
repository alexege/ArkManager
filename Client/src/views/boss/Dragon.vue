<script setup>
import { ref } from 'vue'
// let activeTier = null
let activeTier = ref(null)
const tiers = {
    gamma: { name: 'gamma', activeClass: 'gamma_active' },
    beta: { name: 'beta', activeClass: 'beta_active' },
    alpha: { name: 'alpha', activeClass: 'alpha_active' }
}
const requirements = ref([
    {
        completed: false,
        name: 'Artifact of the Cunning',
        img: '/assets/artifacts/Artifact_of_the_Cunning.png',
        gamma: 1,
        beta: 1,
        alpha: 1,
        amount: 0
    },
    {
        completed: false,
        name: 'Artifact of the Immune',
        img: '/assets/artifacts/Artifact_of_the_Immune.png',
        gamma: 1,
        beta: 1,
        alpha: 1,
        amount: 0
    },
    {
        completed: false,
        name: 'Artifact of the Skylord',
        img: '/assets/artifacts/Artifact_of_the_Skylord.png',
        gamma: 1,
        beta: 1,
        alpha: 1,
        amount: 0
    },
    {
        completed: false,
        name: 'Artifact of the Strong',
        img: '/assets/artifacts/Artifact_of_the_Strong.png',
        gamma: 1,
        beta: 1,
        alpha: 1,
        amount: 0
    },
    {
        completed: false,
        name: 'Allosaurus Brain',
        img: '/assets/trophies/Allosaurus_Brain.png',
        gamma: 0,
        beta: 5,
        alpha: 10,
        amount: 0
    },
    {
        completed: false,
        name: 'Basilosaurus Blubber',
        img: '/assets/trophies/Basilosaurus_Blubber.png',
        gamma: 0,
        beta: 5,
        alpha: 10,
        amount: 0
    },
    {
        completed: false,
        name: 'Giganotosaurus Heart',
        img: '/assets/trophies/Giganotosaurus_Heart.png',
        gamma: 0,
        beta: 5,
        alpha: 10,
        amount: 0
    },
    {
        completed: false,
        name: 'Tusoteuthis Tentacle',
        img: '/assets/trophies/Tusoteuthis_Tentacle.png',
        gamma: 0,
        beta: 5,
        alpha: 10,
        amount: 0
    },
    {
        completed: false,
        name: 'Tyrannosaurus Arm',
        img: '/assets/trophies/Tyrannosaurus_Arm.png',
        gamma: 0,
        beta: 5,
        alpha: 10,
        amount: 0
    },
    {
        completed: false,
        name: 'Yutyrannus Lungs',
        img: '/assets/trophies/Yutyrannus_Lungs.png',
        gamma: 0,
        beta: 5,
        alpha: 10,
        amount: 0
    }
])
const rewards = ref([
    {
        name: 'gamma',
        amount: 80
    },
    {
        name: 'beta',
        amount: 220
    },
    {
        name: 'alpha',
        amount: 440
    }
])
const unlocks = ref([
    {
        name: 'Tek Replicator',
        img: '/assets/engrams/Tek_Replicator.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Teleporter Small',
        img: '/assets/engrams/Tek_Teleporter_Small.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Megalodon Saddle',
        img: '/assets/engrams/Tek_Megalodon_Saddle.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Tapejara Saddle',
        img: '/assets/engrams/Tek_Tapejara_Saddle.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Leggings',
        img: '/assets/engrams/Tek_Leggings.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Behemoth Gateway',
        img: '/assets/engrams/Tek_Behemoth_Gateway.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Behemoth Gate',
        img: '/assets/engrams/Tek_Behemoth_Gate.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Behemoth Cellar Door',
        img: '/assets/engrams/Tek_Behemoth_Cellar_Door.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Teleporter Medium',
        img: '/assets/engrams/Tek_Teleporter_Medium.png',
        gamma: false,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Roof',
        img: '/assets/engrams/Tek_Roof.png',
        gamma: false,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Door',
        img: '/assets/engrams/Tek_Door.png',
        gamma: false,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Fence Foundation',
        img: '/assets/engrams/Tek_Fence_Foundation.png',
        gamma: false,
        beta: true,
        alpha: true
    },
    {
        name: 'Vacuum Compartment',
        img: '/assets/engrams/Vacuum_Compartment.png',
        gamma: false,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Forcefield',
        img: '/assets/engrams/Tek_Forcefield.png',
        gamma: false,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Transmitter',
        img: '/assets/engrams/Tek_Transmitter.png',
        gamma: false,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Dedicated Storage',
        img: '/assets/engrams/Tek_Dedicated_Storage.png',
        gamma: false,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Teleporter Large',
        img: '/assets/engrams/Tek_Teleporter_Large.png',
        gamma: false,
        beta: false,
        alpha: true
    },
    {
        name: 'Tek Cloning Chamber',
        img: '/assets/engrams/Tek_Cloning_Chamber.png',
        gamma: false,
        beta: false,
        alpha: true
    },
    {
        name: 'Tek Chestpiece',
        img: '/assets/engrams/Tek_Chestpiece.png',
        gamma: false,
        beta: false,
        alpha: true
    }
])
const selectTier = (selectedTier) => {
    if (tiers[selectedTier]) {
        activeTier.value = activeTier.value === selectedTier ? null : selectedTier
    } else {
        console.log(`Unknown tier: ${selectedTier}`)
    }
}
import counter from '../../components/inputs/counter.vue'
const toggleRow = (row) => {
    console.log(requirements.value[row])
    requirements.value[row].completed = !requirements.value[row].completed
}
const handleCounterUpdate = (value, index) => {
    requirements.value[index].amount = value
}
const isCompleted = (item) => {
    if (item) {
        if (activeTier.value) {
            return item.completed || item.amount >= item[activeTier.value]
        }
        return item.completed || item.amount >= item.alpha
    }
}
const isActiveTier = (tier) => {
    if (activeTier.value == null) {
        return ''
    } else if (activeTier.value && tier == activeTier.value) {
        return `${tier}_active`
    } else {
        return 'blur'
    }
}
const isActiveTierUnlock = (tier, value) => {
    if (activeTier.value == null) {
        return ''
    } else if (activeTier.value && tier == activeTier.value) {
        if (value) {
            return `${tier}_active`
        } else {
            return 'blur'
        }
    } else {
        return 'blur'
    }
}
const showName = (gamma, beta, alpha) => {
    if (activeTier.value) {
        if (activeTier.value == 'gamma' && gamma) return `gamma_active`
        if (activeTier.value == 'beta' && beta) return `beta_active`
        if (activeTier.value == 'alpha' && alpha) return `alpha_active`
        if (!gamma || !beta || !alpha) return 'blur'
    } else {
        return ''
    }
}
const capitalize = (word) => {
    if (typeof word !== 'string') return ''
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
const clearAll = () => {
    console.log('clearign everything out')
    requirements.value.forEach((item) => {
        item.amount = 0
        item.completed = false
    })
    activeTier.value = null
}

</script>
<template>
    <div>
        <div class="header">
            <h2>Megapithecus</h2>
            <img src="/assets/bosses/Dragon.png" class="item-img" width="200px" style="margin: 0 auto;" />
            <div class="difficulty">
                <template v-for="tier in tiers" :key="tier">
                    <button :class="[isActiveTier(tier.name), tier.name]" @click="selectTier(tier.name)">
                        {{ capitalize(tier.name) }}
                    </button>
                </template>
            </div>
        </div>
        <div class="grid">
            <div class="column-one">
                <div class="tributes">
                    <h2>Tributes & Artifacts</h2>
                    <div class="tributes-grid">
                        <!-- <div class="grid-title spacer"></div> -->
                        <div class="grid-title" style="grid-row: 1/3; grid-column: 2/3">Item
                        </div>
                        <div class="grid-title" style="grid-column: 3/6">Quantity</div>
                        <div class="grid-title" style="grid-row: 1/3; grid-column: 6/7">
                            <div class="vertical">Amount</div>
                        </div>
                        <div class="grid-title" style="grid-row: 1/3">
                            <div class="vertical">
                                <span class="title">Completed</span>
                            </div>
                        </div>
                        <template v-for="tier in tiers" :key="tier">
                            <div class="grid-item tier" :class="[isActiveTier(tier.name), tier.name]"
                                @click="selectTier(tier.name)">
                                <div class="vertical">
                                    <i class="bx bxs-objects-vertical-bottom"> </i>
                                    <span class="title">{{ capitalize(tier.name)
                                        }}</span>
                                </div>
                            </div>
                        </template>
                        <div class="grid-title spacer"></div>
                        <div class="grid-title name" :class="[
                            { gamma_active: activeTier == 'gamma' },
                            { beta_active: activeTier == 'beta' },
                            { alpha_active: activeTier == 'alpha' }
                        ]">
                            Player Level
                        </div>
                        <div class="grid-title" :class="isActiveTier('gamma')">55</div>
                        <div class="grid-title" :class="isActiveTier('beta')">75</div>
                        <div class="grid-title" :class="isActiveTier('alpha')">100</div>
                        <div class="grid-title"></div>
                        <template v-for="(item, index) in requirements" :key="item">
                            <div class="checkbox">
                                <input type="checkbox" v-model="item.completed" />
                            </div>
                            <div class="grid-item name gamma beta alpha" :class="[
                                { completed: isCompleted(item) },
                                { gamma_active: activeTier == 'gamma' },
                                { beta_active: activeTier == 'beta' },
                                { alpha_active: activeTier == 'alpha' }
                            ]" @click="toggleRow(index)">
                                <div class="unlock">
                                    <img :src="item.img" />
                                    <p>{{ item.name }}</p>
                                </div>
                            </div>
                            <div class="grid-item" :class="[{ completed: isCompleted(item) }, isActiveTier('gamma')]"
                                @click="toggleRow(index)">
                                {{ item.gamma == 0 ? '-' : item.gamma }}
                            </div>
                            <div class="grid-item" :class="[{ completed: isCompleted(item) }, isActiveTier('beta')]"
                                @click="toggleRow(index)">
                                {{ item.beta }}
                            </div>
                            <div class="grid-item" :class="[{ completed: isCompleted(item) }, isActiveTier('alpha')]"
                                @click="toggleRow(index)">
                                {{ item.alpha }}
                            </div>

                            <counter min="0" :startCount="item.amount" :index="index" @update="handleCounterUpdate" />

                        </template>
                    </div>
                </div>
                <div class="rewards">
                    <h2>Rewards</h2>
                    <div class="rewards-grid">
                        <template v-for="reward in rewards" :key="reward">
                            <div class="grid-item tier" :class="[isActiveTier(reward.name), reward.name]"
                                @click="selectTier(reward.name)">
                                {{ capitalize(reward.name) }}
                            </div>
                        </template>
                        <template v-for="reward in rewards" :key="reward">
                            <div class="grid-item" :class="isActiveTier(reward.name)">
                                {{ reward.amount }}
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="column-two">
                <h2>Engram Unlocks</h2>
                <div class="unlocks-grid">
                    <!-- <img src="" class="item-img" /> -->
                    <div class="grid-title">Item</div>
                    <template v-for="tier in tiers" :key="tier">
                        <div class="grid-item tier" :class="[isActiveTier(tier.name), tier.name]"
                            @click="selectTier(tier.name)">
                            <span class="vertical">
                                <i class="bx bxs-objects-vertical-bottom"></i>
                                <span class="title">{{ capitalize(tier.name) }}</span>
                            </span>
                        </div>
                    </template>
                    <template v-for="item in unlocks" :key="item">
                        <div class="grid-item name" :class="showName(item.gamma, item.beta, item.alpha)">
                            <div class="unlock">
                                <img :src="item.img" />
                                <p>{{ item.name }}</p>
                            </div>
                        </div>
                        <div class="grid-item" :class="isActiveTierUnlock('gamma', item.gamma)">
                            <i v-if="item.gamma" class="bx bx-check"></i>
                            <i v-else class="bx bx-x"></i>
                        </div>
                        <div class="grid-item" :class="isActiveTierUnlock('beta', item.beta)">
                            <i v-if="item.beta" class="bx bx-check"></i>
                            <i v-else class="bx bx-x"></i>
                        </div>
                        <div class="grid-item" :class="isActiveTierUnlock('alpha', item.alpha)">
                            <i v-if="item.alpha" class="bx bx-check"></i>
                            <i v-else class="bx bx-x"></i>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <button class="clear-all" @click="clearAll()">Clear All</button>
    </div>
</template>
<style scoped>
/* * {
   font-size: clamp(0.5em, 2.5vw, 1em);
} */
input[type='checkbox'] {
    height: 1.4em;
    color: red;
}

.checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
}

.strikethrough,
.completed {
    text-decoration: line-through;
    opacity: 0.25;
    transition: opacity 0.25s ease;
}

/* Hide the spin buttons in WebKit browsers */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

/* Hide spin buttons in Firefox */
input[type='number'] {
    -moz-appearance: textfield;
}

.number-input {
    display: flex;
    justify-content: center;
}

.number-controls {
    display: flex;
    flex-direction: column;
}

.number-controls svg {
    fill: black;
}

.difficulty {
    display: flex;
    justify-content: center;
    gap: 0.5em;
}

.difficulty button {
    min-width: 5em;
    cursor: pointer;
    color: white;
    padding: 0.25em 0.5em;
    background: rgba(255, 255, 255, 0.095);
}

.grid {
    display: grid;
    /* grid-template-columns: repeat(2, auto); */
    gap: 10px;
    height: 100vh;
    /* overflow: auto; */
}

.grid-title {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 3.125em;
    min-height: 3.125em;
    /* overflow: hidden; */
    margin: 2px;
    background-color: rgba(255, 255, 255, 0.05);
}

.grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    /* min-width: 3.125em; */
    /* min-height: 3.125em; */
    overflow: hidden;
    margin: 2px;
    background-color: rgba(255, 255, 255, 0.05);
}

.grid-item img {
    width: 1.875em;
    height: 1.875em;
    padding: 5px;
}

.spacer {
    /* margin: 2px; */
    /* background-color: rgba(255, 255, 255, 0.05); */
}

.column-one,
.column-two {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
}

.tributes {
    text-align: center;
    padding-bottom: 2em;
}

.tributes-grid {
    display: grid;
    grid-template-columns: repeat(6, auto);
    grid-template-rows: auto;
    text-align: center;
}

.tributes-grid .grid-item {
    cursor: pointer;
}

.rewards {
    text-align: center;
}

.rewards .tier {
    height: auto;
}

.rewards-grid {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: auto;
    text-align: center;
    margin-bottom: 2em;
}

.rewards-grid .tier {
    min-width: 80px;
}

.unlocks-grid {
    display: grid;
    grid-template-columns: repeat(4, auto);
    /* grid-template-rows: repeat(20, auto); */
    /* grid-template-rows: auto; */
    /* justify-content: center; */
    /* text-align: center; */
    /* align-items: center; */
}

.unlocks-grid .item-img {
    min-width: 200px;
    min-height: 100px;
    padding: 0.5em;
    box-sizing: border-box;
    outline: 1px solid black;
}

.tier {
    position: relative;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.096);
    /* min-height: 120px; */
    height: 120px;
    max-width: 3.125em;
}

.tier:hover {
    background: rgba(135, 207, 235, 0.205);
    outline: 1px solid white;
}

.tier.gamma,
.difficulty .gamma {
    border: 1px solid lime;
}

.tier.beta,
.difficulty .beta {
    border: 1px solid cyan;
}

.tier.alpha,
.difficulty .alpha {
    border: 1px solid red;
}

.vertical {
    /* width: 100%; */
    height: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    transform: rotate(90deg);
    gap: 0.5em;
}

.vertical .title {
    min-width: 60px;
    text-align: left;
}

.name {
    /* min-width: 10em; */
    min-width: 100%;
    /* white-space: nowrap; */
}

/* .name p {
   min-width: 0.5em;
} */
.unlock {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
}

.bx-check {
    font-weight: bold;
    color: lime;
}

.bx-x {
    font-weight: bold;
    color: red;
}

.gamma_active {
    background-color: rgba(0, 255, 0, 0.205) !important;
}

.beta_active {
    background-color: rgba(135, 207, 235, 0.205) !important;
}

.alpha_active {
    background-color: rgba(255, 0, 0, 0.205) !important;
}

.blur {
    filter: blur(2px) grayscale(100%) opacity(0.5);
    transition: all 0.5s ease;
}

.clear-all {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    margin-inline: auto;
    width: fit-content;
    color: white;
    border: 1px solid white;
    background: transparent;
    padding: 0.5em 2em;
}

.clear-all:hover {
    cursor: pointer;
    background: white;
    color: black;
}

@media (max-width: 767px) {
    .grid {
        grid-template-columns: minmax(0, 1fr);
    }

    .grid-item,
    .grid-title,
    .tier {
        min-width: 1em;
        min-height: 1em;
    }
}

/* Small devices (tablets, 768px and up) */
@media (min-width: 768px) {
    .grid {
        grid-template-columns: minmax(0, 1fr);
        padding: 1em;
    }

    .grid-item,
    .grid-title,
    .tier {
        min-width: 1em;
        min-height: 1em;
    }

    .vertical-title {
        transform: rotate(90deg);
    }
}

/* Medium devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .grid {
        /* grid-template-columns: repeat(2, auto); */
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }

    .grid-item,
    .grid-title,
    .tier {
        min-width: 3.125em;
        min-height: 3.125em;
    }
}

/* Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {}
</style>