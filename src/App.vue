<template>
  <v-app>
    <v-main class="grey lighten-3">
      <Navbar />
      <router-view class="ml-5 mt-5"></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Navbar from "./components/Navbar";

// import Add_Contract_Modal from "./components/Add_Contract_Model";
export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
