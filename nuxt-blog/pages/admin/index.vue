<template>
  <div class="admin-page">
    <section class="new-post">
      <!-- <AppButton @click="$router.push('/admin/new-post')"
        >Create Post</AppButton
      > -->
      <button @click="$router.push('/admin/new-post')">Create Post</button>
      <button style="margin-left: 10px" @click="onLogout">Logout</button>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <PostList :posts="posts" isAdmin />
    </section>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['initAuth', 'auth'],
  computed: {
    posts() {
      return this.$store.getters.posts
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/admin/auth')
    },
  },
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
