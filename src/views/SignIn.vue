<template>
  <div class="container">
    <v-card class="mx-auto" max-width="500" outlined style="padding:20px;">
      <form>
        <h2 class="subheading mx-10">Log-in Form</h2>
        <v-row class="mx-auto">
          <v-col class="cols 4">
            <v-text-field
              prepend-icon="account_circle"
              v-model="form.name"
              label="Username"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mx-auto">
          <v-col class="cols 4">
            <v-text-field
              prepend-icon="vpn_key"
              v-model="form.password"
              label="Password"
              type="password"
            >
            </v-text-field
          ></v-col>
        </v-row>
        <v-card-actions>
          <v-btn :loading="loading" @click="submit" color="primary"
            >Login</v-btn
          >
          <v-btn @click="reset" color="warning">Reset</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </div>
</template>
<script>
// import axios from "axios";
// use actions inside another component
import { mapActions } from "vuex";
export default {
  name: "signin",
  data() {
    return {
      form: {
        name: "",
        password: "",
        branch_id: "",
      },
      loading: false,
    };
  },

  methods: {
    ...mapActions({
      //method: 'module/function'
      signIn: "auth/signin",
    }),

    // async means to wait for the response back to api
    submit() {
      console.log(this.form);
      this.loading = true;
      this.signIn(this.form)
        .then(() => {
          this.loading = false;
          this.$router.push(`/`);
        })
        .catch((error) => {
          alert(error);
          this.loading = false;
        });
    },
    reset() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>
