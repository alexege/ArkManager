<script setup></script>
<template>
    <div class="container">
        <div class="links">
            <router-link to="/boss/broodmother" class="link">Broodmother Lysrix</router-link>
            <!-- History is the default tab here -->
            <router-link to="/boss/megapithecus" class="link">Megapithecus</router-link>
            <router-link to="/boss/dragon" class="link">Dragon</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<style scoped>
.container {
    color: white;
    background-color: black;
    height: 100vh;
    overflow: auto;
}

.links {
    display: flex;
    justify-content: space-around;
}

.link {
    padding: 0.5em 1em;
    margin: 1em;
    outline: 1px solid black;
    border-radius: 5px;
}
</style>