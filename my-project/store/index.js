import axios from 'axios'
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
      token: null,
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
      setToken(state, token) {
        state.token = token
      },
    },
    actions: {
      nuxtServerInit({ commit }, context) {
        return axios
          .get(`${process.env.baseURL}/posts.json`)
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
      addPost({ commit, state }, post) {
        const createdPost = { ...post, updatedDate: new Date() }
        return axios
          .post(`${process.env.baseURL}/posts.json?auth=${state.token}`, {
            ...createdPost,
          })
          .then((res) => {
            commit('addPost', { ...createdPost, id: res.data.name })
          })
          .catch((err) => {
            console.log(err)
          })
      },
      editPost({ commit, state }, post) {
        return axios
          .put(
            `${process.env.baseURL}/posts/${post.id}.json?auth=${state.token}`,
            { ...post }
          )
          .then(() => {
            commit('editPost', post)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      authenticateUser({ commit }, authData) {
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.apiKey}`
        if (authData.isLogin) {
          authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.apiKey}`
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then((res) => {
            console.log(res)
            commit('setToken', res.idToken)
          })
          .catch((e) => {
            console.log(e)
          })
      },
    },
    getters: {
      posts: (state) => state.posts,
    },
  })
}

export default createStore
