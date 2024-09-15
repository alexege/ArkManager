<script setup>
let activeTier = null
const tiers = {
    gamma: { name: 'gamma', activeClass: 'gamma_active' },
    beta: { name: 'beta', activeClass: 'beta_active' },
    alpha: { name: 'alpha', activeClass: 'alpha_active' }
}
const selectTier = (selectedTier) => {
    const allGridItems = Array.from(document.querySelectorAll('.grid-item'))
    const clearClasses = () => {
        allGridItems.forEach((item) => {
            item.classList.remove('gamma_active', 'beta_active', 'alpha_active', 'blur')
        })
    }
    //Update main button classes
    if (selectedTier === 'gamma') {
        document.querySelector('#gamma-btn').classList.toggle('gamma_active')
        document.querySelector('#beta-btn').classList.remove('beta_active')
        document.querySelector('#alpha-btn').classList.remove('alpha_active')
    } else if (selectedTier === 'beta') {
        document.querySelector('#gamma-btn').classList.remove('gamma_active')
        document.querySelector('#beta-btn').classList.toggle('beta_active')
        document.querySelector('#alpha-btn').classList.remove('alpha_active')
    } else if (selectedTier === 'alpha') {
        document.querySelector('#gamma-btn').classList.remove('gamma_active')
        document.querySelector('#beta-btn').classList.remove('beta_active')
        document.querySelector('#alpha-btn').classList.toggle('alpha_active')
    }
    const updateClassses = (tier) => {
        allGridItems.forEach((item) => {
            const tierProps = tiers[tier]
            if (!tierProps) return
            // const hasNameClass = item.classList.contains(tierProps.name)
            const hasActiveClass = item.classList.contains(tierProps.activeClass)
            if (item.classList.contains(activeTier)) {
                //Deactivate current tier
                if (hasActiveClass) {
                    item.classList.remove(tierProps.activeClass)
                } else {
                    item.classList.add(tierProps.activeClass)
                }
            } else {
                item.classList.add('blur')
            }
        })
    }
    clearClasses()
    if (tiers[selectedTier]) {
        activeTier = activeTier === selectedTier ? null : selectedTier
        updateClassses(activeTier)
    } else {
        console.log(`Unknown tier: ${selectedTier}`)
    }
}
</script>
<template>
    <div>
        <div class="header">
            <h2>Megapithecus</h2>
            <img src="@/assets/bosses/megapithecus.png" class="item-img" width="200px" style="margin: 0 auto;" />

            <div class="difficulty">
                <button id="gamma-btn" class="gamma" @click="selectTier('gamma')">Gamma</button>
                <button id="beta-btn" class="beta" @click="selectTier('beta')">Beta</button>
                <button id="alpha-btn" class="alpha" @click="selectTier('alpha')">Alpha</button>
            </div>
        </div>
        <div class="grid">
            <div class="column-one">
                <div class="tributes">
                    <h2>Tributes & Artifacts</h2>
                    <div class="tributes-grid">
                        <div class="grid-title" style="grid-row: 1/3">Item</div>
                        <div class="grid-title" style="grid-column: 2/5">Quantity</div>
                        <div class="grid-item tier gamma" @click="selectTier('gamma')">
                            <div class="vertical">
                                <i class="bx bxs-objects-vertical-bottom"> </i>
                                <span class="title">Gamma</span>
                            </div>
                        </div>
                        <div class="grid-item tier beta" @click="selectTier('beta')">
                            <div class="vertical">
                                <i class="bx bxs-objects-vertical-bottom"> </i>
                                <div class="title">Beta</div>
                            </div>
                        </div>
                        <div class="grid-item tier alpha" @click="selectTier('alpha')">
                            <div class="vertical">
                                <i class="bx bxs-objects-vertical-bottom"> </i>
                                <div class="title">Alpha</div>
                            </div>
                        </div>
                        <div class="grid-item name gamma beta alpha">Player Level</div>
                        <div class="grid-item gamma">45</div>
                        <div class="grid-item beta">65</div>
                        <div class="grid-item alpha">85</div>
                        <div class="grid-item name gamma beta alpha">
                            <div class="unlock">
                                <img src="@/../../Client/src/assets/artifacts/Artifact_of_the_Brute.png" />
                                <p>Artifact of the Brute</p>
                            </div>
                        </div>
                        <div class="grid-item gamma">1</div>
                        <div class="grid-item beta">1</div>
                        <div class="grid-item alpha">1</div>
                        <div class="grid-item name gamma beta alpha">
                            <div class="unlock">
                                <img src="@/../../Client/src/assets/artifacts/Artifact_of_the_Devourer.png" />
                                <p>Artifact of the Devourer</p>
                            </div>
                        </div>
                        <div class="grid-item gamma">1</div>
                        <div class="grid-item beta">1</div>
                        <div class="grid-item alpha">1</div>
                        <div class="grid-item name gamma beta alpha">
                            <div class="unlock">
                                <img src="@/../../Client/src/assets/artifacts/Artifact_of_the_Pack.png" />
                                <p>Artifact of the Pack</p>
                            </div>
                        </div>
                        <div class="grid-item gamma">1</div>
                        <div class="grid-item beta">1</div>
                        <div class="grid-item alpha">1</div>
                        <div class="grid-item name beta alpha">
                            <div class="unlock">
                                <img src="@/../../Client/src/assets/trophies/Megalania_Toxin.png" />
                                <p>Megalania Toxin</p>
                            </div>
                        </div>
                        <div class="grid-item">-</div>
                        <div class="grid-item beta">5</div>
                        <div class="grid-item alpha">10</div>
                        <div class="grid-item name beta alpha">
                            <div class="unlock">
                                <img src="@/../../Client/src/assets/trophies/Megalodon_Tooth.png" />
                                <p>Megalodon Tooth</p>
                            </div>
                        </div>
                        <div class="grid-item">-</div>
                        <div class="grid-item beta">5</div>
                        <div class="grid-item alpha">10</div>
                        <div class="grid-item name beta alpha">
                            <div class="unlock">
                                <img src="@/../../Client/src/assets/trophies/Spinosaurus_Sail.png" />
                                <p>Spinosaurus Sail</p>
                            </div>
                        </div>
                        <div class="grid-item">-</div>
                        <div class="grid-item beta">5</div>
                        <div class="grid-item alpha">10</div>
                        <div class="grid-item name beta alpha">
                            <div class="unlock">
                                <img src="@/../../Client/src/assets/trophies/Therizino_Claws.png" />
                                <p>Therizino Claws</p>
                            </div>
                        </div>
                        <div class="grid-item">-</div>
                        <div class="grid-item beta">5</div>
                        <div class="grid-item alpha">10</div>
                        <div class="grid-item name beta alpha">
                            <div class="unlock">
                                <img src="@/../../Client/src/assets/trophies/Thylacoleo_Hook-Claw.png" />
                                <p>Thylacoleo Claw</p>
                            </div>
                        </div>
                        <div class="grid-item">-</div>
                        <div class="grid-item beta">5</div>
                        <div class="grid-item alpha">10</div>
                    </div>
                </div>
                <div class="rewards">

                    <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
                        <h2>Rewards</h2>
                    </div>
                    <div class="rewards-grid">
                        <div class="grid-title">Item</div>
                        <div class="grid-item tier gamma" @click="selectTier('gamma')">Gamma</div>
                        <div class="grid-item tier beta" @click="selectTier('beta')">Beta</div>
                        <div class="grid-item tier alpha" @click="selectTier('alpha')">Alpha</div>
                        <div class="grid-title">
                            <img src="https://ark.wiki.gg/images/a/a5/Element.png" alt="" width="20">

                            Element
                        </div>
                        <div class="grid-item gamma">20</div>
                        <div class="grid-item beta">56</div>
                        <div class="grid-item alpha">148</div>
                    </div>
                </div>
                <!-- <div class="stats">
                    <h2>Stats</h2>
                    <div class="stats-grid">
                        <div class="grid-item">Something</div>
                        <div class="grid-item">Something</div>
                        <div class="grid-item">Something</div>
                    </div>
                </div> -->
            </div>
            <div class="column-two">
                <h2>Engram Unlocks</h2>
                <div class="unlocks-grid">
                    <!-- <img src="https://www.dododex.com/media/creature/broodmotherlysrix.png" class="item-img" /> -->
                    <div class="grid-item">
                        Item
                    </div>
                    <div class="grid-item tier gamma" @click="selectTier('gamma')">
                        <span class="vertical">
                            <i class="bx bxs-objects-vertical-bottom"></i>
                            <span class="title">Gamma</span>
                        </span>
                    </div>
                    <div class="grid-item tier beta" @click="selectTier('beta')">
                        <span class="vertical">
                            <i class="bx bxs-objects-vertical-bottom"></i>
                            <span class="title">Beta</span>
                        </span>
                    </div>
                    <div class="grid-item tier alpha" @click="selectTier('alpha')">
                        <span class="vertical">
                            <i class="bx bxs-objects-vertical-bottom"></i>
                            <span class="title">Alpha</span>
                        </span>
                    </div>
                    <div class="grid-item name gamma beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item gamma">
                        <i class="bx bx-check"></i>
                    </div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name gamma beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item gamma">
                        <i class="bx bx-check"></i>
                    </div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name gamma beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item gamma">
                        <i class="bx bx-check"></i>
                    </div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name gamma beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item gamma">
                        <i class="bx bx-check"></i>
                    </div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name gamma beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item gamma">
                        <i class="bx bx-check"></i>
                    </div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-check"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-x"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name beta alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item beta"><i class="bx bx-x"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                    <div class="grid-item name alpha">
                        <div class="unlock">
                            <img src="">
                            <p></p>
                        </div>
                    </div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item"><i class="bx bx-x"></i></div>
                    <div class="grid-item alpha"><i class="bx bx-check"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
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
    padding: 0 .5em;
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
}

.grid-item img {
    width: 30px;
    height: 30px;
    padding: 5px;
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
    grid-template-columns: repeat(4, auto);
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
    grid-template-columns: repeat(4, auto);
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
    min-width: 50px;
    min-height: 50px;
    width: 150px;
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
