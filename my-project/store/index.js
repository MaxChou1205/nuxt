import axios from 'axios'
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.posts = posts
      },
      addPost(state, post) {
        state.posts.push(post)
      },
      editPost(state, post) {
        const index = state.posts.findIndex((p) => p.id === post.id)
        state.posts[index] = post
      },
    },
    actions: {
      nuxtServerInit({ commit }, context) {
        return axios
          .get(
            'https://nuxt-blog-7ff1a-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
          )
          .then((res) => {
            const posts = []
            for (const key in res.data) {
              posts.push({ ...res.data[key], id: key })
            }
            commit('setPosts', posts)
          })
          .catch((err) => {
            context.error(err)
          })
        // return new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     commit('setPosts', [
        //       {
        //         id: '1',
        //         title: 'First Post',
        //         previewText: 'This is our first post!',
        //         thumbnail:
        //           'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg',
        //       },
        //       {
        //         id: '2',
        //         title: 'Second Post',
        //         previewText: 'This is our second post!',
        //         thumbnail:
        //           'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg',
        //       },
        //     ])
        //     resolve()
        //   }, 1500)
        // })
      },
      setPosts({ commit }, posts) {
        commit('setPosts', posts)
      },
      addPost({ commit }, post) {
        const createdPost = { ...post, updatedDate: new Date() }
        return axios
          .post(
            'https://nuxt-blog-7ff1a-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
            { ...createdPost }
          )
          .then((res) => {
            commit('addPost', { ...createdPost, id: res.data.name })
          })
          .catch((err) => {
            console.log(err)
          })
      },
      editPost({ commit }, post) {
        return axios
          .put(
            `https://nuxt-blog-7ff1a-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${post.id}.json`,
            { ...post }
          )
          .then(() => {
            commit('editPost', post)
          })
          .catch((err) => {
            console.log(err)
          })
      },
    },
    getters: {
      posts: (state) => state.posts,
    },
  })
}

export default createStore
