<script setup>
const creature = {
    health: 9553,
    stamina: 7809.0,
    torpidity: 8664.5,
    food: 10000,
    weight: 47704.0,
    oxygen: 645.0,
    movementSpeed: 100,
    melee: {
        damage: 308,
        mutations: {
            male: 0,
            female: 0
        },
        levels: 0
    },
    imprint: 0
}
</script>
<template>
    <div class="stat-container">
        <div class="name-container">
            <img src="" class="image" />
            <div class="names">
                <label for="">Title of Item - Lvl 285</label>
                <label for="">Other name</label>
            </div>
        </div>
        <div class="stats">
            <div class="stat">
                <i class="icon">
                    <>
                </i>
                <div class="details">
                    {{ creature.health.toLocaleString() }} /
                    {{ creature.health.toLocaleString() }} (44 | 0 | 22)
                </div>
            </div>
            <div class="stat">
                <i class="icon">
                    <>
                </i>
                <div class="details">
                    {{ creature.stamina.toLocaleString() }} /
                    {{ creature.stamina.toLocaleString() }} (44 | 0 | 22)
                </div>
            </div>
            <div class="stat">
                <i class="icon">
                    <>
                </i>
                <div class="details">
                    {{ creature.torpidity.toLocaleString() }} /
                    {{ creature.torpidity.toLocaleString() }} (44 | 0 | 22)
                </div>
            </div>
            <div class="stat">
                <i class="icon">
                    <>
                </i>
                <div class="details">
                    {{ creature.food.toLocaleString() }} / {{ creature.food.toLocaleString() }} (44
                    | 0 | 22)
                </div>
            </div>
            <div class="stat">
                <i class="icon">
                    <>
                </i>
                <div class="details">
                    {{ creature.weight.toLocaleString() }} /
                    {{ creature.weight.toLocaleString() }} (44 | 0 | 22)
                </div>
            </div>
            <div class="stat">
                <i class="icon">
                    <>
                </i>
                <div class="details">
                    {{ creature.oxygen.toLocaleString() }} /
                    {{ creature.oxygen.toLocaleString() }} (44 | 0 | 22)
                </div>
            </div>
            <div class="stat">
                <i class="icon">
                    <>
                </i>
                <div class="details">{{ creature.movementSpeed.toLocaleString() }} %</div>
            </div>
            <div class="stat">
                <i class="icon">
                    <>
                </i>
                <div class="details">
                    {{ creature.melee.damage }} % ({{ creature.melee.mutations.male }} |
                    {{ creature.melee.levels }} | {{ creature.melee.mutations.female }})
                </div>
            </div>
            <div class="stat">
                <i class="icon">
                    <>
                </i>
                <div class="details">{{ creature.imprint.toLocaleString() }} %</div>
            </div>
        </div>
        <div class="color-regions">
            <div class="color-region region-1">1</div>
            <div class="color-region region-2">2</div>
            <div class="color-region region-3">3</div>
            <div class="color-region region-4">4</div>
            <div class="color-region region-5">5</div>
            <div class="color-region region-6">6</div>
        </div>
        <div class="mutations">
            <label>Mutations:</label>
            <i>M</i>
            <p>0</p>
            <i>F</i>
            <p>0</p>
        </div>
    </div>
</template>
<style scoped>
/* #052530 */
/* #011a22 */
/* #174c5c */
* {
    color: white;
}

.stats {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 0px 10px;
}

.stat {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* background-color: #174c5c; */
}

.name-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.name-container label {
    flex: 1;
    text-align: center;
}

.names {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.icon {
    width: 25px;
    height: 25px;
    /* padding: 0 1em; */
    /* outline: 1px solid red; */
}

.details {
    flex: 1;
    text-align: center;
    background-color: #011a22;
}

.stat-container {
    outline: 1px solid white;
    height: 75%;
    width: 350px;
    padding: 15px;
    background-color: #011a22b4;
}

.image {
    width: 100px;
    height: 100px;
}

.color-regions {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    padding: 10px;
}

.color-region {
    border: 1px solid white;
    flex: 1;
    text-align: center;
}

.mutations {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
