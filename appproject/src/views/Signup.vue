<template>
  <div class="signup-page">
    <header>
      <router-link to="/">Home</router-link>
    </header>

    <main>
      <section class="kast">
        <h2>Sign Up</h2>

        <form @submit.prevent="signup">
          <label>Email:</label>
          <input v-model="email" type="email" required />

          <label>Password:</label>
          <input v-model="password" type="password" required />

          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account? 
          <router-link to="/login">Log in</router-link>
        </p>
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
      email: '',
      password: ''
    }
  },
  methods: {
    signup() {
      // Later: send credentials to backend
      console.log('Signup:', this.email, this.password);
      alert('Signup clicked! Implement backend request here.');
    }
  }
}
</script>

<style scoped>
/* Add your CSS similar to login page */
.kast {
  padding: 20px;
  border-radius: 15px;
  background-color: #ce96ff;
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}
input {
  display: block;
  width: 80%;
  margin: 10px auto;
  padding: 8px;
}
button {
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 8px;
  background-color: #ff6f91;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
