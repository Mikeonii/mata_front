<template>
  <div>
    <v-card-title
      ><h2>Payments Information</h2>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="search"
      ></v-text-field>
    </v-card-title>

    <v-card-text>
      <v-row>
        <add_payment_modal @addtopayment="insertObjectToPayments($event)" />
      </v-row>
    </v-card-text>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Edit Payment
        </v-card-title>

        <v-card-text>
          <v-form ref="update_form" class="container">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Amount"
                  v-model="edit_item.amount"
                  prepend-icon="mdi-cash"
                  autocomplete="false"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="Mode_of_payment"
                  label="Mode of Payment"
                  v-model="edit_item.mode_of_payment"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Remarks"
                  v-model="edit_item.remarks"
                  prepend-icon="mdi-lead-pencil"
                  autocomplete="false"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Date Created"
                  v-model="edit_item.date_created"
                  hint="Please follow the YYYY-MM-DD format"
                  prepend-icon="mdi-calendar"
                  autocomplete="false"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submit_edit()">
            Update
          </v-btn>
          <v-btn color="primary" text @click="dialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      v-model="selected"
      :loading="table_loading"
      loading-text="Loading... Please wait"
      :headers="headers"
      :items="payments"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1 mx-5 mb-4 mt-3"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon @click="deleteItem(item)">
          mdi-delete
        </v-icon>

        <v-chip
          class="ml-4"
          color="primary"
          v-if="item.verified == false"
          @click="verify(item)"
          >Verify</v-chip
        >
        <v-chip class="ml-4" color="success" v-else>Verified</v-chip>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import add_payment_modal from "@/components/Add_Payment_Modal.vue";
export default {
  name: "Payment_Table",
  components: { add_payment_modal },

  data() {
    return {
      dialog: false,
      profile_id: this.$route.params.service_id,
      selected: [],
      singleSelect: true,
      table_loading: false,

      headers: [
        { text: "Payment ID", align: "start", value: "id" },
        {
          text: "Amount",
          value: "amount",
        },
        {
          text: "Mode of Payment",
          value: "mode_of_payment",
        },
        {
          text: "Date Created",
          value: "date_created",
        },
        {
          text: "Remarks",
          value: "remarks",
        },
        {
          text: "Action",
          value: "actions",
        },
      ],
      Mode_of_payment: [
        "Cheque",
        "Cash On-hand",
        "MWSDO",
        "LGU",
        "DSWD-CARAGA",
        "PSWD",
        "PGO",
      ],
      payments: [],
      search: "",
      edit_item: [],
      edited_index: -1,
    };
  },
  actions: {},
  computed: {
    ...mapGetters({
      user_payments: "payments/payments",
    }),
    sel_msg() {
      const pays = this.selected[0];
      return pays ? pays.id : "No Data Found";
    },
  },
  created() {
    this.payments = this.user_payments;
  },
  methods: {
    verify(item) {
      // edit payment row
      this.edit_item = item;

      if (confirm("Verify Payment?")) {
        this.edit_item.verified = 1;
        console.log(this.edit_item);
        this.edit_payment(this.edit_item).then((data) => {
          alert("saved");
          // edit amount in state
          var balance = data[0];
          this.edit_current_state(balance);
        });
      }
    },
    submit_edit() {
      if (this.edited_index > -1) {
        console.log(this.edit_item);
        Object.assign(this.payments[this.edited_index], this.edit_item);
      }

      this.edit_payment(this.edit_item).then(() => {
        alert("Edited Successfuly");
        this.dialog = false;
      });
    },
    deleteItem(item) {
      confirm("Are you sure you want to delete this item?")
        ? this.del_payment(item.id).then(() => {
            const index = this.payments.indexOf(item);
            this.payments.splice(index, 1);
          })
        : "";
    },
    editItem(item) {
      this.dialog = true;
      this.edit_item = item;
      this.edited_index = this.payments.indexOf(item);
    },
    ...mapActions({
      get_payments: "payments/get_payments",
      del_payment: "payments/del_payment",
      edit_payment: "payments/edit_payment",
      edit_current_state: "services/edit_current_state",
    }),
    insertObjectToPayments(form) {
      this.payments.push(form);
    },
  },
};
</script>
