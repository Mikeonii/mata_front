<template>
  <div>
    <v-btn text color="warning" small @click.stop="clicked()">
      Add Payment</v-btn
    >

    <v-dialog v-model="dialog" max-width="500" class="">
      <v-card>
        <v-toolbar color="primary white--text"
          ><h1 class="headline">Add Payment</h1>
        </v-toolbar>

        <!-- yow -->
        <!-- form -->
        <form class="container" ref="form">
          <v-row class="px-5">
            <v-col cols="5">
              <v-text-field
                label="Service ID"
                v-model="this.form.service_id"
                prepend-icon="folder"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-menu
                ref="menu1"
                v-model="menu1"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formattedDate"
                    label="Date"
                    hint="YYYY-MM-DD format"
                    persistent-hint
                    prepend-icon="event"
                    v-bind="attrs"
                    v-on="on"
                    autocomplete="false"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.date_created"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="5">
              <v-text-field
                label="Amount"
                v-model="form.amount"
                prepend-icon="mdi-cash"
                autocomplete="false"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                :items="Mode_of_payment"
                label="Mode of Payment"
                v-model="form.mode_of_payment"
              ></v-select
            ></v-col>
            <v-col cols="11">
              <v-text-field
                label="Remarks"
                v-model="form.remarks"
                prepend-icon="mdi-lead-pencil"
                autocomplete="false"
              ></v-text-field
            ></v-col>
            <v-col cols="4">
              <v-text-field
                label="Branch ID"
                v-model="form.branch_id"
                :value="form.branch_id"
                v-show="show"
                disabled
              ></v-text-field>
            </v-col>

            <v-spacer></v-spacer>
            <v-card-actions class="d-flex justify-end"
              ><v-btn
                :loading="this.loading"
                @click="submit()"
                dark
                color="primary"
                >Add</v-btn
              >
              <v-btn @click.stop="dialog = false" dark color=""
                >Cancel</v-btn
              ></v-card-actions
            >
          </v-row>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import format from "date-fns/format";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "addPaymentModal",
  props: {
    selected: {
      type: Array,
    },
  },
  data() {
    return {
      loading: false,
      show: false,
      menu1: false,
      dialog: false,
      Mode_of_payment: [
        "Cheque",
        "Cash On-hand",
        "MSWDO",
        "LGU",
        "DSWD-CARAGA",
        "PSWD",
        "PGO",
        "Down Payment",
        "Discount",
        "Plan Contribution",
      ],
      rules: {
        number_rule: [(v) => v.length >= 3 || "Minimum length is 3 characters"],
        email_rule: [],
        basic_rule: [],
      },
      form: {
        service_id: "",
        branch_id: "",
        amount: "",
        remarks: "",
        date_created: "",
        mode_of_payment: "",
        verified: 1,
      },
    };
  },
  methods: {
    clicked() {
      this.dialog = true;
      if (this.$route.params.service_id) {
        // pushing service id to the form
        const id = this.service.data.id;
        this.form.service_id = id;
        // pushing branch id to the form
        const b_id = this.user.branch_id;
        this.form.branch_id = b_id;
      } else {
        this.form.service_id = this.selected[0].id;
        this.form.branch_id = this.selected[0].branch_id;
      }
    },
    ...mapActions({
      add_payment: "payments/add_payment",
      get_payments: "payments/get_payments",
      edit_current_state: "services/edit_current_state",
    }),
    submit() {
      // check if mode of payment is not cash on hand
      if (
        this.form.mode_of_payment != "Cash On-hand" ||
        this.form.mode_of_payment != "Down Payment"
      ) {
        this.form.verified = 0;
      }
      // check if date is empty
      if (this.form.date_created == "") {
        alert("Please enter date");
      } else {
        this.loading = true;
        this.add_payment(this.form).then((data) => {
          this.edit_current_state(data[0]);

          // send this to payment table
          this.$emit("addtopayment", data[1]);

          alert("success");
          this.loading = false;
          this.dialog = false;
        });
      }
    },
  },
  created() {},
  computed: {
    ...mapGetters({
      user: "auth/user",
      service: "services/service",
    }),

    formattedDate() {
      var x = Date.parse(this.form.date_created);
      return this.form.date_created ? format(x, "do MMM yyyy") : "";
    },
  },
};
</script>
