<template>
  <div>
    <!-- <Navbar /> -->
    <!-- <h2 class="subheading grey--text">Welcome to Dashboard</h2> -->
    <v-container class="ma-2">
      <!-- <p v-for="service in Services" :key="service.id">
        {{ service.id }}: {{ service.name }}
      </p> -->
      <v-card>
        <v-card-title
          >Registered Contracts
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="search"
          ></v-text-field>
        </v-card-title>

        <v-card-text>
          <v-row>
            <!-- <v-btn disabled color="primary" text>Selected: {{ sel_msg }}</v-btn> -->
          </v-row>
        </v-card-text>

        <v-data-table
          v-model="selected"
          :loading="table_loading"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="Services"
          item-key="id"
          sort-desc="false"
          multi-sort
          class="elevation-1 mx-5 mb-4 mt-3"
          :search="search"
          sort-by="created_at"
          items-per-page="5"
        >
          <!-- <template>
            <td @click="go_profile(service.id)"></td>
          </template> -->

          <template v-slot:[`item.profile`]="{ item }">
            <v-icon color="primary" class="mr-2" @click="show(item)">
              mdi-account-circle
            </v-icon>
            <span class="caption blue--text"><strong>Profile</strong></span>
          </template>
          <!-- <template v-slot:[`item.add_payment`]="{ item }">
            <addPaymentModal :selected="item" />
          </template> -->
        </v-data-table>
      </v-card>

      <!-- modal -->
      <div class="d-flex justify-end">
        <addModal />
      </div>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/component s/HelloWorld.vue'
import Navbar from "@/components/Navbar.vue";

import addModal from "@/components/Add_Contract_Modal.vue";
import format from "date-fns/format";
import { mapActions, mapGetters } from "vuex";
import addPaymentModal from "@/components/Add_Payment_Modal.vue";
export default {
  name: "Dashboard",
  components: {
    Navbar,
    addModal,
    addPaymentModal,
  },
  data() {
    return {
      singleSelect: true,
      selected: [],

      table_loading: false,
      search: "",
      headers: [
        { text: "", value: "profile" },

        {
          text: "S/R No.",
          align: "start",
          value: "id",
        },
        {
          text: "Contract No.",
          value: "contract_no",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Address",
          value: "address",
        },
        {
          text: "Phone Number",
          value: "phone_number",
        },
        {
          text: "Date Created",
          value: "created_at",
        },
        {
          text: "Name of Deceased",
          value: "name_of_deceased",
        },

        {
          text: "Type of Casket",
          value: "type_of_casket",
        },
        {
          text: "Amount",
          value: "amount",
        },
        {
          text: "Down Payment",
          value: "down_payment",
        },
        {
          text: "Balance",
          value: "balance",
        },
      ],
      Services: [],
    };
  },
  computed: {
    ...mapGetters({
      data: "services/services",
      user_data: "auth/user",
    }),
    sel_msg() {
      const selectedRow = this.selected[0];
      // return selectedRow ? `${selectedRow.name}` : "no data";
      // selectedRow ? `${selectedRow.name}` : "no data";
      // return selectedRow ? selectedRow.name : "no data";
      if (selectedRow) {
        return selectedRow.name;
      } else {
        return "no data";
      }
    },
  },
  methods: {
    ...mapActions({
      get_services: "services/get",
    }),

    show(item) {
      this.$router.push(`/profile/` + item.id);
    },
  },

  created() {
    this.table_loading = true;
    this.get_services(this.user_data.branch_id).then(() => {
      // assign to values.
      this.table_loading = false;
      this.Services = this.data;
    });

    // console.log(this.data.filter((x) => x.name == "Cindy Bogisich PhD"));

    // db.collection("services").onSnapshot((res) => {
    //   const changes = res.docChanges();

    //   changes.forEach((change) => {
    //     if (change.type == "added") {
    //       // format mm-dd-yy format into do mm yyyy in date-fns
    //       var x = change.doc.data().Date_Created;
    //       var x = Date.parse(x);
    //       var x = format(x, "do MMM yyyy");
    //       this.Services.push({
    //         id: change.doc.id,
    //         formatted_date: x,

    //         ...change.doc.data(),
    //       });
    //     }
    //   });
    // });
  },
};
</script>
<style scoped></style>
