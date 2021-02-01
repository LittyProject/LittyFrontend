<template>
  <div>
    <button @click="setTab(0)">
      test
    </button>
  </div>
</template>

<script>
export default {
  name: "DirectMessage",
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