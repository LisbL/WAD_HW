import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import Contact from '../views/ContactsPage.vue'
//import Addpost from '../views/AddPost.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },      
  { path: '/signup', component: Signup },
  { path: '/home', component: Home },
    { path: '/contact', component: Contact }
  //{ path: '/addpost', component: AddPost }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
