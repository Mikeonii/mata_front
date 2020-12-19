import axios from 'axios'
import { post } from 'jquery'
export default {
    namespaced: true,
    state: {
        services: null,
        service: null,
    },
    // read info from state
    getters: {

        services(state) {
            return state.services
        },
        service(state) {
            return state.service
        }
    },
    mutations: {
        // update the state
        SET_SERVICES(state, data) {
            state.services = data
        },
        SET_SERVICE(state, data) {
            state.service = data
        },
        EDIT_STATE(state, data) {
            //edit something on a state
            //edit the amount of the service
            state.service.data.balance = data;
        }

    },
    actions: {
        edit_current_state({ commit }, request) {
            commit('EDIT_STATE', request)
        },

        async get_total_service({ }, request) {
            let response = await axios.post('/get_total_service', request);
            return response.data;
        },

        async edit_service_info({ }, form) {
            let response = await axios.put("/edit_service_info", form);
            return response
        },

        async edit_service({ }, form) {
            let response = await axios.put("service", form)
            return response;
        },

        async del_service({ }, service_id) {
            axios.delete("service/" + service_id);
        },

        // make request to api but commit to mutations
        async get({ commit }, branch_id) {
            let response = await axios.get("/services/" + branch_id)
            commit('SET_SERVICES', response.data)

        },
        async addService({ }, form) {
            let reponse = await axios.post("/service", form)

        },
        // get single service
        async get_single({ commit }, service_id) {
            // console.log("this is the id", service_id)
            let response = await axios.get("/service/" + service_id)
            commit('SET_SERVICE', response.data)
        },

        async export_to_excel() {

            await axios.get("/sample_export").then((response) => {
                console.log(response.data);
            });

        }
        // async signIn({ dispatch }, credentials) {
        //     let response = await axios.post("auth/signin", credentials)
        //     return dispatch('attempt', response.data.token)
        // },
        // // attempt to access me api to check if token is valid
        // // and give us back the users info
        // async attempt({ commit, state }, token) {
        //     // if there is a token, commit
        //     if (token) {
        //         commit('SET_TOKEN', token)
        //     }
        //     // if there is no token in the sate, stop the execution
        //     if (!state.token) {
        //         return
        //     }
        //     // check token if it is valid in me api
        //     try {
        //         // pass header for authorization
        //         let response = await axios.get('auth/me')
        //         // if it is true, set_user to response 
        //         commit('SET_USER', response.data)
        //     } catch (e) {
        //         // if errors occurs set state to null
        //         commit('SET_TOKEN', null)
        //         commit('SET_USER', null)
        //     }
        // },

    }
}