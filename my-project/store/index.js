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
    },
    actions: {
      nuxtServerInit({ commit }, context) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('setPosts', [
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
            ])
            resolve()
          }, 1500)
        })
      },
      setPosts({ commit }, posts) {
        commit('setPosts', posts)
      },
    },
    getters: {
      posts: (state) => state.posts,
    },
  })
}

export default createStore
