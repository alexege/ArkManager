<script setup>
const props = defineProps(['points'])
</script>
<template>
    <div>
        <!-- <label for="point">[{{ points.x }},{{ points.y }}]</label> -->
        <div class="point"></div>
    </div>
</template>
<style scoped>
.point {
    transform: translate(-50%, -50%);
    width: 5px;
    height: 5px;
    /* width: 10px;
    height: 10px; */
    border-radius: 50%;
    outline: 1px solid black;
    background-color: red;
}
</style>