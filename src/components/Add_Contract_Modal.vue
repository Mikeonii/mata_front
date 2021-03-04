<template>
  <div>
    <v-btn @click.stop="dialog = true" class="ms-10 " fab dark color="error">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="800" class="">
      <v-card>
        <v-img
          class="white--text align end"
          height="200"
          src="https://i.imgur.com/Y3hqiHf.png"
        ></v-img>
        <v-card-title class="headline">Add Contract</v-card-title>
        <v-card-subtitle
          >Form for adding a new service contract</v-card-subtitle
        >

        <!-- form -->
        <form class="container" ref="form">
          <v-row class="mx-5">
            <v-col cols="4">
              <v-text-field
                label="Contract Number"
                v-model="form.contract_no"
                :rules="rules.number_rule"
                type="number"
                prepend-icon="folder"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Name"
                v-model="form.name"
                prepend-icon="mdi-face-outline"
                :rules="rules.number_rule"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Address"
                v-model="form.address"
                prepend-icon="mdi-map-marker-radius-outline"
                hint="Brgy, Municipality, Province"
                persistent-hint
                :rules="rules.number_rule"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                label="Phone Number"
                v-model="form.phone_number"
                prepend-icon="mdi-cellphone-android"
                :rules="rules.number_rule"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6">
              <v-menu
                ref="menu1"
                v-model="menu1"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <!-- <v-text-field slot="activator" aria-label="Date"></v-text-field> -->
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formattedDate"
                    label="Date"
                    hint="YYYY-MM-DD format"
                    persistent-hint
                    prepend-icon="event"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.date_created"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Name of Deceased"
                v-model="form.name_of_deceased"
                prepend-icon="mdi-bolnisi-cross"
                :rules="rules.number_rule"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Deceased Date Info"
                v-model="form.deceased_date"
                prepend-icon="event"
                hint="Born: YYYY-mm-dd/ Died: YYY-mm-dd"
                persistent-hint
                :rules="rules.number_rule"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Type of Casket"
                v-model="form.type_of_casket"
                prepend-icon="event"
                hint="Enter Type of Casket"
                persistent-hint
                :rules="rules.number_rule"
              ></v-text-field>
              <!-- <v-select
                :items="type_of_casket_list"
                v-model="form.type_of_casket"
                name="category"
                item-text="name"
                label="Select a Casket"
                return-object
                item-value="name"
              /> -->
            </v-col>
            <v-col cols="4">
              <v-text-field label="Amount" v-model="form.amount"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Down Payment"
                v-model="form.down_payment"
                prepend-icon="mdi-cash"
                @input="change"
              ></v-text-field
            ></v-col>
            <v-col cols="4">
              <v-text-field
                label="Balance"
                v-model="form.balance"
                :value="form.balance"
                prepend-icon="mdi-account-cash-outline"
                disabled
              ></v-text-field>
            </v-col>
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
              ><v-btn :loding="loading" @click="submit" dark color="primary"
                >Add</v-btn
              >
              <v-btn dark color="warning" @click="reset">Reset</v-btn
              ><v-btn @click.stop="dialog = false" dark color=""
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
  name: "addModal",

  data() {
    return {
      loading: false,
      show: false,
      menu1: false,
      dialog: false,

      type_of_casket_list: [
        "Ordinary Wood Casket",
        "Flat Top Wood Casket",
        "Ogoy Stucco Wood Casket",
        "Jr. Plain Half Glass Wood Casket",
        "Jr. Plain Half Glass Metal Casket",
        "Sr. Full Glass Big York Metal Casket",
        "Sr. Fullcap Bara Metal Casket",
        "Sr. Full Flexi Bilog Metal Casket",
        "Sr. Full Flexi Tulis Metal Casket",
        "Sr. Full Flexi Stainless Body Metal Casket",
        "Imported American Style Steel Casket",
      ],
      rules: {
        number_rule: [(v) => v.length >= 3 || "Minimum length is 3 characters"],
        email_rule: [],
        basic_rule: [],
      },
      form: {
        contract_no: "",
        name: "",
        address: "",
        phone_number: "",
        date_created: "",
        name_of_deceased: "",
        type_of_casket: "",
        amount: "",
        down_payment: "",
        balance: "",
        branch_id: "",
        deceased_date: "",
      },
    };
  },
  methods: {
    ...mapActions({
      addService: "services/addService",
    }),
    submit() {
      this.loading = true;
      this.addService(this.form).then((response) => {
        this.loading = false;
        alert("Successfully Added!");
        location.reload();
      });
    },
    change: function() {
      this.form.balance = this.form.amount - this.form.down_payment;
    },
    reset: function() {
      this.$refs.form.reset();
    },
  },
  created() {
    this.form.branch_id = this.user.branch_id;
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
    formattedDate() {
      var x = Date.parse(this.form.date_created);
      return this.form.date_created ? format(x, "do MMM yyyy") : "";
    },
  },
};
</script>
