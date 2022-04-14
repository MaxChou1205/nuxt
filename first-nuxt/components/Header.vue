<template>
  <header class="header">
    <ul>
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li><nuxt-link to="/users">Users</nuxt-link></li>
    </ul>
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  list-style: none;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
