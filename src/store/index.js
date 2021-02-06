import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/userModule";
import server from "./modules/serverModule";
import gateway from "./modules/gatewayModule";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthorized: false,
    socket: null,
    drawer: true,
    tab: 0,
    nav: 0,
    settingsTab: 0,
    active: {},
    editAvatar: false,
  },
  mutations: {
    authorization (state){
      state.isAuthorized = !state.isAuthorized;
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
    updateServersData(state, server){
      state.servers=server;
    },
    editAvatar(state, boolean){
      state.editAvatar=boolean;
    }
  },
  getters: {
    getIsAuth: state => {
      return state.isAuthorized;
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
    isEditingAvatar: state =>{
      return state.editAvatar;
    }
  },
  actions: {
  },
  modules: {
    user,
    server,
    gateway
  }
})
