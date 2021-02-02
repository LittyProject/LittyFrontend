<template>
  <v-app>
    <v-main
        class="dark-theme dark-content"
    >
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import colors from '@/assets/colors.json';
import topbar from '@/assets/topbar.json';
export default {
  name: "App2",
  data: () => ({
    colors,
    topbar
  })
}
</script>

<style lang="scss">
@import "@/assets/scss/main/index.scss";
</style>
