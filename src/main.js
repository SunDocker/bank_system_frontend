import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import axios from 'axios';
import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:9999'
axios.defaults.withCredentials = true

Vue.use(ElementUI);
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
