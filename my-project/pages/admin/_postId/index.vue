<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin',
  middleware: ['initAuth','auth'],
  components: {
    AdminPostForm,
  },
  asyncData(context) {
    return axios
      .get(`${process.env.baseURL}/posts/${context.params.postId}.json`)
      .then((res) => {
        return { loadedPost: { ...res.data, id: context.params.postId } }
      })
  },
  methods: {
    onSubmit(editedPost) {
      this.$store
        .dispatch('editPost', editedPost)
        .then(() => this.$router.push('/admin'))
    },
  },
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
