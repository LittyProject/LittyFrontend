import Vue from 'vue';
import Vuex from 'vuex';
import App from './App2.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueSocketIO from 'vue-socket.io';
import VueClipboard from 'vue-clipboard2';

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(VueClipboard)
Vue.use(new VueSocketIO({
      debug: true,
      connection: 'http://localhost:1920',
      options: {
            transports: [ 'websocket', 'polling' ],
            credentials: true
      },
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
      }
    })
);


export const a = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

