<template>
  <div>
    <v-dialog max-width="600" v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <v-icon color="orange">mdi-pencil</v-icon>
          <span class="orange--text caption">Edit</span>
        </div>
      </template>

      <v-card>
        <v-toolbar color="primary" dark>Edit Service Contract</v-toolbar>
        <v-card-text>
          <br />
          <v-form ref="form">
            <v-text-field
              label="Contract Number"
              prepend-icon=""
              v-model="form.contract_no"
            ></v-text-field>
            <v-text-field
              label="Name"
              prepend-icon=""
              v-model="form.name"
            ></v-text-field>
            <v-text-field
              label="Status"
              prepend-icon=""
              v-model="form.status"
            ></v-text-field>
            <v-text-field
              label="Address"
              prepend-icon=""
              v-model="form.address"
            ></v-text-field>
            <v-text-field
              label="Phone Number"
              prepend-icon=""
              v-model="form.phone_number"
            ></v-text-field>
            <v-text-field
              label="Name of Deceased"
              prepend-icon=""
              v-model="form.name_of_deceased"
            ></v-text-field>
            <v-text-field
              label="date_of_birth"
              prepend-icon=""
              v-model="form.date_of_birth"
            ></v-text-field>
            <v-text-field
              label="Date of Death"
              prepend-icon=""
              v-model="form.date_of_death"
            ></v-text-field>
            <v-text-field
              label="type_of_casket"
              prepend-icon=""
              v-model="form.type_of_casket"
            ></v-text-field>
            <v-text-field
              label="Days Embalming"
              prepend-icon=""
              v-model="form.days_embalming"
            ></v-text-field>
            <v-text-field
              label="Service Description"
              prepend-icon=""
              v-model="form.service_description"
            ></v-text-field>
            <v-text-field
              label="Freebies Inclusion"
              prepend-icon=""
              v-model="form.freebies_inclusion"
            ></v-text-field>
            <v-text-field
              label="Interment Schedule"
              prepend-icon=""
              v-model="form.interment_schedule"
            ></v-text-field>
            <v-text-field
              label="Contract Amount"
              prepend-icon=""
              v-model="form.contract_amount"
            ></v-text-field>
            <v-text-field
              label="Date Created"
              prepend-icon=""
              v-model="form.date_created"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="submit" color="primary">Submit</v-btn>
          <v-btn text @click="reset">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      dialog: false,
      form: {
        id: this.item.id,
        contract_no: this.item.contract_no,
        name: this.item.name,
        status: this.item.status,
        address: this.item.address,
        phone_number: this.item.phone_number,
        name_of_deceased: this.item.name_of_deceased,
        date_of_birth: this.item.date_of_birth,
        date_of_death: this.item.date_of_death,
        type_of_casket: this.item.type_of_casket,
        days_embalming: this.item.days_embalming,
        service_description: this.item.service_description,
        freebies_inclusion: this.item.freebies_inclusion,
        interment_schedule: this.item.interment_schedule,
        contract_amount: this.item.contract_amount,
        date_created: this.item.date_created,
        branch_id: this.item.branch_id,
      },
    };
  },
  created() {
    this.edit_items = this.item;
  },
  methods: {
    reset() {
      this.dialog = false;
    },
    async submit() {
      await this.$store
        .dispatch("services/edit_service", this.form)
        .then((response) => {
          alert(response.data);
        });
      // alert("Successfuly Edited");

      // confirm("Please confirm")
      // ? this.$store.dispatch("services/edit_service", this.form, {
      //     root: true,
      //   })
      // : "";
    },
  },
};
</script>
