<template>
  <section class="post-list">
    <PostPreview
      id="1"
      :isAdmin="isAdmin"
      thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
      title="title text 1"
      previewText="preview text 1"
    />
    <PostPreview
      id="2"
      :isAdmin="isAdmin"
      thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
      title="title text 2"
      previewText="preview text 2"
    />
  </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview.vue'
export default {
  components: {
    PostPreview,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
