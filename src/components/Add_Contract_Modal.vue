<template>
  <div>
    <v-btn @click.stop="dialog = true" class="ms-10 " text color="primary">
      <v-icon dark>mdi-plus</v-icon>Add New Service Contract
    </v-btn>

    <v-dialog v-model="dialog" max-width="800" class="">
      <v-card>
        <v-toolbar color="primary" dark>
          <span class="headline mr-2">Add Service Contract</span>
          <span class="ml-10">Form for adding a new service contract</span>
        </v-toolbar>
        <!-- <v-img
          class="white--text align end"
          height="200"
          src="https://i.imgur.com/Y3hqiHf.png"
        ></v-img> -->

        <!-- form -->
        <form class="container" ref="form">
          <v-row class="mx-5">
            <!-- CONTRACT NUMBER -->
            <v-col cols="4">
              <v-text-field
                label="Contract Number"
                v-model="form.contract_no"
                :rules="rules.number_rule"
                type="number"
                prepend-icon="folder"
                hint="Enter Contract Number"
                persistent-hint
              ></v-text-field>
            </v-col>
            <!-- CONTRACT NAME -->
            <v-col cols="4">
              <v-text-field
                label="Name"
                v-model="form.name"
                prepend-icon="mdi-face-outline"
                :rules="rules.number_rule"
                hint="Enter Fullname"
                persistent-hint
              ></v-text-field>
            </v-col>
            <!-- ADDRESS -->
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
            <!-- PHONE NUMBER -->
            <v-col cols="4">
              <v-text-field
                label="Phone Number"
                v-model="form.phone_number"
                prepend-icon="mdi-cellphone-android"
                :rules="rules.number_rule"
                hint="+639306550894"
                persistent-hint
              ></v-text-field>
            </v-col>
            <!-- STATUS -->
            <v-col cols="4">
              <v-text-field
                label="Status"
                v-model="form.status"
                prepend-icon=""
                :rules="rules.number_rule"
                hint="Single/Married etc."
                persistent-hint
              ></v-text-field>
            </v-col>
            <!-- DATE CREATED -->
            <v-col cols="4">
              <v-menu
                ref="date_created"
                v-model="date_created"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    readonly
                    v-model="form.date_created"
                    label="Date Created"
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
                  @input="date_created = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <!-- NAME OF DECEASED -->
            <v-col cols="4">
              <v-text-field
                label="Name of Deceased"
                v-model="form.name_of_deceased"
                prepend-icon="mdi-bolnisi-cross"
                :rules="rules.number_rule"
              ></v-text-field>
            </v-col>

            <!-- DATE OF BIRTH -->
            <v-col cols="4">
              <v-menu
                ref="date_of_birth"
                v-model="date_of_birth"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <!-- <v-text-field slot="activator" aria-label="Date"></v-text-field> -->
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    readonly
                    v-model="form.date_of_birth"
                    label="Date of Birth"
                    hint="YYYY-MM-DD format"
                    persistent-hint
                    prepend-icon="event"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.date_of_birth"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <!-- RELIGION -->
            <v-col cols="4">
              <v-text-field
                type="text"
                error-count=""
                placeholder="Religion"
                label=""
                prepend-icon="mdi-church"
                v-model="form.religion"
              ></v-text-field>
            </v-col>
            <!-- DATE OF DEATH -->
            <v-col cols="4">
              <v-menu
                v-model="date_of_death"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <!-- <v-text-field slot="activator" aria-label="Date"></v-text-field> -->
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    readonly
                    v-model="form.date_of_death"
                    label="Date of Death"
                    hint="YYYY-MM-DD format"
                    persistent-hint
                    prepend-icon="event"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.date_of_death"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="4">
              <v-text-field
                label="Type of Casket"
                v-model="form.type_of_casket"
                hint="Enter Type of Casket"
                persistent-hint
                :rules="rules.number_rule"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Days Embalming"
                v-model="form.days_embalming"
                hint="Days Embalming"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Service Description"
                v-model="form.service_description"
                hint="Enter Service Description"
                persistent-hint
                :rules="rules.number_rule"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Freebies Inclusion"
                v-model="form.freebies_inclusion"
                hint="Enter Freebies"
                persistent-hint
                :rules="rules.number_rule"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Contract Amount"
                v-model="form.contract_amount"
                prepend-icon="mdi-cash"
                :rules="rules.number_rule"
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
              ><v-btn :loading="loading" @click="submit" dark color="primary"
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
      date_created: false,
      date_of_birth: false,
      date_of_death: false,
      interment_schedule: false,

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
        branch_id: this.$store.state.auth.user.branch_id,
        contract_no: "",
        name: "",
        status: "",
        address: "",
        phone_number: "",
        name_of_deceased: "",
        date_of_birth: "",
        date_of_death: "",
        type_of_casket: "",
        days_embalming: "",
        service_description: "",
        freebies_inclusion: "",
        interment_schedule: "",
        contract_amount: "",
        date_created: "",
        religion: "",
      },
    };
  },
  methods: {
    ...mapActions({
      addService: "services/addService",
    }),
    submit() {
      console.log(this.form);
      this.loading = true;
      this.addService(this.form).then(() => {
        this.loading = false;
        alert("Successfully Added!");
        // location.reload();
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
    // formattedDate() {
    //   var x = Date.parse(this.form.date_created);
    //   return this.form.date_created ? format(x, "do MMM yyyy") : "";
    // },
  },
};
</script>
