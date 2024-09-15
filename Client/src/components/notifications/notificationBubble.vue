<template>
    <div v-if="visible" class="notification-bubble" :class="type" @click="handleClick">
        <span>{{ message }}</span>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    message: String,
    type: {
        type: String,
        default: 'info' // or 'success', 'error', etc.
    },
    visible: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['click'])
const handleClick = () => {
    emit('click')
}
</script>
<style scoped>
.notification-bubble {
    position: fixed;
    bottom: 10px;
    right: 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.notification-bubble.info {
    background-color: #007bff;
}

.notification-bubble.success {
    background-color: #28a745;
}

.notification-bubble.error {
    background-color: #dc3545;
}
</style>