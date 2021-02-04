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
    path: '/app',
    name: 'WebApp',
    meta: {
      requireAuth: false
    },
    component: () => import('../views/WebApp.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: {
      requireAuth: true
    },
    beforeEnter(to, from, next) {
      if(localStorage.getItem("token")) localStorage.removeItem("token");
      if(localStorage.getItem("user")) localStorage.removeItem("user");
      if(localStorage.getItem("servers")) localStorage.removeItem("servers");
      if(localStorage.getItem("nav")) localStorage.removeItem("nav");
      if(localStorage.getItem("tab")) localStorage.removeItem("tab");
      return next(vm => vm.$router.push({ name: 'Home' }));
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requireAuth: false
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      requireAuth: false
    },
    component: () => import('../views/Register.vue')
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
  if(to.meta.requireAuth) {
    if(localStorage.getItem("token")) {
      return next();
    } else {
      return next(vm => vm.$router.push({ name: 'Home' }));
    }
  }
  return next();
});

export default router
