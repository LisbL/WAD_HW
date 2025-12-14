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

    <div class="action-buttons">
    <button class="reset-btn" @click="resetLikes">
      Reset Likes
    </button>

    <button class="delete-btn" @click="deleteAll">
      Delete All Posts
    </button>
    </div>

    <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @click="goToPost(post.id)"
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
import { mapMutations } from 'vuex'


export default {
  components: { Post },
  data() {
  return {
    showDropdown: false,
    posts: []
  }
},

  mounted() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      const token = localStorage.getItem('token')

      const res = await fetch('http://localhost:3000/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      this.posts = await res.json()
    },

    goToPost(id) {
      this.$router.push(`/post/${id}`)
    },

    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },

    goToAddPost() {
      this.$router.push('/addPost')
    },

    async deleteAll() {
      const token = localStorage.getItem('token')

      await fetch('http://localhost:3000/posts', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      this.fetchPosts()
    },
    ...mapMutations(['resetLikes']),
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    }
  }
}
</script>

<style scoped src="../assets/css_files/post.css"></style>