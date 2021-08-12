<template>
  <div>
    <v-container class="ma-2">
      <v-row
        ><v-card>
          <v-card-title
            >Registered Contracts

            <addModal />
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="search"
            ></v-text-field>
          </v-card-title>

          <v-data-table
            v-model="selected"
            :loading="table_loading"
            loading-text="Loading... Please wait"
            :headers="headers"
            :items="services"
            item-key="id"
            multi-sort
            class="elevation-1 mx-5 mb-4 mt-3"
            sort-by="created_at"
            :search="search"
          >
            <template v-slot:[`item.profile`]="{ item }">
              <v-icon color="primary" class="mr-2" @click="show(item)">
                mdi-account-circle
              </v-icon>
              <span class="caption blue--text"><strong>Profile</strong></span>
            </template>
            <template v-slot:[`item.edit`]="{ item }">
              <Edit_Modal :item="item" />
            </template>
            <template v-slot:[`item.delete`]="{ item }">
              <v-icon color="red" class="mr-2" @click="del(item)">
                mdi-delete
              </v-icon>
              <span class="caption red--text"><strong>Delete</strong></span>
            </template>
          </v-data-table>
        </v-card>
      </v-row>

      <h1 class="mt-5 mb-2">Filtered Service Contract</h1>
      <v-divider></v-divider>
      <v-row v-if="this.filtered_table_ready">
        <!-- CHEQUE -->
        <v-col cols="6">
          <Pay_Card_Summary
            title="Cheque"
            subtitle="cheque"
            :item="filtered_items.cheque"
        /></v-col>
        <v-col cols="6">
          <Pay_Card_Summary
            title="Cash On-hand"
            subtitle="cash_on_hand"
            :item="filtered_items.cash_on_hand"
        /></v-col>
        <v-col cols="6">
          <Pay_Card_Summary
            title="MSWDO"
            subtitle="mswdo"
            :item="filtered_items.mswdo"
        /></v-col>
        <v-col cols="6">
          <Pay_Card_Summary
            title="LGU"
            subtitle="lgu"
            :item="filtered_items.lgu"
        /></v-col>
        <v-col cols="6">
          <Pay_Card_Summary
            title="DSWD-CARAGA"
            subtitle="dswd_caraga"
            :item="filtered_items.dswd_caraga"
        /></v-col>
        <v-col cols="6">
          <Pay_Card_Summary
            title="PSWD"
            subtitle="pswd"
            :item="filtered_items.pswd"
        /></v-col>
        <v-col cols="6">
          <Pay_Card_Summary
            title="PGO"
            subtitle="pgo"
            :item="filtered_items.pgo"
        /></v-col>
        <v-col cols="6">
          <Pay_Card_Summary
            title="Down Payment"
            subtitle="down_payment"
            :item="filtered_items.down_payment"
        /></v-col>
        <v-col cols="6">
          <Pay_Card_Summary
            title="Discount"
            subtitle="down_payment"
            :item="filtered_items.discount"
        /></v-col>
        <v-col cols="6">
          <Pay_Card_Summary
            title="Plan Contribution"
            subtitle="down_payment"
            :item="filtered_items.plan_contribution"
        /></v-col>
      </v-row>
      <div v-else><p class="">Loading Tables..</p></div>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Edit_Modal from "@/components/Edit_Modal.vue";
import addModal from "@/components/Add_Contract_Modal.vue";
import { mapGetters, mapState } from "vuex";
import addPaymentModal from "@/components/Add_Payment_Modal.vue";
import Pay_Card_Summary from "@/components/Pay_Card_Summary.vue";
export default {
  name: "Dashboard",
  components: {
    Navbar,
    addModal,
    addPaymentModal,
    Edit_Modal,
    Pay_Card_Summary,
  },
  data() {
    return {
      search: "",
      filtered_items: null,
      filtered_table_ready: false,
      item_name: [
        "cheque",
        "cash_on_hand",
        "mswdo",
        "lgu",
        "dswd-caraga",
        "pswd",
        "pgo",
        "down_payment",
      ],
      type_of_payment: [
        "Cheque",
        "Cash On-hand",
        "MSWDO",
        "LGU",
        "DSWD Caraga",
        "PSWD",
        "PGO",
        "Down Payment",
      ],
      selected: [],
      table_loading: true,
      search: "",
      // services: [],

      headers: [
        // { text: "Actions", value: "actions", width: "300px" },

        { text: "", value: "profile" },
        { text: "", value: "edit" },
        { text: "", value: "delete" },

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
          value: "date_created",
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
          text: "Contract Amount",
          value: "contract_amount",
        },
        {
          text: "Balance",
          value: "balance",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      user_data: "auth/user",
    }),
    ...mapState("services", ["services"]),
  },

  methods: {
    async del(item) {
      this.table_loading = true;
      let confirm = window.confirm(
        "Are you sure you want to delete " + item.name + "?"
      );
      if (confirm) {
        await this.$store.dispatch("services/del_service", item.id, {
          root: true,
        });
        this.table_loading = false;
      } else {
        this.table_loading = false;
      }
    },
    show(item) {
      this.$router.push(`/profile/` + item.id);
    },
    get_services() {
      this.$store
        .dispatch("services/get", this.user_data.branch_id, {
          root: true,
        })
        .then(() => {
          this.table_loading = false;
        });
    },
    get_filtered_service() {
      this.$store
        .dispatch(
          "services/get_filtered_per_payment",
          this.user_data.branch_id,
          {
            root: true,
          }
        )
        .then((response) => {
          this.filtered_table_ready = true;
          this.filtered_items = response;
          // console.log(response);
        });
    },
  },

  created() {
    // if the services array in state is empty, get the latest. if not ignore
    if (this.$store.state.services.services.length == 0) {
      this.get_services();
    } else {
      this.table_loading = false;
    }
    this.get_filtered_service();
    // get filtered services per payment
  },
};
</script>
<style scoped></style>
