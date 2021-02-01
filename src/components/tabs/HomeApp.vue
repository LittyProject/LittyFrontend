<template>
  <div>
    <Navbar v-if="login" icon="mdi-comment-multiple" name="general"/>
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