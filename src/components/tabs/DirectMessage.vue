<template>
  <div>
    <Navbar v-if="login" icon="mdi-comment-multiple" name="general"/>
    <button @click="setTab(0)">
      test
    </button>

  </div>
</template>

<script>
import Navbar from "../layout/Navbar";
export default {
  name: "DirectMessage",
  components:{Navbar},
  props: [
    'login'
  ],
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