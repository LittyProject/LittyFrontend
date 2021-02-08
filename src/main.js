import Vue from 'vue';
import Vuex from 'vuex';
import App from './App2.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueSocketIO from 'vue-socket.io';
import VueClipboard from 'vue-clipboard2';
import SocketIO from 'socket.io-client';

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(VueClipboard)
Vue.use(new VueSocketIO({
      debug: true,
      connection: SocketIO("http://localhost:1920", {
          path: "/gateway",
          "force new connection" : true,
          "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
          "timeout" : 10000, //before connect_error and connect_timeout are emitted.
          "transports" : ["websocket"]

      }),
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
      }
    })
);


export default new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

