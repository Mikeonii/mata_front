<template>
  <v-card class="mx-auto mt-5" width="1200">
    <v-row>
      <v-col>
        <v-card-title>Embalm Info</v-card-title>
        <v-card-subtitle><p>Service's Embalm Information</p></v-card-subtitle>
        <v-card-text
          ><p>
            Embalm Date:
            <strong>{{ this.info_display.data.embalm_date }}</strong>
          </p>
          <p>
            Embalm Address:<strong>{{
              this.service.data.embalm_address
            }}</strong>
          </p>
          <p>
            Embalmer: <strong>{{ this.info_display.data.embalmer }}</strong>
          </p>
          <p>
            Helper: <strong>{{ this.info_display.data.embalm_helper }}</strong>
          </p>
          <p>
            Embalm Remarks:
            <strong>{{ this.info_display.data.embalm_remarks }}</strong>
          </p></v-card-text
        ></v-col
      >
      <v-col>
        <v-card-title>Retrieval Info</v-card-title>
        <v-card-subtitle
          ><p>Service's Retrieval Information</p></v-card-subtitle
        >
        <v-card-text
          ><p>
            Retrieval Address:
            <strong>{{ this.info_display.data.retrieve_location }}</strong>
          </p>
          <p>
            Retrieval Date:
            <strong>{{ this.info_display.data.retrieve_date }}</strong>
          </p>
          <p>
            Time Out:
            <strong>{{ this.info_display.data.retrieve_time_out }}</strong>
          </p>
          <p>
            Time In:
            <strong>{{ this.info_display.data.retrieve_time_in }}</strong>
          </p>
          <p>
            Driver:
            <strong>{{ this.info_display.data.retrieve_driver }}</strong>
          </p>
          <p>
            Helper:
            <strong>{{ this.info_display.data.retrieve_helper }}</strong>
          </p>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-title>Deliver Info</v-card-title>
        <v-card-subtitle><p>Service's Delivery Information</p></v-card-subtitle>
        <v-card-text>
          <p>
            Time out:
            <strong>{{ this.info_display.data.deliver_time_out }}</strong>
          </p>
          <p>
            Time in:
            <strong>{{ this.info_display.data.deliver_time_in }}</strong>
          </p>
          <p>
            Driver: <strong>{{ this.info_display.data.deliver_driver }}</strong>
          </p>
          <p>
            Helper: <strong>{{ this.info_display.data.deliver_helper }}</strong>
          </p>
          <p>
            Remarks:
            <strong>{{ this.info_display.data.deliver_remarks }}</strong>
          </p>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-title>Burial Info</v-card-title>
        <v-card-subtitle><p>Service's Burial Information</p></v-card-subtitle>
        <v-card-text>
          <p>
            Date of Burial:
            <strong>{{ this.info_display.data.date_of_burial }}</strong>
          </p>
          <p>
            Burial Address:
            <strong>{{ this.info_display.data.burial_address }}</strong>
          </p>
          <p>
            Driver: <strong>{{ this.info_display.data.burial_driver }}</strong>
          </p>
          <p>
            Helper: <strong>{{ this.info_display.data.burial_helper }}</strong>
          </p>
          <p>
            Remarks:
            <strong>{{ this.info_display.data.burial_remarks }}</strong>
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
            <v-row
              ><v-col cols="6">
                <h2 class="mb-4">Embalm Info</h2>
                <v-text-field
                  :rules="rules"
                  name="embalm_date"
                  :value="this.info_display.data.embalm_date"
                  label="Embalm Date:"
                  placeholder="Please follow YYYY-MM-DD Format"
                  v-model="info_display.data.embalm_date"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="embalm_address"
                  :value="info_display.data.embalm_address"
                  label="Embalm Address"
                  v-model="info_display.data.embalm_address"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="embalmer"
                  :value="info_display.data.embalmer"
                  label="Embalmer"
                  v-model="info_display.data.embalmer"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="embalm_helper"
                  :value="info_display.data.embalm_helper"
                  label="Helper"
                  v-model="info_display.data.embalm_helper"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="embalm_remarks"
                  :value="info_display.data.embalm_remarks"
                  label="Remarks"
                  v-model="info_display.data.embalm_remarks"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <h2 class="mb-4">Retrieve Info</h2>
                <v-text-field
                  :rules="rules"
                  name="retrieve_location"
                  :value="info_display.data.retrieve_location"
                  label="Retrieve Location"
                  v-model="info_display.data.retrieve_location"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="retrieve_date"
                  :value="info_display.data.retrieve_date"
                  label="Retrieve Date"
                  v-model="info_display.data.retrieve_date"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="retrieve_time_out"
                  :value="info_display.data.retrieve_time_out"
                  label="Time Out"
                  v-model="info_display.data.retrieve_time_out"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="retrieve_time_in"
                  :value="info_display.data.retrieve_time_in"
                  label="Time In"
                  v-model="info_display.data.retrieve_time_in"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="retrieve_driver"
                  :value="info_display.data.retrieve_driver"
                  label="Driver"
                  v-model="info_display.data.retrieve_driver"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="retrieve_helper"
                  :value="info_display.data.retrieve_helper"
                  label="Helper"
                  v-model="info_display.data.retrieve_helper"
                ></v-text-field></v-col
            ></v-row>
            <v-row>
              <v-col cols="6">
                <h2 class="mb-4">Deliver Info</h2>
                <v-text-field
                  :rules="rules"
                  name="deliver_time_out"
                  :value="info_display.data.deliver_time_out"
                  label="Time Out"
                  v-model="info_display.data.deliver_time_out"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="deliver_time_in"
                  :value="info_display.data.deliver_time_in"
                  label="Time In"
                  v-model="info_display.data.deliver_time_in"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="deliver_driver"
                  :value="info_display.data.deliver_driver"
                  label="Driver"
                  v-model="info_display.data.deliver_driver"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="deliver_helper"
                  :value="info_display.data.deliver_helper"
                  label="Helper"
                  v-model="info_display.data.deliver_helper"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="deliver_remarks"
                  :value="info_display.data.deliver_remarks"
                  label="Helper"
                  v-model="info_display.data.deliver_remarks"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <h2 class="mb-4">Burial Info</h2>
                <v-text-field
                  :rules="rules"
                  name="burial_date"
                  :value="info_display.data.date_of_burial"
                  label="Burial Date"
                  placeholder="Please follow YYYY-MM-DD Format"
                  v-model="info_display.data.date_of_burial"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="burial_address"
                  :value="info_display.data.burial_address"
                  label="Burial Address"
                  v-model="info_display.data.burial_address"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="burial_driver"
                  :value="info_display.data.burial_driver"
                  label="Driver"
                  v-model="info_display.data.burial_driver"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="burial_helper"
                  :value="info_display.data.burial_helper"
                  label="Helper"
                  v-model="info_display.data.burial_helper"
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  name="burial_remarks"
                  :value="info_display.data.burial_remarks"
                  label="Remarks"
                  v-model="info_display.data.burial_remarks"
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
import { mapActions } from "vuex";
export default {
  name: "Service_Info",
  data() {
    return {
      dialog: false,
      info_display: null,
      rules: [(v) => (v && v.length >= 1) || "This field should not be empty"],
    };
  },
  props: ["service"],
  created() {
    this.info_display = this.service;
    console.log(this.info_display);
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
        embalmer: form.embalmer.value,
        embalm_helper: form.embalm_helper.value,
        embalm_remarks: form.embalm_remarks.value,
        retrieve_location: form.retrieve_location.value,
        retrieve_date: form.retrieve_date.value,
        retrieve_time_out: form.retrieve_time_out.value,
        retrieve_time_in: form.retrieve_time_in.value,
        retrieve_driver: form.retrieve_driver.value,
        retrieve_helper: form.retrieve_helper.value,
        deliver_time_out: form.deliver_time_out.value,
        deliver_time_in: form.deliver_time_in.value,
        deliver_driver: form.deliver_driver.value,
        deliver_helper: form.deliver_helper.value,
        deliver_remarks: form.deliver_remarks.value,
        date_of_burial: form.burial_date.value,
        burial_address: form.burial_address.value,
        burial_driver: form.burial_driver.value,
        burial_helper: form.burial_helper.value,
        burial_remarks: form.burial_remarks.value,
      };
      this.edit_service_info(request).then((response) => {
        alert("Success");
        this.dialog = false;
      });
    },
  },
};
</script>
