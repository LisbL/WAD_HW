<template>
  <div>
    <!-- HEADER -->
    <header>
      <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/contact">Contacts</router-link>
      </nav>


      <a class="logo" href="#">
        <img
          id="profile-photo"
          src="/images/logged_out.jpg"
          width="50"
          height="50"
          alt="My picture"
          @click="toggleDropdown"
        />
      </a>

      <div v-if="showDropdown" class="dropdown-menu">
        <p>Not logged in :/</p>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main>
       <section>
        <!-- Login form -->
        <div class="kast">
          <h3 id="welcome-title">Welcome to PostIt</h3>

          <router-link
            id="signup-link"
            class="highlight-text"
            to="/signup"
          >
            Create an account
          </router-link>

          <p>or</p>

          <form @submit.prevent="login">
            <label>Please log in</label><br />

            <input
              v-model="email"
              type="email"
              placeholder="Email"
              required
            /><br />

            <input
              v-model="password"
              type="password"
              placeholder="Password"
              required
            /><br />

            <div class="submit">
              <input type="submit" value="Log in" />
            </div>
          </form>

          <p class="highlight-text">Forgot password</p>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer>
      <p>Terms and conditions:</p>
      <p>
        Welcome to GoofAhPosts.com! Our Terms and Conditions establish the rules
        for using our services...
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      showDropdown: false
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },

    login() {
      // later: send to backend
      console.log(this.email, this.password)
    },

    async login() {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log('Login success:', data);
        // Redirect to Home page
        this.$router.push('/home');
      } else {
        alert(data.message); // e.g., Invalid credentials
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  }


  }
}
</script>
