<template>
  <div id="app">
    <button @click="resetLikes">Reset Likes to zero</button>

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
