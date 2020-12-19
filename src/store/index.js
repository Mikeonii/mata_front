import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import services from './services'
import payments from './payments'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // state of app. can store anything from strings to objects
    },
    mutations: {
        // update the state
    },
    actions: {
        // make request to api but commit to mutations
    },
    modules: {
        auth,
        services,
        payments
    }
})