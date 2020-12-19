<template>
  <div>
    <profile_table v-if="ready" />
    <service_info v-if="ready" :service="this.service" />
    <v-card max-width="1200" class="mx-auto mt-5">
      <payment_table v-if="ready" />
    </v-card>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Err_Component from "@/components/Err_Component.vue";
import { VclFacebook, VclInstagram } from "vue-content-loading";
import { mapActions, mapGetters } from "vuex";

const payment_table = () => ({
  component: import("@/components/Payment_Table"),
  loading: VclFacebook,
  error: Err_Component,
  timeout: 30000,
});
const profile_table = () => ({
  component: import("@/components/Profile_Table"),
  loading: VclFacebook,
  error: Err_Component,
  timeout: 30000,
});
const service_info = () => ({
  component: import("@/components/Add_Service_Info"),
  loading: VclFacebook,
  error: Err_Component,
  timeout: 30000,
});
export default {
  name: "Profile",
  components: {
    add_payment_modal: () => import("@/components/Add_Payment_Modal"),
    payment_table,
    Navbar,
    profile_table,
    service_info,
  },
  computed: {
    ...mapGetters({
      service_data: "services/service",
    }),
  },
  data() {
    return {
      ready: false,
      service: null,
      profile_id: this.$route.params.service_id,
    };
  },
  created() {
    this.get_service(this.profile_id).then(() => {
      this.service = this.service_data;
      this.get_payments(this.profile_id).then(() => {
        this.ready = true;
      });
    });
  },
  mounted() {},
  methods: {
    ...mapActions({
      get_service: "services/get_single",
      get_payments: "payments/get_payments",
    }),
    refresh_component() {},
  },
};
</script>
<style scoped></style>
