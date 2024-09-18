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
        name: 'Artifact of the Clever',
        img: './Client/src/assets/artifacts/Artifact_of_the_Clever.png',
        gamma: 1,
        beta: 1,
        alpha: 1,
        amount: 0
    },
    {
        completed: false,
        name: 'Artifact of the Hunter',
        img: '@/../../Client/src/assets/artifacts/Artifact_of_the_Hunter.png',
        gamma: 1,
        beta: 1,
        alpha: 1,
        amount: 0
    },
    {
        completed: false,
        name: 'Artifact of the Massive',
        img: '@/../../Client/src/assets/artifacts/Artifact_of_the_Massive.png',
        gamma: 1,
        beta: 1,
        alpha: 1,
        amount: 0
    },
    {
        completed: false,
        name: 'Argentavis Talon',
        img: '@/../../Client/src/assets/trophies/Argentavis_Talon.png',
        gamma: 0,
        beta: 5,
        alpha: 10,
        amount: 0
    },
    {
        completed: false,
        name: 'Sarcosuchus Skin',
        img: '@/../../Client/src/assets/trophies/Sarcosuchus_Skin.png',
        gamma: 0,
        beta: 5,
        alpha: 10,
        amount: 0
    },
    {
        completed: false,
        name: 'Sauropod Vertebra',
        img: '@/../../Client/src/assets/trophies/Sauropod_Vertebra.png',
        gamma: 0,
        beta: 5,
        alpha: 10,
        amount: 0
    },
    {
        completed: false,
        name: 'Titanoboa Venom',
        img: '@/../../Client/src/assets/trophies/Titanoboa_Venom.png',
        gamma: 0,
        beta: 5,
        alpha: 10,
        amount: 0
    }
])


const rewards = ref([
    {
        name: 'gamma',
        amount: 20
    },
    {
        name: 'beta',
        amount: 56
    },
    {
        name: 'alpha',
        amount: 148
    }
])

