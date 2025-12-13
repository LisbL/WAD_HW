<template>
  <div id="app">

    <!-- Button that triggers the Vuex mutation "resetLikes" -->
    <button class="reset-btn" @click="resetLikes">Reset Likes To Zero</button>
    <div class="feed">

      <!-- 
        Loop through all posts from Vuex state.
        v-for renders a <Post> component for each post object.
        :key ensures efficient DOM updates.
        :post passes the current post as a prop into the Post component.

        CREATE A SEPARATE VIE FILE FOR THIS POST!!!
      -->

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
   // Register the Post component so it can be used in the template
  components: { Post },
  computed: {
     /*
      mapState(['posts']) takes the 'posts' state from Vuex
      and makes it available as this.posts in the component.
      This means the component reacts automatically to changes in Vuex state.
    */
    ...mapState(['posts'])
  },
  methods: {
    /*
      mapMutations(['resetLikes']) maps the Vuex mutation
      "resetLikes" to this.resetLikes() in the component.
      Clicking the button calls this.resetLikes(), which updates Vuex state.
    */
    ...mapMutations(['resetLikes'])
  }
}
</script>
