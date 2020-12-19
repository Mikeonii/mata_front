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

            let url = "/payments/total_collections/" + request.month + '/' + request.year + '/' + request.branch_id;
            let response = await axios.get(url);

            let collections = {
                "dswd": response.data[0],
                "mswdo": response.data[1],
                "lgu": response.data[2],
                "pswd": response.data[3],
                "cheque": response.data[4],
                "total_discount": response.data[5],
                "cash_on_hand": response.data[6],
                "total_cash": response.data[7]
            }
            commit('SET_COLLECTIONS', collections)

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
        async del_payment({ }, payment_id) {

            await axios.delete("/payment/" + payment_id);
        },
        async edit_payment({ }, form) {
            let response = await axios.put("/payment", form);
            return (response.data);

        },

    }

});