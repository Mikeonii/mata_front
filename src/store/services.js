import axios from 'axios'

export default {
    namespaced: true,
    state: {
        services: [],
        service: null,
        total_service: null,
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
        // delete from the state
        DELETE_SERVICE(state, service_id) {
            let videos = state.services.filter(s => s.id != service_id);
            state.services = videos;
        },
        // update the state
        SET_SERVICE(state, data) {
            state.service = data
        },
        EDIT_STATE(state, data) {
            //edit something on a state
            //edit the amount of the service
            state.service.data.balance = data;
        },
        SET_SERVICES(state, data) {
            state.services = data;
        },
        ADD_SERVICE(state, data) {
            state.services = state.services.concat(data);
        },
        SET_TOTAL_SERVICE(state, data) {
            state.total_service = data;
        },
        EDIT_SERVICE(state, service) {
            state.services.forEach(function (s, index) {
                if (s.id == service.id) {
                    Object.assign(state.services[index], service);
                }

            })
        }
    },
    actions: {
        async get_filtered_per_payment({ }, branch_id) {
            // console.log(branch_id);
            let response = await axios.get('/get_filtered_service/' + branch_id);
            return response.data;
        },
        edit_current_state({ commit }, request) {
            commit('EDIT_STATE', request)
        },

        async get_total_service({ commit }, request) {
            let response = await axios.post('/get_total_service', request);
            commit('SET_TOTAL_SERVICE', response.data);
        },

        async edit_service_info({ }, form) {
            let response = await axios.put("/edit_service_info", form);
            return response
        },

        async edit_service({ commit }, form) {
            let response = await axios.put("service", form)
            commit('EDIT_SERVICE', form)
            return response;
        },

        async del_service({ commit }, service_id) {
            await axios.delete("service/" + service_id).then((response) => {
                commit('DELETE_SERVICE', service_id);
                alert(response.data);
            });
        },

        // make request to api but commit to mutations
        async get({ commit }, branch_id) {
            let response = await axios.get("/services/" + branch_id)
            commit('SET_SERVICES', response.data);
            // return response;

        },
        async addService({ commit }, form) {
            let response = await axios.post("/service", form)
            // alert(response.data);
            commit('ADD_SERVICE', response.data);
        },
        // get single service
        async get_single({ commit }, service_id) {
            let response = await axios.get("/service/" + service_id)
            commit('SET_SERVICE', response.data)
            return response;
        },

        async export_to_excel() {
            await axios.get("/sample_export").then((response) => {
                console.log(response.data);
            });

        }
    }
}