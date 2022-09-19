<script lang="ts" setup>
const {user, logout} = useAuth();
</script>

<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/profile">Profile</NuxtLink>
      </li>
      <li v-if="user" class="logout" @click="logout">Logout</li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background: black;
  height: 10vh;
}

ul {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 2rem;
}

li {
  color: white;
  margin-right: 1rem;
}

.logout {
  margin-left: auto;
  cursor: pointer;
}
</style>
