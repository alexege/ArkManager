<script setup>
import { ref, computed, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import { storeToRefs } from 'pinia'

import ModalEditTodo from "../modals/ModalEditTodo.vue";
import category from "./category.vue";

const emit = defineEmits(['category'])
const props = defineProps(["todo"]);

// Auth Store
import { useAuthStore } from "@/stores/auth.store";
const { activeUser } = storeToRefs(useAuthStore());

// Todo List Store
import { useTodoListStore } from "../../stores/todo.store";
const todoStore = useTodoListStore();
const { toggleCompleted, editTodo, deleteTodo } = todoStore;

const isEditing = ref(false);
const editItem = ref(props.todo);

const toggleEditMode = (todo) => {
  editItem.value = todo.title;
  editItem.value = todo
  isEditing.value = !isEditing.value;
};
const updateTodo = (todo) => {
  console.log("updateTodo:", todo);

  // todo.title = editItem.value;
  isEditing.value = !isEditing.value;

  todoStore.editTodo(todo._id, todo);
};

const deleteTodoItem = (itemId) => {

  const confirmed = window.confirm('Are you sure  you wish to delete this item?')
  if (confirmed) {
    todoStore.deleteTodo(itemId);
  }
};

const timeDiff = (date1, date2) => {
  if (date1 > date2) {
    [date1, date2] = [date2, date1];
  }

  // Get the total difference in milliseconds
  const diffInMs = date2 - date1;

  // Return false if value is too small (nothing shows up)
  if (diffInMs == 0 || diffInMs < 1000) {
    console.log("Diff in time too small, not rendering time since posted")
    return false;
  }

  // Calculate the differences
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

// Permission to interact / edit content
const permissionToManage = (todo) => {

  // Admin, Moderator, Author/Owner

  if (activeUser.value) {
    // Content Owner
    if (todo.author && activeUser.value.id === todo.author._id) {
      //Has full access, as is owner
    } else if (activeUser.value.roles.includes("ROLE_ADMIN")) {
      //Has full access, as is admin
    } else if (activeUser.value.roles.includes("ROLE_MODERATOR")) {
      //Has full access, as is moderator
    } else {
      return false
    }
    return true
  }
}

const isHovered = ref(false)
const scrollContainer = ref(null)

function handleWheel(event) {
  console.log("Scrolling");
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft += event.deltaY
  }
}

// const hoveredCategoryId = ref(null)

// const handleMouseEnter = (id) => {
//   hoveredCategoryId.value = id
// }

// const handleMouseLeave = () => {
//   hoveredCategoryId.value = null
// }

</script>

<template>
  <div class="todo-container">

    <div class="completion grid-item-field ">
      <input type="checkbox" v-if="permissionToManage(todo)" class="checkbox" @click="toggleCompleted(todo)"
        :checked="todo.completed" />
    </div>

    <div class="categories grid-item-field" @wheel.prevent="handleWheel" ref="scrollContainer">

      <div class="category-wrapper">
        <div v-for="category in todo.categories" :key="category._id">
          <category :category="category" @category="$emit('category', $event)" />
        </div>
      </div>

      <!-- <span v-for="category in todo.categories" :key="category" class="category scroll-container"
        @mouseenter="handleMouseEnter(category._id)" @mouseleave="handleMouseLeave">
        <a @click.prevent="$emit('category', category.name)">
          {{ category.name }}
        </a>
        <i class="bx bx-x category-x" v-if="hoveredCategoryId === category._id" @click="deleteCategory(category._id)" />
      </span> -->
    </div>

    <div class="content grid-item-field">
      <span class="todo-body" @dblclick="toggleEditMode(todo)">
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
      </span>
    </div>
    <div class="author grid-item-field">
      <template v-if="todo.author && todo.author.username">
        {{ todo.author.username }}
      </template>
    </div>

    <div class="priority grid-item-field"
      :class="{ high: todo.priority == 'High', medium: todo.priority == 'Medium', low: todo.priority == 'Low' }">
      <span class="priority">{{ todo.priority }}</span>
    </div>

    <div class="actions grid-item-field">
      <span :class="{ disabled: !permissionToManage(todo) }" @click="permissionToManage(todo) && toggleEditMode(todo)">
        <i class="bx bx-edit"></i>
      </span>
      <span :class="{ disabled: !permissionToManage(todo) }"
        @click="permissionToManage(todo) && deleteTodoItem(todo._id)">
        <i class="bx bx-trash"></i>
      </span>
    </div>

    <modal-edit-todo :show="isEditing" :todo="editItem" @close="isEditing = false" @update="updateTodo" />

  </div>
</template>


<style scoped>
.category-wrapper {
  display: inline-flex;
  gap: 5px;

  margin-left: auto;
  margin-right: auto;

  /* Prevent shrinking and allow wrapping to stay horizontal */
  white-space: nowrap;
  flex-shrink: 0;
}

.checkbox {
  cursor: pointer;
}

.todo-container {
  display: grid;
  grid-template-columns: .5fr 2fr 4fr 1fr 1fr 1fr;
  gap: 10px;
}

.grid-item-field {
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  /* flex-wrap: wrap; */
  gap: 5px;
  /* background-color: rgba(255, 255, 255, 0.15); */
  max-height: 26px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  scrollbar-width: none;
}

/* .grid-item-field:not(:first-of-type):not(:last-of-type) { */
.grid-item-field:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(5)):not(:last-of-type) {
  border: 1px solid #ccc;
}

.grid-item-field.actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}

.grid-item-field.actions button {
  /* padding: .25em; */
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

.completion {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.categories {
  display: flex;
  justify-content: flex-start;
  scroll-behavior: smooth;
  align-items: center;
  flex: 2;
  gap: 5px;
}

.priority {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex: 5;
}

.author {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1;
}

.actions .bx {
  cursor: pointer;
}

.actions .disabled .bx {
  opacity: 0.25;
  cursor: not-allowed;
}

/* Categories */
.category {
  /* display: flex; */
  /* align-items: center; */
  /* border-radius: 15px; */
  /* padding: 2px 6px; */
  /* margin-right: 4px; */
  position: relative;
  /* color: black; */
  color: white;
  /* background-color: #eef; */
  border: 1px solid white;
  padding: 2px 10px;
  font-size: 0.8em;
  justify-content: center;
  border-radius: 20px;
}

.category:hover {
  outline: 1px solid lime;
}

.category-x {
  position: absolute;
  top: -5px;
  right: -5px;
  cursor: pointer;
  border-radius: 50%;
  background: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.category a {
  min-height: 20px;
  text-decoration: none;
  /* color: black; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.category a:hover {
  cursor: pointer;
  color: purple;
}

/* Priority */
.high {
  background-color: red;
  color: white;
  font-weight: bold;
  min-width: 30px;
  cursor: pointer;
}

.medium {
  background-color: orange;
  color: white;
  font-weight: bold;
  min-width: 30px;
  cursor: pointer;
}

.low {
  background-color: green;
  color: white;
  font-weight: bold;
  min-width: 30px;
  cursor: pointer;
}
</style>