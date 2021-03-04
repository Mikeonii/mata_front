<template>
  <div>
    <v-card class="mx-auto" width="1200">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://i.imgur.com/Y3hqiHf.png"
      >
        <v-card-title><h2>Service Information</h2></v-card-title>
      </v-img>
      <v-row class="mx-5">
        <v-col cols="3">
          <v-chip class="ma-2" color="primary">
            Contract Number
          </v-chip>

          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.contract_no }}</h2>
          </v-card-text>
        </v-col>
        <v-col cols="3">
          <v-card-subtitle class="pb-0">
            Name:
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.name }}</h2>
          </v-card-text>
        </v-col>
        <v-col cols="5">
          <v-card-subtitle class="pb-0">
            Address:
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.address }}</h2>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row class="mx-5">
        <v-col cols="3">
          <v-chip class="ma-2" color="warning">
            Date Created:
          </v-chip>
          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.date_created }}</h2>
          </v-card-text>
        </v-col>
        <v-col cols="3">
          <v-card-subtitle class="pb-0">
            Phone Number:
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.phone_number }}</h2>
          </v-card-text>
        </v-col>
        <v-col cols="3">
          <v-card-subtitle class="pb-0">
            Name of Deceased:
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.name_of_deceased }}</h2>
          </v-card-text>
        </v-col>
        <v-col cols="3">
          <v-card-subtitle class="pb-o">
            Deceased Date Info
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.deceased_date }}</h2>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row class="mx-5">
        <v-col cols="3">
          <v-chip class="ma-2 white--text" color="red">
            Casket Type
          </v-chip>

          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.type_of_casket }}</h2>
          </v-card-text>
        </v-col>
        <v-col cols="2">
          <v-card-subtitle class="pb-0">
            Amount:
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.amount }}</h2>
          </v-card-text>
        </v-col>
        <v-col cols="2">
          <v-card-subtitle class="pb-0">
            Down Payment:
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.down_payment }}</h2>
          </v-card-text>
        </v-col>
        <v-col cols="2">
          <v-card-subtitle class="pb-0">
            Balance
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.balance }}</h2>
          </v-card-text>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn color="warning" text @click="dialog = true">
          <v-icon>mdi-lead-pencil</v-icon> Edit
        </v-btn>

        <v-btn color="red" text @click="delete_service()">
          <v-icon>mdi-trash-can</v-icon>Delete</v-btn
        >

        <v-btn color="success" small @click="print_service()">
          <v-icon></v-icon>Export to PDF</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" max-width="1000">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Edit Service Info
        </v-card-title>

        <v-card-text>
          <v-form ref="update_form" class="container">
            <v-row>
              <v-col cols="3">
                <v-text-field
                  label="Contract Number"
                  v-model="service.data.contract_no"
                  prepend-icon="mdi-cash"
                  autocomplete="false"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Name"
                  v-model="service.data.name"
                  prepend-icon="mdi-cash"
                  autocomplete="false"
                ></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  label="Address"
                  v-model="service.data.address"
                  prepend-icon="mdi-cash"
                  autocomplete="false"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Date Created"
                  v-model="service.data.date_created"
                  hint="Please follow YYYY-MM-DD format"
                  prepend-icon="mdi-cash"
                  autocomplete="false"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Phone Number"
                  v-model="service.data.phone_number"
                  prepend-icon="mdi-cash"
                  autocomplete="false"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Name of Deceased"
                  v-model="service.data.name_of_deceased"
                  prepend-icon="mdi-cash"
                  autocomplete="false"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Deceased Date"
                  v-model="service.data.deceased_date"
                  prepend-icon="mdi-date"
                  autocomplete="false"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  :items="type_of_casket_list"
                  label="Casket Type"
                  v-model="service.data.type_of_casket"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Amount"
                  v-model="service.data.amount"
                  prepend-icon="mdi-cash"
                  autocomplete="false"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Down Payment"
                  v-model="service.data.down_payment"
                  prepend-icon="mdi-cash"
                  autocomplete="false"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Balance"
                  v-model="service.data.balance"
                  prepend-icon="mdi-cash"
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      service_data: "services/service",
      token: "auth/token",
    }),
  },
  data() {
    return {
      service: [],
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
    };
  },

  created() {
    this.service = this.service_data;
  },
  methods: {
    ...mapActions({
      del_service: "services/del_service",
      edit_service: "services/edit_service",
    }),
    print_service() {
      const id = this.$route.params.service_id;
      const branch_id = this.service.data.branch;
      window.open(
        "http://app-server.matadirectservice.com/print_contract/" +
          id +
          "/" +
          branch_id +
          "?token=" +
          this.token
      );
    },
    delete_service() {
      const id = this.$route.params.service_id;

      confirm("Are you sure you want to proceed?")
        ? this.del_service(id).then(() => {
            alert("Successfully Deleted");
            this.$router.push(`/`);
          })
        : "";
    },

    submit_edit() {
      this.edit_service(this.service.data).then((response) => {
        alert("success");
        this.dialog = false;
      });
    },
  },
};
</script>
