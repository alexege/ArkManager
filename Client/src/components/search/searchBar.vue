<script setup></script>
<template>
    <div class="search-container">
        <input type="text" placeholder="Search..." />
    </div>
</template>
<style scoped>
.search-container {
    padding: 1em;
}

input {
    color: white;
    padding: 5px;
    border: 2px solid #052530;
    background-color: #3693af;
    /* background-color: #174c5c; */
}

input::placeholder {
    color: rgba(255, 255, 255, 0.568);
}

input:focus {
    outline: none;
    border: 2px solid white;
}
</style>