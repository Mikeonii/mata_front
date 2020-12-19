<template>
  <div class="container" ref="content">
    <v-row>
      <v-col cols="3">
        <h2>Summary</h2>
        <p>Check summary for the month of:</p>
      </v-col>
      <v-col cols="4"
        ><v-select
          :items="months"
          label="Select Month"
          v-model="selected_month"
        >
        </v-select>
      </v-col>
      <v-col>
        <v-select :items="years" label="Select Year" v-model="selected_year">
        </v-select>
      </v-col>
      <v-col>
        <v-btn color="primary" @click="search()">Search</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <loading :active.sync="isLoading" :can-cancel="true"></loading>
    <v-row>
      <v-col cols="4">
        <v-card class="mx-2">
          <div class="mx-5">
            <h4>Amount of Cash Collected</h4>
            <v-divider></v-divider>
            <p>
              Php:<span>{{ this.collection_default.total_cash }}</span>
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-2">
          <div class="mx-5">
            <h4>DSWD</h4>
            <v-divider></v-divider>
            <p>
              Php:<span>{{ this.collection_default.dswd }}</span>
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-2">
          <div class="mx-5">
            <h4>MSWDO</h4>
            <v-divider></v-divider>
            <p>
              Php:<span>{{ this.collection_default.mswdo }}</span>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- 2nd row -->
    <v-row>
      <v-col cols="4">
        <v-card class="mx-2">
          <div class="mx-5">
            <h4>LGU</h4>
            <v-divider></v-divider>
            <p>
              Php:<span>{{ this.collection_default.lgu }}</span>
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-2">
          <div class="mx-5">
            <h4>PSWD</h4>
            <v-divider></v-divider>
            <p>
              Php:<span>{{ this.collection_default.pswd }}</span>
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-2">
          <div class="mx-5">
            <h4>Cheque</h4>
            <v-divider></v-divider>
            <p>
              Php:<span>{{ this.collection_default.cheque }}</span>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- 3rd row -->
    <v-row>
      <v-col cols="4">
        <v-card class="mx-2">
          <div class="mx-5">
            <h4>Total Discount Given</h4>
            <v-divider></v-divider>
            <p>
              Php:<span>{{
                this.collection_default.total_discount_given
              }}</span>
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-2">
          <div class="mx-5">
            <h4>Cash on hand</h4>
            <v-divider></v-divider>
            <p>
              Php:<span>{{ this.collection_default.cash_on_hand }}</span>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-divider> </v-divider>
    <v-row>
      <div class="container">
        <h4>
          Total Services Rendered this Month of the year:
          {{ total_service_month }}
        </h4>
        <h4>Total Services Rendered this Year: {{ total_service_year }}</h4>
      </div>
    </v-row>
    <v-btn
      color="error"
      @click="export_to_excel()"
      :disabled="!this.selected_year || !this.selected_month"
      >Export to PDF</v-btn
    >
  </div>
</template>
<script>
import { VclFacebook, VclInstagram } from "vue-content-loading";
import { mapGetters, mapActions } from "vuex";
import loading from "vue-loading-overlay";
import jspdf from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { id } from "date-fns/locale";
// import js_file_download from "js-file-download";
// import fileDownload from "js-file-download";
import filesaver from "file-saver";

export default {
  name: "summary_view",
  components: {
    VclFacebook,
    loading,
  },
  data() {
    return {
      res: null,
      total_service_month: 0,
      total_service_year: 0,
      selected_month: null,
      selected_year: null,
      years: [],
      months: [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      collection_default: {
        total_cash: 0,
        dswd: 0,
        mswdo: 0,
        lgu: 0,
        pswd: 0,
        cheque: 0,
        total_discount_given: 0,
        cash_on_hand: 0,
      },
      isLoading: false,
      fullPage: true,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      collections: "payments/collections",
      services: "services/services",
      token: "auth/token",
    }),
  },
  methods: {
    async export_to_excel() {
      window.open(
        "http://mata.net/print_summary/" +
          this.months.indexOf(this.selected_month) +
          "/" +
          this.selected_year +
          "/" +
          this.user.branch_id +
          "?token=" +
          this.token
      );
    },

    ...mapActions({
      get_total_service: "services/get_total_service",
      get_collections: "payments/get_collections",
      export: "services/export_to_excel",
    }),
    search() {
      if (this.selected_month == null || this.selected_year == null) {
        alert("Please fill all the blanks");
      } else {
        this.isLoading = true;
        // this.collection_default = null;
        let month_index = this.months.indexOf(this.selected_month);
        let branch_id = this.user.branch_id;
        let request = {
          month: month_index,
          year: this.selected_year,
          branch_id: branch_id,
        };

        this.get_collections(request).then(() => {
          this.collection_default = this.collections;
          this.isLoading = false;
        });

        // get total service
        this.get_total_service(request).then((data) => {
          this.total_service_month = data[0];
          this.total_service_year = data[1];
        });
      }
    },
  },
  created() {
    var x = 2020;
    for (x; x <= 2030; x++) {
      this.years.push(x);
    }
  },
};
</script>
