<template>
  <div id="app">

    <button class="reset-btn" @click="resetLikes">Reset Likes To Zero</button>
    <div class="feed">

    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
    </div>
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
