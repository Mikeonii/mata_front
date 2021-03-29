import axios from 'axios'
export default {
    namespaced: true,
    state: {
        // state of app. can store anything from strings to objects
        token: null,
        user: null,

    },
    // read info from state
    getters: {
        authenticated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        },
        token(state) {
            return state.token
        }
    },
    mutations: {
        // update the state
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER(state, data) {
            state.user = data
        }
    },
    actions: {

        // make request to api but commit to mutations
        async signin({ dispatch }, credentials) {

            let response = await axios.post("auth/signin", credentials)
            return dispatch('attempt', response.data.token)
        },
        // attempt to access me api to check if token is valid
        // and give us back the users info
        async attempt({ commit, state }, token) {
            // if there is a token, commit
            if (token) {
                commit('SET_TOKEN', token)
            }
            // if there is no token in the sate, stop the execution
            if (!state.token) {
                return
            }
            // check token if it is valid in me api
            try {
                // pass header for authorization
                let response = await axios.get('auth/me')
                // if it is true, set_user to response 
                commit('SET_USER', response.data)
                // get services
                // this.$store.dispatch('services/get', response.data.branch_id, { root: true });

            } catch (e) {
                // if errors occurs set state to null
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        },
        signOut({ commit }) {
            return axios.post('auth/signout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            });
        }
    }
}