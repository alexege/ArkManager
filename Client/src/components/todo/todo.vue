<script setup>
import { ref, computed, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import { storeToRefs } from 'pinia'

import ModalEditTodo from "../modals/ModalEditTodo.vue";

defineEmits(['category'])
defineProps(["todo"]);

// Auth Store
import { useAuthStore } from "@/stores/auth.store";
const { activeUser } = storeToRefs(useAuthStore());

// Todo List Store
import { useTodoListStore } from "../../stores/todo.store";
const todoStore = useTodoListStore();
const { toggleCompleted, editTodo, deleteTodo } = todoStore;

const isEditing = ref(false);
const editItem = ref({
  title: null
});

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

</script>

<template>
  <div class="todo-container">

    <div class="completion grid-item-field ">
      <input type="checkbox" v-if="permissionToManage(todo)" class="checkbox" @click="toggleCompleted(todo)"
        :checked="todo.completed" />
    </div>

    <div class="categories grid-item-field">
      <span v-for="category in todo.categories" :key="category" class="category">
        <a @click.prevent="$emit('category', category.name)">
          {{ category.name }}
        </a>
        <i class="bx bx-x" @click="deleteCategory(category._id)" />
      </span>
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
  flex-wrap: wrap;
  gap: 5px;
  background-color: rgba(255, 255, 255, 0.15);
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
  justify-content: center;
  align-items: center;
  flex: 2;
  flex-wrap: wrap;
  /* outline: 1px solid rgb(28, 197, 104); */
  gap: 5px;
}

.priority {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  /* outline: 1px solid rgb(178, 194, 33); */
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex: 5;
  /* outline: 1px solid rgb(17, 122, 221); */
}

.author {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  /* outline: 1px solid rgb(0, 255, 42); */
}

.actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  /* outline: 1px solid rgb(187, 20, 209); */
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
  display: flex;
  align-items: center;
  color: black;
  background-color: #eef;
  /* border-radius: 15px; */
  /* padding: 2px 6px; */
  /* margin-right: 4px; */
  padding: 1px 2px;
  font-size: 0.8em;
  justify-content: center;
}

.category:hover {
  outline: 1px solid lime;
}

.category .bx:hover {
  color: red;
  cursor: pointer;
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

/* .todo-body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
} */

/* Priority */
.high {
  background-color: red;
  color: white;
  font-weight: bold;
  border: 1px solid black;
  padding: 2px 5px;
  min-width: 30px;
  cursor: pointer;
}

.medium {
  background-color: orange;
  color: white;
  font-weight: bold;
  border: 1px solid black;
  padding: 2px 5px;
  min-width: 30px;
  cursor: pointer;
}

.low {
  background-color: green;
  color: white;
  font-weight: bold;
  border: 1px solid black;
  padding: 2px 5px;
  min-width: 30px;
  cursor: pointer;
}
</style>
<!-- <style scoped>
.todo-container {
  min-width: 50%;
  max-width: 80%;
  /* outline: 1px solid black; */
  padding: 5px;
  margin: 10px auto;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  /* outline: 1px solid black; */
  border-radius: 2px;
}

.checkbox {
  margin: 5px;
  width: 15px;
  height: 15px;
}

.checkbox:hover {
  cursor: pointer;
}

.todo-category {
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-category .category {
  margin: 0 .25em;
}

.category {
  /* background-color: #EEF; */
  border-radius: 20px;
  border: 1px #CCF solid;
  /* padding: 2px 5px; */
  padding: 8px 12px;
  /* display: inline; */
  display: flex;
  justify-content: center;
  font-size: .75em;
  cursor: pointer;
  min-width: 30px;
}

.category:hover {
  outline: 1px solid lime;
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

i {
  padding: .10em .25em;
  font-size: 20px;
  cursor: pointer;

  display: flex;
  justify-content: center;
}

i:hover {
  color: red;
}

.todo-body input {
  text-align: center;
}

.todo-actions {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
}

.todo-actions i {
  font-size: 1em;
  padding: 0 5px;
  cursor: pointer;
}

.todo-actions i:hover {
  color: white;
}

.completed {
  text-decoration: line-through;
}

/* .updated-at,
.created-at {
  font-size: 10px;
} */

.is-completed {
  outline: 2px solid lime;
  /* background-color: rgba(50, 205, 50, 0.25); */
  background-color: black;
}

.is-incomplete {
  outline: 2px solid red;
  /* background-color: rgba(255, 0, 0, 0.25); */
  background-color: black;
}

.todo-top {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 75%;
}

.todo-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /* min-width: 115px; */
  flex: 1;
}

.todo-bottom {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  height: 25%;
}

.todo-body {
  flex: 2;
}

.priority {}
</style> -->
