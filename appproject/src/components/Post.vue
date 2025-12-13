<template>
  <div class="post">

    <!-- Header section containing profile picture and author info -->
    <div class="post-header">

      <!-- Bind the image source to post.profilePic -->
      <img :src="post.profilePic" alt="Profile" class="profile-pic">
      <div>

        <!-- Display the post author's name -->
        <strong>{{ post.author }}</strong>

        <!-- Display the date of the post -->
        <small>{{ post.date }}</small>
      </div>
    </div>

    <!-- Display the text comment of the post -->
    <p>{{ post.comment }}</p>

    <!-- Conditionally render a meme picture if memePic exists -->
    <img v-if="post.memePic" :src="post.memePic" alt="Meme" class="meme-pic">

    <!-- Button to like the post; shows current like count -->
    <button @click="likePost">❤️ Like {{ post.likes }}</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  // The parent component passes a full post object as a prop
  props: {
    post: Object
  },
  methods: {
    /*
      mapMutations connects Vuex mutations to component methods.
      This creates this.incrementLikes(id), which commits the mutation
      "incrementLikes" to update the global store.
    */
    ...mapMutations(['incrementLikes']),

    // Called when the Like button is clicked
    likePost() {
      // Commit the Vuex mutation and pass the post ID as an argument
      this.incrementLikes(this.post.id)
    }
  }
}
</script>
