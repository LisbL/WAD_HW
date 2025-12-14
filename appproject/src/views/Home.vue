<template>
  <div>

    <div class="actions">
      <button @click="logout">Logout</button>
      <button @click="goToAddPost">Add Post</button>
      <button @click="deleteAll">Delete All</button>
    </div>

    <div class="feed">
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @click="goToPost(post.id)"
      />
    </div>

  </div>
</template>

<script>
import Post from '../components/Post.vue'

export default {
  components: { Post },
  data() {
    return {
      posts:[]
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
    }
  }
}
</script>
