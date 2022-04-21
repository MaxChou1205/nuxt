<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm :post="post" @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm.vue'

export default {
  layout: 'admin',
  components: {
    AdminPostForm,
  },
  data() {
    return {
      post: {
        title: '',
        previewText: '',
        thumbnail:
          'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg',
      },
    }
  },
  methods: {
    onSubmit(postData) {
      this.$store
        .dispatch('addPost', postData)
        .then(() => this.$router.push('/admin'))
    },
  },
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
