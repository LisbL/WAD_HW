import { createApp } from 'vue';
import store from './store.js';
import Post from './components/Post.vue';

const app = createApp({
  computed: {
    posts() {
      return store.state.posts;
    }
  },
  methods: {
    resetLikes() {
      store.commit('resetLikes');
    }
  },
  components: { Post }
});

app.use(store);
app.mount('#app');
