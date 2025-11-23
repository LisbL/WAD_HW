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
import { mapMutations } from 'vuex';

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

<style scoped>
.post {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.meme-pic {
  max-width: 100%;
  margin-top: 10px;
}

button {
  cursor: pointer;
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #ff8080;
  color: white;
  border-radius: 5px;
}

button:hover {
  background-color: #ff4d4d;
}
</style>
