import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthorized: false,
    token: null,
    user: {},
    socket: null,
    drawer: true
  },
  mutations: {
    authorization (state){
      state.isAuthorized = !state.isAuthorized;
    },
    updateToken (state, token) {
      state.token = token;
    },
    updateUser (state, user) {
      state.user = user;
    },
    setSocket (state, socket) {
      state.socket = socket;
    },
    updateDrawer(state, drawer) {
      state.drawer = drawer;
    }
  },
  getters: {
    getIsAuth: state => {
      return state.isAuthorized;
    },
    getUser: state => {
      return state.user;
    },
    getServers: state => {
      return state.user.servers;
    },
    getToken: state => {
      return state.socket
    },
    getDrawer: state => {
      return state.drawer;
    }
  },
  actions: {
  },
  modules: {
  }
})
