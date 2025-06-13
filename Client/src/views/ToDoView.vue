<script setup>
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

// Components
import Todo from "@/components/todo/todo.vue";
import AddTodo from "@/components/todo/addTodo.vue";

// Stores
import { useTodoListStore } from "@/stores/todo.store";
import { useCategoryStore } from "@/stores/category.store";
import { useAuthStore } from "@/stores/auth.store";

// Todo List Store
const todoStore = useTodoListStore();
const { todoList, completedTodos, incompleteTodos, dropZones } = storeToRefs(todoStore);
const { fetchTodos } = todoStore;
fetchTodos();

// Category Store
const categoryStore = useCategoryStore();
const { allCategories } = storeToRefs(categoryStore);
categoryStore.fetchCategories();

// Auth Store
const { activeUser } = storeToRefs(useAuthStore());

// Route Handling
const route = useRoute();
const category = ref(route.params.category);

watch(() => route.params.category, (newCategory) => {
  category.value = newCategory;
});

// Filtered Todos
const filteredTodos = computed(() => todoStore.getTodosByCategory(category.value));

const filteredTodosComplete = computed(() =>
  category.value ? todoStore.getCompleteTodosByCategory(category.value) : completedTodos.value
);

const filteredTodosIncomplete = computed(() =>
  category.value ? todoStore.getInCompleteTodosByCategory(category.value) : incompleteTodos.value
);

// Drag and Drop
const startZoneId = ref(null);

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemId", item.id);
  startZoneId.value = item;
};

const onDrop = (event, zoneId) => {
  const start = dropZones.value.find(zone => zone.zoneId == startZoneId.value);
  const end = dropZones.value.find(zone => zone.zoneId == zoneId);

  if (start && end) {
    [start.todo, end.todo] = [end.todo, start.todo]; // Swap todos
  }
};

// Category Management
const activeCategoryFilter = ref('All');

const activeCategory = (cat) => {
  activeCategoryFilter.value = cat;
  category.value = cat;
};

const deleteCategory = (id) => {
  categoryStore.deleteCategory(id);
};

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
  <div class="todo-container">
    <h2>Add a new Todo Item</h2>

    <!-- Add Todo List Item Form -->
    <AddTodo />

    <!-- Category List -->
    <div class="category-list">
      <div v-for="category in allCategories" :key="category" class="category">
        <a @click.prevent="activeCategory(category.name)">
          <span>{{ category.name }}</span>
          <span v-if="hasPermission(category)" @click.prevent="deleteCategory(category._id)">
            <i class="bx bx-x"></i>
          </span>
        </a>
      </div>
    </div>

    <div class="content">
      <!-- Incomplete Todos -->
      <div class="incomplete-items" v-if="filteredTodosIncomplete.length">
        <h3>Pending ({{ filteredTodosIncomplete.length }})</h3>
        <ul class="todo-headers">
          <li class="completion">Completion</li>
          <li class="categories">Categories</li>
          <li class="todo">Todo</li>
          <li class="author">Author</li>
          <li class="priority">Priority</li>
          <li class="actions">Actions</li>
        </ul>
        <div v-for="todo in filteredTodosIncomplete" :key="todo._id">
          <Todo :todo="todo" @category="activeCategory" />
        </div>
      </div>

      <!-- Completed Todos -->
      <div class="completed-items" v-if="filteredTodosComplete.length">
        <h3>Completed ({{ filteredTodosComplete.length }})</h3>
        <ul class="todo-headers">
          <li class="completion">Completion</li>
          <li class="categories">Categories</li>
          <li class="todo">Todo</li>
          <li class="author">Author</li>
          <li class="priority">Priority</li>
          <li class="actions">Actions</li>
        </ul>
        <div v-for="todo in filteredTodosComplete" :key="todo._id">
          <Todo :todo="todo" @category="activeCategory" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Layout */
.todo-container {
  text-align: center;
  color: white;
  height: 100%;
}

.content {
  display: flex;
  gap: 1em;
  padding-top: 1em;
  margin: 0 auto;
  width: 90%;
}

/* Column Flex Layout */
.todo-headers {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid white;
}

.todo-headers li {
  list-style: none;
  flex: 1;
  text-align: center;
  border: 1px solid red;
}

/* Header Column Widths */
.completion,
.author,
.priority,
.actions {
  flex: 1;
}

.categories {
  flex: 2;
}

.todo {
  flex: 3;
}

/* Completed & Incomplete Items */
.incomplete-items,
.completed-items {
  flex: 1;
  border: 1px solid white;
}

.todo-headers .categories {
  flex: 2;
}

.todo-headers .todo {
  flex: 5;
}

/* Add Todo Form */
.add-todo-form {
  padding: 1em;
  display: flex;
  justify-content: center;
}

.add-todo-form input {
  flex: 1;
  padding: 0.25em;
  border-radius: 5px;
}

.add-todo-form button {
  padding: 0.25em;
}

/* Category List */
.category-list {
  display: flex;
  justify-content: center;
  gap: 0.5em;
  padding: 1em;
}

.category {
  border-radius: 20px;
  border: 1px solid #CCF;
  padding: 8px 12px;
  display: flex;
  justify-content: center;
  font-size: 0.75em;
  cursor: pointer;
  min-width: 30px;
  font-family: "Trip Sans VF", "Trip Sans", Arial, sans-serif;
}

.category:hover {
  outline: 1px solid lime;
}

.category a {
  min-height: 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: inherit;
}

/* Icons */
i {
  padding: 0.1em 0.25em;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
}

i:hover {
  color: red;
}
</style>