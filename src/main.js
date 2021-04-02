import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import vuelidate from 'vuelidate'
import axios from 'axios'
import store from './store'


// for authenticating thru headers with tokens 
require('@/store/subscriber')

// axios base url
// axios.defaults.baseURL = 'http://app-server.matadirectservice.com/api';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
Vue.config.productionTip = false
// every time the page loads, it attempts to authenticate using token from localstorage
// in that way if the localstorage have the valid token, it will never invalidate the page.
store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    axios,
    store,
    vuelidate,
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')

});

