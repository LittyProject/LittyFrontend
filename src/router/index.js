import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requireAuth: false
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requireAuth: false
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/colors',
    name: 'Colors',
    meta: {
      requireAuth: false
    },
    component: () => import('../views/Colors.vue')
  },
  {
    path: '/auth/login',
    name: 'Login',
    meta: {
      requireAuth: false
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/auth/register',
    name: 'Register',
    meta: {
      requireAuth: false
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    meta: {
      requireAuth: false
    },
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth && this.$store.getters.getIsAuth) return next();
  return next();
});

export default router
