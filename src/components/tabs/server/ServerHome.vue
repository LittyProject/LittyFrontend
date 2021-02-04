<template>
  <div>
    <ServerNavbar></ServerNavbar>
    <v-btn @click="setActive">Wróć na stronę główną</v-btn>
  </div>
</template>

<script>


import ServerNavbar from "@/components/layout/ServerNavbar";
export default {
  name: "ServerHome",
  components: {ServerNavbar},
  methods:{
    setActive(){
      this.$store.commit("updateTab", 0);
      this.$store.commit("updateActive", {});
    }
  }
}
</script>

<style scoped>

</style>
