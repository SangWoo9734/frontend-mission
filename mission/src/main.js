import { createApp } from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';

library.add(fas, far);

// axios.defaults.baseURL = '';

// axios.defaults.headers.common['Content-Type'] = 'application/json';

// axios.defaults.headers.common.Authorization = 'abcd1234';

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://virtserver.swaggerhub.com/lkaybob/projectlion-vue/1.0.0/item';

const app = createApp(App);

// app.config.globalProperties.axios = axios;

app
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app');
