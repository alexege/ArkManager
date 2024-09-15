<template>
    <div>
        <div v-for="(text, index) in textsToCopy" :key="index" class="copy-section">
            <p>{{ text }}</p>
            <button @click="copyToClipboard(text)">Copy Text {{ index + 1 }}</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// An array of different texts to be copied
const textsToCopy = ref([
    'This is the first text',
    'Here is the second text',
    'And this is the third one'
]);

// Copy function that takes the text to be copied
const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        alert('Copied: ' + text);
    } catch (err) {
        alert('Failed to copy text: ' + err);
    }
};
</script>

<style scoped>
.copy-section {
    margin-bottom: 15px;
}
</style>
