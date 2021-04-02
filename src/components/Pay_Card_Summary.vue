<template>
  <v-container>
    <v-card max-width="550">
      <v-card-title primary-title>
        {{ this.title }} Service Contracts</v-card-title
      >

      <v-card-text>
        <v-text-field
          type="text"
          v-model="search"
          outlined
          color
          placeholder="Search "
        ></v-text-field>

        <v-data-table
          :headers="headers"
          :items="item"
          class="elevation-1"
          pagination.sync="pagination"
          :search="search"
        >
          <template v-slot:[`item.action`]="{ item }">
            <v-icon color="primary" class="mr-2" @click="show(item)">
              mdi-account-circle
            </v-icon>
            <span class="caption blue--text"
              ><strong>View Profile</strong></span
            >
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: [
    "title",
    "item",
    "subtitle",
    // items,
    // headers,
  ],
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Action",
          value: "action",
        },
        {
          text: "Contract No.",
          value: "service.contract_no",
        },
        {
          text: "Name of Client",
          value: "service.name",
        },
        {
          text: "Name of Deceased",
          value: "service.name_of_deceased",
        },
        {
          text: "Amount",
          value: "amount",
        },
        {
          text: "Remarks",
          value: "remarks",
        },
      ],
    };
  },
  created() {
    console.log(this.item);
  },
  methods: {
    show(item) {
      this.$router.push(`/profile/` + item.id);
    },
  },
};
</script>

<style></style>
