import Vue from 'vue';
import App from './App2.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false
export const bus = new Vue();

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://192.168.8.42:1920',
  options: {
    transports: [ 'websocket', 'polling' ],
    credentials: true
  }
}))

export const a = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