const unlocks = ref([
    {
        name: 'Tek Replicator',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Replicator.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Foundation',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Foundation.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Triangle Foundation',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Triangle_Foundation.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Triangle Roof / Corner',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Triangle_Roof.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Quarter / Triangle Ceiling',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Quarter.png',
        gamma: true,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Pillar',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Pillar.png',
        gamma: false,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Wall / Doorway / Window',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Wall.png',
        gamma: false,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Ceiling / Hatchframe',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Ceiling.png',
        gamma: false,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Quarter Wall / Railing',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Quarter_Wall.png',
        gamma: false,
        beta: true,
        alpha: true
    },
    {
        name: 'Tek Sloped Wall',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Sloped_Wall.png',
        gamma: false,
        beta: false,
        alpha: true
    },
    {
        name: 'Tek Ladder',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Ladder.png',
        gamma: false,
        beta: false,
        alpha: true
    },
    {
        name: 'Tek Boots',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Boots.png',
        gamma: false,
        beta: false,
        alpha: true
    },
    {
        name: 'Tek Turret',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Turret.png',
        gamma: false,
        beta: false,
        alpha: true
    },
    {
        name: 'Tek Helmet',
        img: 'http://localhost:8081/@fs/E:/Programming/Vue3/ArkManager/Client/src/assets/engrams/Tek_Helmet.png',
        gamma: false,
        beta: false,
        alpha: true
    }
])
const selectTier = (selectedTier) => {
    console.log('Selected tier: ', selectedTier)
    // const allGridItems = Array.from(document.querySelectorAll('.grid-item'))
    // const clearClasses = () => {
    //   allGridItems.forEach((item) => {
    //     item.classList.remove('gamma_active', 'beta_active', 'alpha_active', 'blur')
    //   })
    // }
    //Update main button classes
    // if (selectedTier === 'gamma') {
    //   document.querySelector('#gamma-btn').classList.toggle('gamma_active')
    //   document.querySelector('#beta-btn').classList.remove('beta_active')
    //   document.querySelector('#alpha-btn').classList.remove('alpha_active')
    // } else if (selectedTier === 'beta') {
    //   document.querySelector('#gamma-btn').classList.remove('gamma_active')
    //   document.querySelector('#beta-btn').classList.toggle('beta_active')
    //   document.querySelector('#alpha-btn').classList.remove('alpha_active')
    // } else if (selectedTier === 'alpha') {
    //   document.querySelector('#gamma-btn').classList.remove('gamma_active')
    //   document.querySelector('#beta-btn').classList.remove('beta_active')
    //   document.querySelector('#alpha-btn').classList.toggle('alpha_active')
    // }
    const updateClassses = (tier) => {
        // allGridItems.forEach((item) => {
        //   const tierProps = tiers[tier]
        //   if (!tierProps) return
        //   // const hasNameClass = item.classList.contains(tierProps.name)
        //   const hasActiveClass = item.classList.contains(tierProps.activeClass)
        //   if (item.classList.contains(activeTier)) {
        //     //Deactivate current tier
        //     if (hasActiveClass) {
        //       item.classList.remove(tierProps.activeClass)
        //     } else {
        //       item.classList.add(tierProps.activeClass)
        //     }
        //   } else {
        //     item.classList.add('blur')
        //   }
        // })
    }
    // clearClasses()
    if (tiers[selectedTier]) {
        activeTier.value = activeTier.value === selectedTier ? null : selectedTier
        // console.log('activeTier:', activeTier.value)
        updateClassses(activeTier.value)
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
        return item.completed || item.amount >= item.alpha
    }
}
const isActiveTier = (tier) => {
    console.log('tier:', tier)
    if (activeTier.value == null) {
        return ''
    } else if (activeTier.value && tier == activeTier.value) {
        return `${tier}_active`
    } else {
        return 'blur'
    }
}
const isActiveTierUnlock = (tier, value) => {
    console.log('tier:', tier)
    console.log('value:', value)
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
const capitalize = (word) => {
    if (typeof word !== 'string') return ''
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
</script>
<template>
    <div>
        <div class="header">
            <h2>Section Header</h2>
            <div class="difficulty">
                <template v-for="tier in tiers" :key="tier">
                    <button :class="isActiveTier(tier.name)" @click="selectTier(tier.name)">
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
                        <!-- Row1 -->
                        <div class="grid-title spacer"></div>
                        <div class="grid-title" style="grid-row: 1/3; grid-column: 2/3">Item</div>
                        <div class="grid-title" style="grid-column: 3/6">Quantity</div>
                        <div class="grid-title" style="grid-row: 1/3; grid-column: 6/7">Amount</div>
                        <!-- Row2 -->
                        <div class="grid-title">
                            <div class="vertical">
                                <span class="title">Completed</span>
                            </div>
                        </div>
                        <div class="grid-item tier gamma" :class="isActiveTier('gamma')" @click="selectTier('gamma')">
                            <div class="vertical">
                                <i class="bx bxs-objects-vertical-bottom"> </i>
                                <span class="title">Gamma</span>
                            </div>
                        </div>
                        <div class="grid-item tier beta" :class="isActiveTier('beta')" @click="selectTier('beta')">
                            <div class="vertical">
                                <i class="bx bxs-objects-vertical-bottom"> </i>
                                <div class="title">Beta</div>
                            </div>
                        </div>
                        <div class="grid-item tier alpha" :class="isActiveTier('alpha')" @click="selectTier('alpha')">
                            <div class="vertical">
                                <i class="bx bxs-objects-vertical-bottom"> </i>
                                <div class="title">Alpha</div>
                            </div>
                        </div>
                        <!-- Row3 -->
                        <div class="grid-title spacer"></div>
                        <div class="grid-item name gamma beta alpha" :class="[
                            { gamma_active: activeTier == 'gamma' },
                            { beta_active: activeTier == 'beta' },
                            { alpha_active: activeTier == 'alpha' }
                        ]">
                            Player Level
                        </div>
                        <div class="grid-item gamma" :class="isActiveTier('gamma')">30</div>
                        <div class="grid-item beta" :class="isActiveTier('beta')">30</div>
                        <div class="grid-item alpha" :class="isActiveTier('alpha')">70</div>
                        <div class="grid-title spacer"></div>
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
                            <div class="grid-item gamma"
                                :class="[{ completed: isCompleted(item) }, isActiveTier('gamma')]"
                                @click="toggleRow(index)">
                                {{ item.gamma }}
                            </div>
                            <div class="grid-item beta"
                                :class="[{ completed: isCompleted(item) }, isActiveTier('beta')]"
                                @click="toggleRow(index)">
                                {{ item.beta }}
                            </div>
                            <div class="grid-item alpha"
                                :class="[{ completed: isCompleted(item) }, isActiveTier('alpha')]"
                                @click="toggleRow(index)">
                                {{ item.alpha }}
                            </div>
                            <counter min="0" :index="index" @update="handleCounterUpdate"
                                :class="{ completed: isCompleted(item) }" />
                        </template>
                    </div>
                </div>
                <div class="rewards">
                    <h2>Rewards</h2>
                    <div class="rewards-grid">
                        <template v-for="reward in rewards" :key="reward">
                            <div class="grid-item tier gamma" :class="isActiveTier(reward.name)"
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
                <h2>Item One</h2>
                <div class="unlocks-grid">
                    <img src="" class="item-img" />
                    <template v-for="tier in tiers" :key="tier">
                        <div class="grid-item tier" :class="isActiveTier(tier.name)" @click="selectTier(tier.name)">
                            <span class="vertical">
                                <i class="bx bxs-objects-vertical-bottom"></i>
                                <span class="title">{{ capitalize(tier.name) }}</span>
                            </span>
                        </div>
                    </template>
                    <template v-for="item in unlocks" :key="item">
                        <div class="grid-item name" :class="[
                            { gamma_active: activeTier == 'gamma' && item.gamma },
                            { beta_active: activeTier == 'beta' && item.beta },
                            { alpha_active: activeTier == 'alpha' && item.alpha }
                        ]">
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
    </div>
</template>
<style scoped>
input[type='checkbox'] {
    width: 20px;
    height: 20px;
    color: red;
}

.checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* input[type='checkbox'] {
  width: 50px;
  height: 50px;
} */
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
    min-width: 75px;
    cursor: pointer;
    color: white;
    padding: 0.25em 0.5em;
    background: rgba(255, 255, 255, 0.095);
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 10px;
    height: 100vh;
    /* overflow: auto; */
}

.grid-title {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
    min-height: 50px;
    /* overflow: hidden; */
    margin: 2px;
    background-color: rgba(255, 255, 255, 0.05);
}

.grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
    min-height: 50px;
    overflow: hidden;
    margin: 2px;
    background-color: rgba(255, 255, 255, 0.05);
    cursor: pointer;
}

.grid-item img {
    width: 30px;
    height: 30px;
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
    width: 50px;
}

.tier:hover {
    background: rgba(135, 207, 235, 0.205);
    outline: 1px solid white;
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
    min-width: 10em;
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
</style>
