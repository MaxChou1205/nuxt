<script setup lang="ts">
import useTodo from "~/composables/useTodo";

const input = ref("");
const {todos, addTodo, updateTodo, deleteTodo} = useTodo();

const handleCreate = async () => {
  await addTodo(input.value)
  input.value = ""
}
</script>

<template>
  <div class="container">
    <NCard class="cards">
      <h1>My Todos</h1>
      <div class="add-todo">
        <input placeholder="Add a new todo..." v-model="input" @keyup.enter="handleCreate"/>
        <NButton @click="handleCreate">Add</NButton>
      </div>
      <NCard
          class="card"
          v-for="todo in todos"
          :key="todo.id"
          @click="updateTodo(todo.id)"
      >
        <h4 :class="{complete:todo.completed}">{{ todo.item }}</h4>
        <p @click="deleteTodo(todo.id)">x</p>
      </NCard>
    </NCard>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  margin: 0 auto;
  max-width: 50%;
}

.cards {
  padding: 2rem;
}

h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

input {
  outline: none;
  padding: 0 1rem;
}

.add-todo {
  display: flex;
  justify-content: space-between;
}

.card {
  padding: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.complete {
  text-decoration: line-through;
}
</style>
