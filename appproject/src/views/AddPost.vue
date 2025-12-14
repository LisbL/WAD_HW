<template>
  <div class="addpost-page">
    <header>
      <router-link to="/home">Home</router-link>
    </header>

    <main>
      <section class="kastAddPost">
        <h2>Add New Post</h2>

        <form @submit.prevent="addPost">
          <div class="form-row">
            <label for="comment">Comment:</label>
            <textarea v-model="comment" id="comment" placeholder="Write your post..."></textarea>
          </div>

          <div class="form-row">
            <label for="image">Image (optional):</label>
            <input type="file" id="image" @change="onFileChange" />
          </div>

          <div class="submit">
            <button type="submit">Add Post</button>
          </div>
        </form>
      </section>
    </main>

    <footer>
      <p>Terms and conditions...</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comment: '',
      image: null
    }
  },
  mounted() {
    //Redirecting to login if logged out
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must log in first!!');
      this.$router.push('/login');
    }
  },
  methods: {
    onFileChange(event) {
      this.image = event.target.files[0]
    },
    async addPost() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in!!');
        this.$router.push('/login');
        return;
      }

      try {
        //Simple JSON request for comment only
        const res = await fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ comment: this.comment})
        });

        if (!res.ok) throw new Error('Failed to add post :(');

        alert('Post added successfully!');
        this.comment = '';
        this.image = null;
        this.$router.push('/home'); //Redirects to homepage
      } catch (err) {
        console.error(err);
        alert('Error adding post');
      }
    }
  }
}
</script>

<style scoped>
.kastAddPost {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ce96ff;
  border-radius: 15px;
}
textarea {
  width: 100%;
  min-height: 80px;
  margin: 5px 0;
}
button {
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #ff6f91;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
