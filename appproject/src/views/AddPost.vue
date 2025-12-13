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
  methods: {
    onFileChange(event) {
      this.image = event.target.files[0]
    },
    addPost() {
      // Later: send comment + image to backend
      console.log('Add Post:', this.comment, this.image);
      alert('Post submitted! Implement backend request here.');
      this.comment = '';
      this.image = null;
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
