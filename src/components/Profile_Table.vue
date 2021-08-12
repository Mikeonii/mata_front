<template>
  <div :key="key">
    <v-card class="mx-auto" width="1200">
      <v-toolbar class="primary">
        <h2 class="display-1 white--text font-weight-bold">
          Service Contract Information
        </h2></v-toolbar
      >
      <v-divider></v-divider>
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
        <v-col cols="3">
          <v-card-subtitle class="pb-0">
            Address:
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.address }}</h2>
          </v-card-text>
        </v-col>
        <v-col cols="3">
          <v-card-subtitle class="pb-0">
            Religion:
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.religion }}</h2>
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
        <v-col cols="2">
          <v-card-subtitle class="pb-0">
            Phone Number:
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">{{ this.service.data.phone_number }}</h2>
          </v-card-text>
        </v-col>
        <v-col cols="2">
          <v-card-subtitle class="pb-0">
            Name of Deceased:
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">
              {{ this.service.data.name_of_deceased }}
            </h2>
          </v-card-text>
        </v-col>
        <v-col cols="2">
          <v-card-subtitle class="pb-o">
            Deceased Birthdate
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">
              {{ this.service.data.date_of_birth }}
            </h2>
          </v-card-text>
        </v-col>

        <v-col cols="2">
          <v-card-subtitle class="pb-o">
            Deceased Date of Death
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">
              {{ this.service.data.date_of_death }}
            </h2>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row class="mx-5">
        <v-col cols="3">
          <v-chip class="ma-2 white--text" color="red">
            Casket Type
          </v-chip>

          <v-card-text class="text--primary">
            <h2 class="heading-2">
              {{ this.service.data.type_of_casket }}
            </h2>
          </v-card-text>
        </v-col>
        <v-col cols="2">
          <v-card-subtitle class="pb-0">
            Contract Amount:
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">
              {{ this.service.data.contract_amount }}
            </h2>
          </v-card-text>
        </v-col>
        <v-col cols="2">
          <v-card-subtitle class="pb-0">
            Balance
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="heading-2">
              {{ this.service.data.balance }}
            </h2>
          </v-card-text>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn color="primary" small @click="print_service()">
          <v-icon></v-icon>Print Contract</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  // props: ["service"],
  computed: {
    ...mapGetters({
      token: "auth/token",
    }),
    ...mapState("services", { service: "service" }),
  },
  watch: {
    service() {},
  },
  data() {
    return {
      key: 0,
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
  methods: {
    ...mapActions({
      del_service: "services/del_service",
      edit_service: "services/edit_service",
    }),
    print_service() {
      const id = this.$route.params.service_id;
      const branch_id = this.service.data.branch_id;
      // window.open(
      //   "http://127.0.0.1:8000/print_contract/" +
      //     id +
      //     "/" +
      //     branch_id +
      //     "?token=" +
      //     this.token
      // );
      window.open(
        "http://app-server.matadirectservice.com/print_contract/" +
          id +
          "/" +
          branch_id +
          "?token=" +
          this.token
      );
    },
  },
};
</script>
