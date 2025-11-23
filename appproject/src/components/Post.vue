<template>
  <div class="post">
    <div class="post-header">
      <img :src="post.profilePic" alt="Profile" class="profile-pic">
      <div>
        <strong>{{ post.author }}</strong>
        <small>{{ post.date }}</small>
      </div>
    </div>

    <p>{{ post.comment }}</p>
    <img v-if="post.memePic" :src="post.memePic" alt="Meme" class="meme-pic">

    <button @click="likePost">❤️ Like {{ post.likes }}</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    post: Object
  },
  methods: {
    ...mapMutations(['incrementLikes']),
    likePost() {
      this.incrementLikes(this.post.id)
    }
  }
}
</script>
