<template>
  <div>
    <input type="text" v-model="userId" />
    <button @click="gotoUser">Load User</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
    }
  },
  methods: {
    gotoUser() {
      this.$router.push('users' + '/' + this.userId)
    },
  },
}
</script>

<style></style>
