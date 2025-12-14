<template>
  <div>
    <!-- HEADER -->
    <header id="top">
      <div class="header-left">
        <router-link to="/home">Home</router-link>
        <span class="separator">|</span>
        <router-link to="/addpost">Add Post</router-link>
      </div>

      <a class="logo" href="#" @click.prevent="toggleDropdown">
        <img
          id="profile-photo"
          src="/images/fihh.png"
          width="50"
          height="50"
          alt="Profile"
        />
      </a>

      <div v-if="showDropdown" class="dropdown-menu">
        <p>Fihh Fish</p>
        <p>fihh@fish.com</p>
        <router-link to="/login">Logout</router-link>
      </div>
    </header>


    <!-- MAIN CONTENT -->
    <main class="feed">
      <h1>Feed</h1>

    <button class="reset-btn" @click="resetLikes">
      Reset Likes
    </button>

    <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </main>

    <!-- FOOTER -->
    <footer>
      <p>Terms and conditions:</p>
      <p>
        Welcome to GoofAhPosts.com! Our Terms and Conditions establish
        the rules for using our services...
      </p>
    </footer>
  </div>
</template>


<script>
import Post from '../components/Post.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { Post },
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    ...mapState(['posts'])
  },
  methods: {
    ...mapMutations(['resetLikes']),
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    }
  }
}
</script>

<style scoped src="../assets/css_files/post.css"></style>