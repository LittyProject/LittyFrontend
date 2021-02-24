<template>
  <div>
    <Navbar v-if="login" icon="mdi-comment-multiple" name="Publiczne serwery"/>
    <h3>Nic tu nie ma :)</h3>
  </div>
</template>

<script>
import Navbar from "../layout/Navbar";
export default {
  name: "HomeApp",
  components: {
    Navbar
  },
  props: [
      'login'
  ]
}
</script>

<style scoped>

</style>