<template>
  <v-content class="pa-10">
    <h1>Ustawienia wyglądu</h1>
    <v-progress-linear class="mt-10 mb-16" color="grey"></v-progress-linear>
    <span class="d-block mb-16">Tutaj jakiś formik</span>
    <v-btn
        outlined
        color="primary"
        @click="setSettingsPage(0)"
    >Wróć na stronę główną ustawień</v-btn>
  </v-content>
</template>

<script>
export default {
  name: "SettingsView",
  methods:{
    setSettingsPage(tab){
      this.$store.commit("updateSettingsTab", tab);
    },
  }
}
</script>

<style scoped>

</style>