<template>
  <div class="contact-page">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/login">to login</router-link> |
        <router-link to="/signup">to signup</router-link>
      </nav>
    </header>

    <main>
      <section class="kast">
        <h2>Contact Us</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: +372 666 666 9</p>
        <p>Address: Herne tee 7, Tartu</p>
      </section>
    </main>

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
export default {}
</script>

<style scoped>
.kast {
  padding: 20px;
  border-radius: 15px;
  background-color: #ce96ff;
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}
nav {
  font-size: 20px;
  margin: 10px;
}
</style>
