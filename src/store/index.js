import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthorized: false,
    token: null,
    user: {},
    socket: null,
    drawer: true,
    tab: 0,
    nav: 0,
    settingsTab: 0,
    active: {},
    servers: {},
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
    },
    updateTab(state, tab){
      state.tab=tab;
    },
    updateNav(state, nav){
      state.nav=nav;
    },
    updateSettingsTab(state, tab){
      state.settingsTab=tab;
    },
    updateActive(state, active){
      state.active=active;
    },
    updateServers(state, server){
      state.servers[server.id]=server;
    },
    updateServersData(state, server){
      state.servers=server;
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
    },
    getTab: state =>{
      return state.tab;
    },
    getNav: state =>{
      return state.nav;
    },
    getSettingsTab: state =>{
      return state.settingsTab;
    },
    getActive: state =>{
      return state.active;
    },
    getServer: state =>{
      return (id)=>{
        return state.servers[id];
      }
    },
    getServersData: state =>{
      return state.servers;
    },
  },
  actions: {
  },
  modules: {
  }
})
