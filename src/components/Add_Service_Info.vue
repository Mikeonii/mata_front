<template>
  <v-card class="mx-auto mt-5" width="1200">
    <v-row>
      <!-- EMBALM -->
      <v-col>
        <v-card-title>Embalm Info</v-card-title>
        <v-card-subtitle><p>Service's Embalm Information</p></v-card-subtitle>
        <v-card-text
          ><p>
            Embalm Date:
            <strong>{{ this.service.data.embalm_date }}</strong>
          </p>
          <p>
            Embalm Address:<strong>{{
              this.service.data.embalm_address
            }}</strong>
          </p>
          <p>
            Time Start:
            <strong>{{ this.service.data.embalm_time_start }}</strong>
          </p>
          <p>
            Time Finish:
            <strong>{{ this.service.data.embalm_time_finish }}</strong>
          </p>
          <p>
            Embalmer: <strong>{{ this.service.data.embalmer }}</strong>
          </p>
          <p>
            Helper: <strong>{{ this.service.data.embalm_helper }}</strong>
          </p>
          <p>
            Remarks:
            <strong>{{ this.service.data.embalm_remarks }}</strong>
          </p></v-card-text
        ></v-col
      >
      <!-- RETRIEVE -->
      <v-col>
        <v-card-title>Retrieval Info</v-card-title>
        <v-card-subtitle
          ><p>Service's Retrieval Information</p></v-card-subtitle
        >
        <v-card-text
          ><p>
            Retrieval Address:
            <strong>{{ this.service.data.retrieve_location }}</strong>
          </p>
          <p>
            Retrieval Date:
            <strong>{{ this.service.data.retrieve_date }}</strong>
          </p>
          <p>
            Time Departure:
            <strong>{{ this.service.data.retrieve_time_departure }}</strong>
          </p>
          <p>
            Time Arrival:
            <strong>{{ this.service.data.retrieve_time_arrival }}</strong>
          </p>
          <p>
            Driver:
            <strong>{{ this.service.data.retrieve_driver }}</strong>
          </p>
          <p>
            Helper:
            <strong>{{ this.service.data.retrieve_helper }}</strong>
          </p>
          <p>
            Remarks:
            <strong>{{ this.service.data.retrieve_remarks }}</strong>
          </p>
        </v-card-text>
      </v-col>
      <!-- DELIVER -->
      <v-col>
        <v-card-title>Deliver Info</v-card-title>
        <v-card-subtitle><p>Service's Delivery Information</p></v-card-subtitle>
        <v-card-text>
          <p>
            Deliver Date:
            <strong>{{ this.service.data.deliver_date }}</strong>
          </p>
          <p>
            Deliver Address:<strong>{{
              this.service.data.deliver_address
            }}</strong>
          </p>
          <p>
            Time Departure:
            <strong>{{ this.service.data.deliver_time_departure }}</strong>
          </p>
          <p>
            Time Arrival:
            <strong>{{ this.service.data.deliver_time_arrival }}</strong>
          </p>
          <p>
            Driver: <strong>{{ this.service.data.deliver_driver }}</strong>
          </p>
          <p>
            Helper: <strong>{{ this.service.data.deliver_helper }}</strong>
          </p>
          <p>
            Remarks:
            <strong>{{ this.service.data.deliver_remarks }}</strong>
          </p>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-title>Burial Info</v-card-title>
        <v-card-subtitle><p>Service's Burial Information</p></v-card-subtitle>
        <v-card-text>
          <p>
            Burial Date:
            <strong>{{ this.service.data.burial_date }}</strong>
          </p>
          <p>
            Burial Address:
            <strong>{{ this.service.data.burial_address }}</strong>
          </p>
          <p>
            Time Departure:
            <strong>{{ this.service.data.burial_time_departure }}</strong>
          </p>
          <p>
            Time Arrival:
            <strong>{{ this.service.data.burial_time_arrival }}</strong>
          </p>
          <p>
            Driver: <strong>{{ this.service.data.burial_driver }}</strong>
          </p>
          <p>
            Helper: <strong>{{ this.service.data.burial_helper }}</strong>
          </p>
          <p>
            Remarks:
            <strong>{{ this.service.data.burial_remarks }}</strong>
          </p>
        </v-card-text>
      </v-col>
    </v-row>
    <v-btn color="error" @click.stop="dialog = true">Edit Info</v-btn>
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title><h2>Add Service Info</h2></v-card-title>
        <v-card-subtitle
          >Add Information to {{ this.service.data.name }}'s Service
          Contract</v-card-subtitle
        >
        <v-card-text>
          <form ref="form">
            <v-row>
              <!-- EMBALM INFO -->
              <v-col cols="6">
                <h2 class="mb-4">Embalm Info</h2>
                <v-text-field
                  name="embalm_date"
                  label="Embalm Date:"
                  placeholder="Please follow YYYY-MM-DD Format"
                  v-model="service.data.embalm_date"
                ></v-text-field>
                <v-text-field
                  name="embalm_address"
                  label="Embalm Address"
                  v-model="service.data.embalm_address"
                ></v-text-field>
                <v-text-field
                  name="embalm_time_start"
                  :value="service.data.embalm_time_start"
                  label="Time Start"
                  v-model="service.data.embalm_time_start"
                ></v-text-field>
                <v-text-field
                  name="embalm_time_finish"
                  label="Time Finish"
                  v-model="service.data.embalm_time_finish"
                ></v-text-field>
                <v-text-field
                  name="embalmer"
                  label="Embalmer"
                  v-model="service.data.embalmer"
                ></v-text-field>
                <v-text-field
                  name="embalm_helper"
                  label="Helper"
                  v-model="service.data.embalm_helper"
                ></v-text-field>
                <v-text-field
                  name="embalm_remarks"
                  label="Remarks"
                  v-model="service.data.embalm_remarks"
                ></v-text-field>
              </v-col>
              <!-- RETRIEVE -->
              <v-col cols="6">
                <h2 class="mb-4">Retrieve Info</h2>
                <v-text-field
                  name="retrieve_location"
                  label="Retrieve Location"
                  v-model="service.data.retrieve_location"
                ></v-text-field>
                <v-text-field
                  name="retrieve_date"
                  label="Retrieve Date"
                  v-model="service.data.retrieve_date"
                ></v-text-field>
                <v-text-field
                  name="retrieve_time_departure"
                  label="Time Departure"
                  v-model="service.data.retrieve_time_departure"
                ></v-text-field>
                <v-text-field
                  name="retrieve_time_arrival"
                  label="Time Arrival"
                  v-model="service.data.retrieve_time_arrival"
                ></v-text-field>
                <v-text-field
                  name="retrieve_driver"
                  label="Driver"
                  v-model="service.data.retrieve_driver"
                ></v-text-field>
                <v-text-field
                  name="retrieve_helper"
                  label="Helper"
                  v-model="service.data.retrieve_helper"
                ></v-text-field>
                <v-text-field
                  name="retrieve_remarks"
                  label="Remarks"
                  v-model="service.data.retrieve_remarks"
                ></v-text-field></v-col
            ></v-row>
            <!-- DELIVER -->
            <v-row>
              <v-col cols="6">
                <h2 class="mb-4">Deliver Info</h2>
                <v-text-field
                  name="deliver_date"
                  label="Deliver Date:"
                  placeholder="Please follow YYYY-MM-DD Format"
                  v-model="service.data.deliver_date"
                ></v-text-field>
                <v-text-field
                  name="deliver_address"
                  label="Deliver Address"
                  v-model="service.data.deliver_address"
                ></v-text-field>
                <v-text-field
                  name="deliver_time_departure"
                  label="Time Departure"
                  v-model="service.data.deliver_time_departure"
                ></v-text-field>
                <v-text-field
                  name="deliver_time_arrival"
                  label="Time Arrival"
                  v-model="service.data.deliver_time_arrival"
                ></v-text-field>
                <v-text-field
                  name="deliver_driver"
                  label="Driver"
                  v-model="service.data.deliver_driver"
                ></v-text-field>
                <v-text-field
                  name="deliver_helper"
                  label="Helper"
                  v-model="service.data.deliver_helper"
                ></v-text-field>
                <v-text-field
                  name="deliver_remarks"
                  label="Helper"
                  v-model="service.data.deliver_remarks"
                ></v-text-field>
              </v-col>
              <!-- BURIAL -->
              <v-col cols="6">
                <h2 class="mb-4">Burial Info</h2>
                <v-text-field
                  name="burial_date"
                  label="Burial Date"
                  placeholder="Please follow YYYY-MM-DD Format"
                  v-model="service.data.burial_date"
                ></v-text-field>
                <v-text-field
                  name="burial_address"
                  label="Burial Address"
                  v-model="service.data.burial_address"
                ></v-text-field>
                <v-text-field
                  name="burial_time_departure"
                  label="Time Departure"
                  v-model="service.data.burial_time_departure"
                ></v-text-field>
                <v-text-field
                  name="burial_time_arrival"
                  label="Time Arrival"
                  v-model="service.data.burial_time_arrival"
                ></v-text-field>
                <v-text-field
                  name="burial_driver"
                  label="Driver"
                  v-model="service.data.burial_driver"
                ></v-text-field>
                <v-text-field
                  name="burial_helper"
                  label="Helper"
                  v-model="service.data.burial_helper"
                ></v-text-field>
                <v-text-field
                  name="burial_remarks"
                  label="Remarks"
                  v-model="service.data.burial_remarks"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn color="error" @click="submit">Submit</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Service_Info",
  data() {
    return {
      dialog: false,
      info_display: null,
      rules: [(v) => (v && v.length >= 1) || "This field should not be empty"],
    };
  },

  created() {
    this.info_display = this.service;
    console.log(this.info_display);
  },
  computed: {
    ...mapState("services", ["service"]),
  },
  methods: {
    ...mapActions({
      edit_service_info: "services/edit_service_info",
    }),
    submit() {
      var form = this.$refs.form;

      const request = {
        service_id: this.$route.params.service_id,

        embalm_date: form.embalm_date.value,
        embalm_address: form.embalm_address.value,
        embalm_time_start: form.embalm_time_start.value,
        embalm_time_finish: form.embalm_time_finish.value,
        embalmer: form.embalmer.value,
        embalm_helper: form.embalm_helper.value,
        embalm_remarks: form.embalm_remarks.value,

        retrieve_location: form.retrieve_location.value,
        retrieve_date: form.retrieve_date.value,
        retrieve_time_departure: form.retrieve_time_departure.value,
        retrieve_time_arrival: form.retrieve_time_arrival.value,
        retrieve_driver: form.retrieve_driver.value,
        retrieve_helper: form.retrieve_helper.value,
        retrieve_remarks: form.retrieve_remarks.value,

        deliver_address: form.deliver_address.value,
        deliver_date: form.deliver_date.value,
        deliver_time_departure: form.deliver_time_departure.value,
        deliver_time_arrival: form.deliver_time_arrival.value,
        deliver_driver: form.deliver_driver.value,
        deliver_helper: form.deliver_helper.value,
        deliver_remarks: form.deliver_remarks.value,

        burial_date: form.burial_date.value,
        burial_address: form.burial_address.value,
        burial_time_departure: form.burial_time_departure.value,
        burial_time_arrival: form.burial_time_arrival.value,
        burial_driver: form.burial_driver.value,
        burial_helper: form.burial_helper.value,
        burial_remarks: form.burial_remarks.value,
      };
      this.edit_service_info(request).then(() => {
        alert("Success");
        this.dialog = false;
      });
    },
  },
};
</script>
