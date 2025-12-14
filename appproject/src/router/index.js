import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import Contact from '../views/ContactsPage.vue'
import Post from '../components/Post.vue'
//import Addpost from '../views/AddPost.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },      
  { path: '/signup', component: Signup },
  { path: '/home', component: Home, meta: { requiresAuth: true} }, // Home, Post
  {path: '/post/:id', component: Post, meta: { requiresAuth: true}}, // later Addpost need to be PROTECTED
    { path: '/contact', component: Contact }
  //{ path: '/addpost', component: AddPost }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//route guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
