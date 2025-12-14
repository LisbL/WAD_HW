<template>
  <div class="signup-page">
    <header>
      <nav>
      <router-link to="/">Home</router-link>|
      <router-link to="/contact">Contacts</router-link>
      </nav>
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
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    async signup() {
      try {
        const res = await fetch('http://localhost:3000/signup', { // replace with your backend endpoint
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        })

        const data = await res.json()

        if (res.ok) {
          // Save JWT token
          localStorage.setItem('token', data.token)
          // Redirect to Home page
          this.router.push('/home')
        } else {
          alert(data.message || 'This account already exists')
        }
      } catch (err) {
        console.error(err)
        alert('Error connecting to server')
      }
    }
  }
}
</script>

<style scoped>
/* Keep your existing CSS */
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
