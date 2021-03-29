import axios from 'axios';
export default ({
    namespaced: true,
    state: {
        payments: null,
        collections: null,
    },
    getters: {
        payments(state) {
            return state.payments
        },
        collections(state) {
            return state.collections
        }
    },
    mutations: {
        SET_PAYMENTS(state, data) {
            state.payments = data
        },
        INSERT_TO_PAYMENTS(state, data) {
            state.payments.push(data);
        },
        SET_COLLECTIONS(state, data) {
            state.collections = data
        }
    },
    actions: {
        async get_collections({ commit }, request) {
            request.month += 1
            let response = await axios.get(
                "/payments/total_collections/"
                + request.month
                + '/' + request.year
                + '/' + request.branch_id);

            // commit('SET_COLLECTIONS', response.data);
            return response;

        },
        async add_payment({ }, form) {
            let response = await axios.post("/payment", form);
            return response.data;

        },
        async get_payments({ commit }, service_id) {
            let response = await axios.get("/payments/" + service_id)
            commit('SET_PAYMENTS', response.data)

        },

        async push_to_state({ commit }, form) {
            commit('INSERT_TO_PAYMENTS', form);

        },
        async del_payment({ commit }, payment_id) {
            let response = await axios.delete("/payment/" + payment_id);
            commit('services/EDIT_STATE', response.data, { root: true });
        },
        async edit_payment({ }, form) {
            let response = await axios.put("/payment", form);
            return (response.data);

        },

    }

});