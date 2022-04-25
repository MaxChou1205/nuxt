import axios from 'axios'
import Vuex from 'vuex'
import Cookie from 'js-cookie'

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
      clearToken(state) {
        state.token = null
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
            commit('setToken', res.idToken)
            localStorage.setItem('token', res.idToken)
            localStorage.setItem(
              'tokenExpiration',
              new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
            )
            Cookie.set('jwt', res.idToken)
            Cookie.set(
              'expirationDate',
              new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
            )

            return this.$axios.$post('api/', {
              data: 'Authenticated!',
            })
          })
          .catch((e) => {
            console.log(e)
          })
      },
      initAuth({ commit, dispatch }, req) {
        let token = null
        let expirationDate
        if (req) {
          if (!req.headers.cookie) return
          const jwtCookie = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('jwt='))
          if (!jwtCookie) return
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token')
          dispatch('logout')
          return
        }

        commit('setToken', token)
      },
      logout({ commit }) {
        commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      },
    },
    getters: {
      posts: (state) => state.posts,
      isAuth: (state) => state.token !== null,
    },
  })
}

export default createStore
