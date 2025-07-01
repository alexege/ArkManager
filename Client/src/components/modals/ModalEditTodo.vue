<script setup>
import { reactive, watch, toRefs } from 'vue';

const props = defineProps({
    show: Boolean,
    todo: Object, // The original todo passed in
});

const emits = defineEmits(['close', 'update']);

const localTodo = reactive({
    title: null,
    priority: null
});

// Keep local state in sync with incoming prop
watch(
    () => props.todo,
    (newTodo) => {
        if (newTodo) {
            localTodo.title = newTodo.title;
            localTodo.priority = newTodo.priority;
        }
    },
    { immediate: true }
);

function close() {
    emits('close');
}

function submitEdit() {
    emits('update', {
        ...props.todo,
        title: localTodo.title,
        priority: localTodo.priority
    }); // Merge the original todo with the updated title
    close();
}
</script>
<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal-content">
            <h2 class="modal-title">Edit Todo</h2>
            <form @submit.prevent="submitEdit">

                <div class="form-group inputs">
                    <input type="text" v-model="localTodo.title" class="form-input" required />
                    <select name="priority" id="priority" v-model="localTodo.priority">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <select name="author" id="author">
                        <option value="">Author 1</option>
                        <option value="">Author 2</option>
                        <option value="">Author 3</option>
                    </select>
                </div>

                <!-- <div class="bottom">
                    <select v-model="selectedOption" @change="addTodoCategory">
                        <option value="" disabled>Category</option>
                        <option value="custom">Custom</option>
                        <option vale="">None</option>
                        <option :value="category.name" v-for="category in allCategories" :key="category">{{
                            category.name }}
                        </option>
                    </select>

                    <div v-show="selectedOption === 'custom'" class="add-category">
                        <input type="text" v-model="customValue.name">
                        <button @click.prevent="addACategory">Add</button>
                    </div>
                    <div class="category-list">
                        <div class="category" v-for="category in todoCategories" :key="category._id">
                            <a>
                                <span>{{ category }}</span>
                                <span v-if="permissionToManage(category)" @click.prevent="removeCategory(category)">
                                    <i class='bx bx-x'></i>
                                </span>
                            </a>
                        </div>
                    </div>
                </div> -->

                <div class="form-actions">
                    <button type="button" @click="close" class="btn-cancel">
                        Cancel
                    </button>
                    <button type="submit" class="btn-save">
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.inputs {
    display: flex;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    color: black;
    background-color: white;
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 28rem;
}

.modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.form-group {
    margin-bottom: 1rem;
}

.form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.form-input {
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    outline: none;
}

.form-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.form-actions {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
}

.btn-cancel {
    padding: 0.5rem 1rem;
    color: #fff;
    background: #666;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-cancel:hover {
    color: #1f2937;
}

.btn-save {
    padding: 0.5rem 1rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
}

.btn-save:hover {
    background-color: #1d4ed8;
}
</style>