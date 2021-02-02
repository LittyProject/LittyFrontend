import Vue from 'vue';
import App from './App2.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

Vue.config.productionTip = false

export const bus = new Vue();

const socket = io('http://localhost:1920', {
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 10000, // (Number) how long to initially wait before attempting a new (1000),
});
Vue.use(VueSocketIOExt, socket);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
