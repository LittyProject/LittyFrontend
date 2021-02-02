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
    beforeEnter() {
      if(this.$store.getters.getIsAuth) this.$store.commit("authorization");
      this.$store.commit("updateToken", null);
      this.$store.commit("updateUser", {});
      this.$router.push({ name: 'Home' });
    }
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
    if(this.$store.getters.getIsAuth) {
      return next();
    } else {
      return this.$router.push({ name: 'Home' });
    }
  }
  return next();
});

export default router
