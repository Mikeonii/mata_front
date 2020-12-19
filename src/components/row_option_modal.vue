<template>
  <div>
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
                v-model="Contract_No"
                :rules="rules.number_rule"
                type="number"
                prepend-icon="folder"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Name"
                v-model="Name"
                prepend-icon="mdi-face-outline"
                :rules="rules.number_rule"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Address"
                v-model="Address"
                prepend-icon="mdi-map-marker-radius-outline"
                hint="Brgy, Municipality, Province"
                persistent-hint
                :rules="rules.number_rule"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Phone Number"
                v-model="Phone_Number"
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
                  v-model="Date_Created"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Name of Deceased"
                v-model="Name_of_deceased"
                prepend-icon="mdi-bolnisi-cross"
                :rules="rules.number_rule"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="type_of_casket_list"
                v-model="Type_of_Casket"
                name="category"
                item-text="name"
                label="Select a Casket"
                return-object
                item-value="name"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Amount"
                v-model="Amount"
                :placeholder="this.Type_of_Casket.price"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Down Payment"
                v-model="Down_Payment"
                prepend-icon="mdi-cash"
                @input="change"
              ></v-text-field
            ></v-col>
            <v-col cols="4">
              <v-text-field
                label="Balance"
                v-model="Balance"
                :value="Balance"
                prepend-icon="mdi-account-cash-outline"
                disabled
              ></v-text-field>
            </v-col>

            <v-spacer></v-spacer>
            <v-card-actions class="d-flex justify-end"
              ><v-btn @click="submit" dark color="primary">Add</v-btn>
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
import db from "@/firebase";
import format from "date-fns/format";
export default {
  name: "addModal",
  data() {
    return {
      menu1: false,
      dialog: false,
      Contract_No: "",
      Name: "",
      Address: "",
      Phone_Number: "",
      Date_Created: "",
      Name_of_deceased: "",
      Type_of_Casket: "",
      Amount: "",
      Down_Payment: "",
      Balance: "",
      type_of_casket_list: [
        { name: "Flat Top", price: "19500" },
        { name: "OGOY STUCCO", price: "28000" },
      ],
      rules: {
        number_rule: [(v) => v.length >= 3 || "Minimum length is 3 characters"],
        email_rule: [],
        basic_rule: [],
      },
    };
  },
  methods: {
    submit() {
      const project = {
        Contract_No: this.Contract_No,
        Name: this.Name,
        Address: this.Address,
        Phone_Number: this.Phone_Number,
        Date_Created: this.Date_Created,
        Name_of_deceased: this.Name_of_deceased,
        Type_of_Casket: this.Type_of_Casket,
        Amount: this.Amount,
        Down_Payment: this.Down_Payment,
        Balance: this.Balance,
        User: "Jan Michael Besinga",
      };
      db.collection("services")
        .add(project)
        .then(() => {
          alert("Successfully Created!");
        });
    },
    change: function() {
      this.Balance = this.Amount - this.Down_Payment;
    },
    reset: function() {
      this.$refs.form.reset();
    },
  },
  computed: {
    formattedDate() {
      var x = Date.parse(this.Date_Created);
      return this.Date_Created ? format(x, "do MMM yyyy") : "";
    },
  },
};
</script>
