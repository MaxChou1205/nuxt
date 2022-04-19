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
  asyncData(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          posts: [
            {
              id: '1',
              title: 'First Post',
              previewText: 'This is our first post!',
              thumbnail:
                'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg',
            },
            {
              id: '2',
              title: 'Second Post',
              previewText: 'This is our second post!',
              thumbnail:
                'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg',
            },
          ],
        })
      }, 1500)
    })
      .then((data) => data)
      .catch((e) => context.error(e))
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
