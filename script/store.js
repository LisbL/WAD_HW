import { createApp } from 'vue'
import { createStore } from 'vuex'

// Creating a new store instance
const store = createStore({

    //This is where the app's shared data is
    //state is like a global JSON object - everyone can use it
    state () {
        return {
            posts: [{},{},{},{},{},{},{},{},{},{}]
        }
    },

    //These are functions :)
    mutations: {
        incrementLikes(state, postId) {
            const post = state.posts.find(p => p.id === postId)
            if (post) post.likes++
        },

        resetLikes(state) {
            state.posts.forEach(p => p.likes = 0)
        }
    }
})

const app = createApp({})

// Installing the store instance as a plugin
app.use(store)