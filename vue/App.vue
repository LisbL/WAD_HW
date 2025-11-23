<template>
  <div id="app">
    <h1>All Posts</h1>
    
    <button @click="resetLikes" style="margin-bottom: 20px;">
      Reset Likes
    </button>
    
    <Post 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
    />
  </div>
</template>

<script>
import Post from './components/Post.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { Post },
  computed: {
    ...mapState(['posts'])
  },
  methods: {
    ...mapMutations(['resetLikes'])
  }
}
</script>

<style>
#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
button {
  padding: 8px 15px;
  border-radius: 5px;
  background-color: #ff8080;
  border: none;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #ff4d4d;
}
</style>
