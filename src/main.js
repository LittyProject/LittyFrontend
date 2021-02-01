import Vue from 'vue'
import App from './App2.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

export const bus = new Vue();

//s
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
