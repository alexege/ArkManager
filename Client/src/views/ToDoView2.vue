<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

// Components
import Todo from '@/components/todo/todo.vue';
import AddTodo from '@/components/todo/addTodo.vue';

// Stores
import { useTodoListStore } from '@/stores/todo.store';
import { useCategoryStore } from '@/stores/category.store';
import { useAuthStore } from "@/stores/auth.store";

// TodoList Store
const todoStore = useTodoListStore();
const { completedTodos, incompleteTodos } = storeToRefs(todoStore);
const { fetchTodos } = todoStore;
fetchTodos();

// Category Store
const categoryStore = useCategoryStore();
const { allCategories } = storeToRefs(categoryStore);
categoryStore.fetchCategories();

// Route Handling
const route = useRoute();
const category = ref(route.params.category);

const addItemInput = ref(null);
const headers = ['[✓]', 'Categories', 'Title', 'Author', 'Priority', 'Actions']; // Define headers for the grid

const newItem = ref({
    completed: false,
    categories: [],
    description: null,
    priority: 'Low'
});

//   Methods
// const addItem = () => {
//     items.value.push({
//         completed: false,
//         categories: ['test'],
//         description: newItem.value.description,
//         priority: newItem.value.priority,
//         author: 'Author Name',
//     });

//     //Set newItem back to default values
//     newItem.value.description = ''
//     newItem.value.priority = 'Low'

//     // Move focus back to the input field
//     addItemInput.value.focus();
// };

const deleteCategory = (category) => {
    console.log("Deleting category:", category)
}

//  Computed
const filteredTodosComplete = computed(() =>
    category.value ? todoStore.getCompleteTodosByCategory(category.value) : completedTodos.value
);

const filteredTodosIncomplete = computed(() =>
    category.value ? todoStore.getInCompleteTodosByCategory(category.value) : incompleteTodos.value
);

// Auth Store
const { activeUser } = storeToRefs(useAuthStore());

// Permission Handling
const hasPermission = (category) => {
    if (!activeUser.value) return false;
    return (
        category.author?.id === activeUser.value.id ||
        activeUser.value.roles.includes("ROLE_ADMIN") ||
        activeUser.value.roles.includes("ROLE_MODERATOR")
    );
};

</script>

<template>
    <div id="app">
        <div style="width: 80%; margin: 0 auto;">

            <h1>To do List</h1>

            <AddTodo />

            <!-- <pre>{{ allCategories }}</pre> -->

            <!-- Category List -->
            <div class="category-list">
                <div v-for="category in allCategories" :key="category" class="category">
                    <a @click.prevent="activeCategory(category.name)">
                        <span>{{ category.name }}</span>
                        <!-- <span v-if="hasPermission(category)" @click.prevent="deleteCategory(category._id)">
                            <i class="bx bx-x"></i>
                        </span> -->
                    </a>
                    <!-- <category :category="category" @delete-category="deleteCategory" /> -->
                </div>
            </div>

            <!-- Incomplete Item Rows -->
            <div class="incomplete-items" v-if="filteredTodosIncomplete.length">
                <h4 class="grid-title incomplete">Incomplete Items ({{ filteredTodosIncomplete.length }})</h4>
                <!-- Header Row -->
                <div class="grid-header">
                    <div class="grid-header-item" v-for="(header, index) in headers" :key="'header-' + index">
                        {{ header }}
                    </div>
                </div>

                <hr style="margin-bottom: .75em;">

                <div class="grid-items">
                    <div v-for="todo in filteredTodosIncomplete" :key="todo._id">
                        <todo :todo="todo" />
                    </div>
                </div>
            </div>

            <!-- Completed Item Rows -->
            <div class="completed-items" v-if="filteredTodosComplete.length">

                <h4 class="grid-title completed">Completed Items ({{ filteredTodosComplete.length }})</h4>

                <!-- Header Row -->
                <div class="grid-header">
                    <div class="grid-header-item" v-for="(header, index) in headers" :key="'header-' + index">
                        {{ header }}
                    </div>
                </div>

                <hr style="margin-bottom: .75em;">

                <div class="grid-items">
                    <div v-for="todo in filteredTodosComplete" :key="todo._id">
                        <todo :todo="todo" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#app {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 20px;
    /* width: 80%; */
    margin: 0 auto;
}

/* Category List */
.category-list {
    display: flex;
    justify-content: center;
    gap: 0.5em;
    padding: 1em;
}

.category {
    font-size: .75em;
    border: 1px solid white;
    padding: 6px 12px;
    border-radius: 12px;
    cursor: pointer;
}

.delete-category {
    border: 1px solid white;
    border-radius: 50%;
    padding: 2px 4px;
    margin: 0 2px;
    cursor: pointer;
}

.delete-category:hover {
    color: red;
}

.grid-title {
    color: white;
    margin: 1em;
}

.grid-title.incomplete {
    color: #ff0000;
}

.grid-title.completed {
    color: #00ff00;
}

.grid-header {
    display: grid;
    grid-template-columns: .5fr 2fr 4fr 1fr 1fr 1fr;
    /* 4 equal-width columns */
    margin-bottom: 10px;
    gap: 10px;
    font-weight: bold;
    text-align: center;
}

.grid-header-item {
    color: white;
}

.grid-items {
    display: grid;
    grid-template-columns: 1fr;
    /* Single column to ensure each item takes up an entire row */
    gap: 10px;
    margin-bottom: 5em;
}

.grid-item {
    display: grid;
    grid-template-columns: .5fr 3fr 1fr 1fr 1fr;
    /* 4 equal-width columns for each item */
    gap: 10px;
    color: white;
    /* border: 1px solid #ccc; */
    /* background-color: #f9f9f9; */
}

.grid-item-field {
    display: flex;
    padding: 5px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
}

.grid-item-field:not(:first-of-type):not(:last-of-type) {
    border: 1px solid #ccc;
}

.grid-item-field.actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
}

.grid-item-field.actions button {
    padding: .25em;
    background: none;
    color: white;
    border: 1px solid white;
    cursor: pointer;
}

.grid-item-field.actions button:hover {
    padding: .25em;
    background: none;
    color: black;
    background-color: white;
    border: 1px solid black;
    cursor: pointer;
}

.add-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.add-item-button {
    margin: 1em 0;
    padding: .25em;
    cursor: pointer;
}

.add-item input[type="text"] {
    height: 25px;
    min-width: 30em;
}

.add-item select {
    height: 30px;
    width: 85px;
}

.low {
    color: lime;
}

.med {
    color: orange;
}

.high {
    color: red;
}
</style>
