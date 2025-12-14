<template>
  <div class="post-page">
    <header>
      <router-link to="/home">← Back to Home</router-link>
    </header>

    <main v-if="post">
      <h2>Edit Post</h2>

      <textarea v-model="post.comment"></textarea>

      <div class="actions">
        <button @click="updatePost">Update</button>
        <button @click="deletePost">Delete</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null
    }
  },

  mounted() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push('/login')
      return
    }

    this.fetchPost()
  },

  methods: {
    async fetchPost() {
      const token = localStorage.getItem('token')
      const id = this.$route.params.id

      const res = await fetch(`http://localhost:3000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      this.post = await res.json()
    },

    async updatePost() {
      const token = localStorage.getItem('token')
      const id = this.$route.params.id

      await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          comment: this.post.comment
        })
      })

      alert('Post updated!')
      this.$router.push('/home')
    },

    async deletePost() {
      const token = localStorage.getItem('token')
      const id = this.$route.params.id

      await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      alert('Post deleted!')
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  min-height: 100px;
  margin: 20px 0;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
