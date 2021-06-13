import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

import './tailwind.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount('#app');

const http = axios.create({
  baseURL: 'http://localhost:9090',
  timeout: 5000,
  headers: {
    'content-type': 'application/json'
  }
});
Vue.prototype.$http = http;
