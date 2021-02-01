<template>
  <div>
    <h3>Tutaj jakieś ustawienia</h3>
    <v-icon
        medium
        class="ml-3 dark-btn"
        @click="setTab(0)"
    >
      mdi-home
    </v-icon>
  </div>
</template>

<script>
export default {
  name: "Settings",
  methods:{
    setTab(tab){
      localStorage.setItem("tab", tab);
      this.$store.commit("updateTab", tab);
    }
  }
}
</script>

<style scoped>

</style>