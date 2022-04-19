<template>
  <div class="posts-page">
    <PostList :posts="posts" />
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList.vue'

export default {
  components: {
    PostList,
  },
  created() {
    // this.$store.dispatch('setPosts', this.posts)
  },
  computed: {
    posts() {
      return this.$store.getters.posts
    },
  },
}
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
